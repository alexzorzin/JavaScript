window.onload = ()=> {
    var contenedor=$("#loader")[0];
    contenedor.style.visibility = 'hidden';
}

$(document).ready(()=> {
    $.fx.speeds.xslow = 3100;
    $("#body-animation").fadeIn("xslow");
})