history.scrollRestoration = "manual";

$(window).on('beforeunload', function(){
      $(window).scrollTop(0);
});

window.onload = ()=> {
    var container=$("#loader")[0];
    container.style.visibility = 'hidden';
}

$(document).ready(()=> {
    $.fx.speeds.xslow = 3100;
    $("#body-animation").fadeIn("xslow");
})