$(document).ready(function () {
  // got it btn script
  $(".got-btn-show").click(function () {
    $(".got-it-popup").show();

    return false;
  });
  $("#got-it-hide").click(function () {
    $(".got-it-popup").hide();
  });

  $("body").click(function () {
    $(".got-it-popup").hide();
  });

  // message popup
  $("#chat_1").click(function () {
    $(".message-area").show();
  });
  $("#user_back").click(function () {
    $(".message-area").hide();

    return false;
  });

  // Color popup
  $("#skin-what-color").click(function () {
    $(".color-popup").show();

    return false;
  });
  $("#plus-popup").click(function () {
    $(".color-popup").hide();

    return false;
  });

  // Mobile menu
  $("#mobile-bars").click(function () {
    // $(".mobile-area").show();

    $(".mobile-area").css("right", "0");

    return false;
  });
  $("#mobile-close").click(function () {
    $(".mobile-area").css("right", "-100%");

    return false;
  });

  // load page script
  //load function page load

  var al_selector = document.querySelectorAll("a[load]");

  for (let index = 0; index < al_selector.length; index++) {
    al_selector[index].addEventListener("click", function () {
      var url = this.getAttribute("load");
      $("body").load(url);
      return false;
    });
  }
});

VanillaTilt.init(document.querySelector(".skin"), {
  max: 15,
  speed: 200,
});
VanillaTilt.init(document.querySelector(".lab"), {
  max: 15,
  speed: 200,
});

const mySong = document.getElementById("sw");
const icon = document.getElementById("preview");
icon.onclick = function(){
  if(mySong.pause){
    mySong.play();
    icon.src = "assets/img/pause.png";
  }else{
    mySong.pause();
    icon.src = "assets/img/play.png"
  }
}

