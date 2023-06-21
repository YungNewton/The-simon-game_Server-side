var number_array = [];
var answer_array = [];
var should_play = true;
var sound = new Audio('green.mp3');
var audio = new Audio('red.mp3');
var sound3 = new Audio('yellow.mp3');
var sound4 = new Audio('blue.mp3');
$(document).keypress(function(){
    if(should_play) {
        next();
        should_play = false;
    }
})
function startOver() {
    number_array = [];
    answer_array = [];
    should_play = true;
}
function next(){
    answer_array = [];
    setTimeout(function timer() {
        var number = Math.floor(Math.random() * 4);
        number_array.push(number);
        $(".heroe2 > h1").text("Level " + number_array.length);
        switch(number){
            case 0:
                $(".green").animate({opacity : 0}).delay(10).animate({opacity : 1})
                sound.play();
                break;
            case 1:
                $(".red").animate({opacity : 0}).delay(10).animate({opacity : 1})
                audio.play();
                break;
            case 2:
                $(".yellow").animate({opacity : 0}).delay(10).animate({opacity : 1})
                sound3.play();
                break;
            case 3:
                $(".blue").animate({opacity : 0}).delay(10).animate({opacity : 1})
                sound4.play();
                break;
            default:
                break;
            }
    }, 500);
}
$(".top td").click(function(event){
    var text = $(event.target).attr('class');
    switch(text){
        case "green":
            $(".green").animate({opacity : 0}).delay(10).animate({opacity : 1})
            sound.play();
            answer_array.push(0);
            break;
        case "red":
            $(".red").animate({opacity : 0}).delay(10).animate({opacity : 1})
            audio.play();
            answer_array.push(1);
            break;
        case "yellow":
            $(".yellow").animate({opacity : 0}).delay(10).animate({opacity : 1})
            sound3.play();
            answer_array.push(2);
            break;
        case "blue":
            $(".blue").animate({opacity : 0}).delay(10).animate({opacity : 1})
            sound4.play();
            answer_array.push(3);
            break;
        default:
            answer_array.push(4);
            break;
    }
    check();
})


function check(){
    if(answer_array[(answer_array.length - 1)] === number_array[(answer_array.length - 1)]){
        if(answer_array.length == number_array.length){
            next();
        }
    }else{
        $("body").css("background-color", "grey");
        setTimeout(function () {
            $("body").css("background-color", "black");
        }, 100);
        var loose = new Audio('wrong.mp3');
        $(".heroe2 > h1").html("<h1> Game Over!!! <br/> Press any key to restart. </h1>");
        loose.play();
        startOver();
    }
}