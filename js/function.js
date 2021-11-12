function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}


function myFunction1() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

$('.post-slider').slick({
    centerMode: true,
    centerPadding: '150px',
    slidesToShow: 3,
    nextArrow: $('.next'),
    prevArrow: $('.prev'),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });


const note1 = document.getElementById("note1");
const s1 = document.getElementById("s1")
note1.onmouseover = function(){
    s1.play();
}
note1.onmouseout = function(){
    s1.pause();
    s1.load();
}

const note2 = document.getElementById("note2");
const s2 = document.getElementById("s2")
note2.onmouseover = function(){
    s2.play();
}
note2.onmouseout = function(){
    s2.pause();
    s2.load();
}

var note3 = document.getElementById("note3");
var s3 = document.getElementById("s3")
note3.onmouseover = function(){
    s3.play();
}
note3.onmouseout = function(){
    s3.pause();
    s3.load();
}

var note4 = document.getElementById("note4");
var s4 = document.getElementById("s4")
note4.onmouseover = function(){
    s4.play();
}
note4.onmouseout = function(){
    s4.pause();
    s4.load();
}

var note5 = document.getElementById("note5");
var s5 = document.getElementById("s5")
note5.onmouseover = function(){
    s5.play();
}
note5.onmouseout = function () {
    s5.pause();
    s5.load();
}
