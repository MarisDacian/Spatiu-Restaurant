var name = $('#title').text();
var firstSeatLabel = 1;
var event_id = 1;
event_id = localStorage.getItem("event_id");

event = [];
event[1] = "XGEN 2019 Prezentari Ora 08:00";
$(document).ready(function () {
  $cart = $('#selected-seats'),
    $counter = $('#counter'),
    $total = $('#total'),
    sc = $('#seat-map').seatCharts({
      map: [
        'ffffffffff_ffffffffff',
        'eeeeeeeeee_eeeeeeeeee',
        'eeeeeeeeee_eeeeeeeeee',
        'eeeeeeeeee_eeeeeeeeee',
        'eeeeeeeeee_eeeeeeeeee',
        'eeeeeeeeee_eeeeeeeeee',
        'eeeeeeeeee_eeeeeeeeee',
        'eeeeeeeeee_eeeeeeeeee',
        'eeeeeeeeeeeeeeeeeeeee',
        'eeeeeeeeeeeeeeeeeeeee',
      ],
      seats: {
        f: {
          price: 100,
          classes: 'first-class', //your custom CSS class
          category: 'First Class'
        },
        e: {
          price: 40,
          classes: 'economy-class', //your custom CSS class
          category: 'Economy Class'
        }

      },
      naming: {
        top: false,
        getLabel: function (character, row, column) {
          return firstSeatLabel++;
        },
      },
      legend: {
        node: $('#legend'),
        items: [
          ['f', 'available', 'Profesori'],
          ['e', 'available', 'Studenti'],
          ['f', 'unavailable', 'Ocupat']
        ]
      },
      click: function () {
        if (this.status() == 'available') {
          //let's create a new <li> which we'll add to the cart items
          $('<li>' + this.data().category + ' Seat # ' + this.settings.label + ': <b>$' + this.data().price + '</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>')
            .attr('id', 'cart-item-' + this.settings.id)
            .data('seatId', this.settings.id)
            .appendTo($cart);

          /*
           * Lets update the counter and total
           *
           * .find function will not find the current seat, because it will change its stauts only after return
           * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
           */
          $counter.text(sc.find('selected').length + 1);
          $total.text(recalculateTotal(sc) + this.data().price);

          return 'selected';
        } else if (this.status() == 'selected') {
          //update the counter
          $counter.text(sc.find('selected').length - 1);
          //and total
          $total.text(recalculateTotal(sc) - this.data().price);

          //remove the item from our cart
          $('#cart-item-' + this.settings.id).remove();

          //seat has been vacated
          return 'available';
        } else if (this.status() == 'unavailable') {
          //seat has been already booked
          return 'unavailable';
        } else {
          return this.style();
        }
      }
    });

  //this will handle "[cancel]" link clicks
  $('#selected-seats').on('click', '.cancel-cart-item', function () {
    //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
    sc.get($(this).parents('li:first').data('seatId')).click();
  });

  //let's pretend some seats have already been booked
  // sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');
  Ocupare_eventuri()
  Ocupare_locuri();
  

  function recalculateTotal(sc) {
    var total = 0;

    //basically find every selected seat and sum its price
    sc.find('selected').each(function () {
      total += this.data().price;
    });

    return total;
  }



  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
 

})
function Ocupare_locuri() {console.log(event_id);
  $.ajax({
    url: "Json/map_"+name+".json"
  })
    .done(function (res) {
      // console.log(res)
      for (i = 0; i < res.reserved.length; i++) {
         if (event_id == res.name_id[i])
        {
         
          sc.get(res.reserved[i]).status('unavailable');
        }
      }
    });
}

function storeCoordinate(xVal, yVal,name_id, array) {
  ok = 0;
  for (i = 0; i < array.length; i++)
    if (xVal == array[i].Linie && yVal == array[i].Coloana&& name_id == array[i].name_id)
      ok = 1;
  if(ok==0)
  array.push({Linie: xVal, Coloana: yVal,name_id:name_id});
}

coord = [];
a = 0
b = 0

function stringToCoord(string) {
  console.log(string);
  i = 0
  while (string[i] !== "_") {
    a = a+string[i];
    
    i++;
  }

  i++;
  while (i < string.length) {
    b = b + string[i];
 
    i++; 
  }
}
var obj = {
  reserved: [],
  event_name:[]
};
function ocupa() {


  //sc.find('selected').seatIds returneaza tablou de stringuri cu locuri ocupate
  obj.reserved = sc.find('selected').seatIds;
  //console.log(sc.find('selected').seatIds);

  for (i = 0; i < obj.reserved.length; i++) {
    stringToCoord(obj.reserved[i])
    c = parseInt(a);
    console.log(c);
    d = parseInt(b);
    console.log(d);
    storeCoordinate(c, d,event_id, coord);
    sc.get(c+"_"+d).status('unavailable');
    a = 0;
    b = 0;
    console.log(coord);
  }
  $.ajax({
    type:"POST",
    url:"/"+name+".html",
    data:{  tags  : coord},
    success:function(data){
      console.log("THIS WORKS");
    }

  });
  $.ajax({
    type:"GET",
    url:"/"+name+".html",
    success:function(data){
      //console.log("Get call");
    }
  });
   window.location.reload();
 // $('#seat-map').
}

function delete_seats(){
  $.ajax({
    type: "DELETE",
    url: "/"+name+"_delete",
    success:function(data){
      console.log("Worked!");
    }
  })
  window.location.reload();
}
function Show_events()
{
  
}

function ev_finder(id)
{
  event_id = id;
  sc.find('unavailable').status('available');
  Ocupare_locuri();
  //console.log(event_id);
  for (i = 0; i < coord.length ; i++)
  {//console.log(coord[i].name_id);
    if (event_id == coord[i].name_id)
    sc.get(coord[i].Linie+"_"+coord[i].Coloana).status('unavailable');
    //console.log(coord[i].Linie+"_"+coord[i].Coloana);
  }
  localStorage.setItem("event_id", event_id);
  ev_detali = $("#front-indicator events");
  info = $("<div class='front-indicator-events'</div>");
  info.append(event[event_id]);
  $( "div.front-indicator-events" ).replaceWith( info );


 
}

function front_indicator()
{
  const front = $(".front-indicator");
  // nr_locuri = sc.find(/^9_[0-9]+/);
  // console.log(nr_locuri.length)
  // poz =31  * (nr_locuri.length)-145;
  // poz = poz + "px"
  // console.log(poz)
  front.css("margin-left","120px");
}
function Ocupare_eventuri() {
  $.ajax({
    url: "Json/Events.json"
  })
  .done(function (res) {
    // console.log(res)
    ev = $("#eventsContainer");
    for (i = 0; i < res.length; i++) {
      console.log(res[i].Date)
      li = $("<li class='ev'   onclick='ev_finder(" + (i + 1) + ")'</li>");
      if (res[i].Date == 0) {
        detalii = res[i].Name + " Ora " + res[i].Hour + " Ziua " + res[i].Ziua;
      }
      else { detalii = res[i].Name + " Ora " + res[i].Hour + " Data " + res[i].Date;
      }
      console.log(detalii);
      li.append(detalii);
      ev.append(li);
      
      event[i + 1] = res[i].Info;
      console.log(event)
    }
  });
}