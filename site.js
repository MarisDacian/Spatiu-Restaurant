var pop_up = document.getElementsByClassName("pop_up");
$(document).ready(function () {

    $('.Sala1').hover(
        function () {
            $(pop_up).css('background-image', "url(/Pictures/faculta_inginerie.jpg)");
            $(pop_up).css('height', "450px");
            $(pop_up).css('width',"1191px");
           
        },
        function(){
            $(pop_up).css('background-image', "url(/Pictures/faculta_inginerie.jpg)"); 
            
        }
    )
    $('.Sala2').hover(
        function(){
            $(pop_up).css('background-image', "url(/Pictures/A1.jpg)");
            $(pop_up).css('height', "450px");
            $(pop_up).css('width',"1191px");
        },
        function(){
        $(pop_up).css('background-image',"url(/Pictures/faculta_inginerie.jpg)");   
        }
    )
    $('.Sala3').hover(
        function(){
            $(pop_up).css('background-image', "url(/Pictures/Heck2.jpg)");
            $(pop_up).css('height', "450px");
            $(pop_up).css('width',"1191px");
        },
        function(){
        $(pop_up).css('background-image',"url(/Pictures/faculta_inginerie.jpg)");   
        }
    )
    $('.Sala4').hover(
        function(){
            $(pop_up).css('background-image', "url(/Pictures/A3.jpg)");
            $(pop_up).css('height', "450px");
            $(pop_up).css('width',"1191px");
        },
        function(){
        $(pop_up).css('background-image',"url(/Pictures/faculta_inginerie.jpg)");   
        }
    )
    $('.Sala5').hover(
        function(){
            $(pop_up).css('background-image', "url(/Pictures/A4.jpg)");
            $(pop_up).css('height', "450px");
            $(pop_up).css('width',"1191px");
        },
        function(){
        $(pop_up).css('background-image',"url(/Pictures/faculta_inginerie.jpg)");   
        }
    )

});