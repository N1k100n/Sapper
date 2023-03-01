// Проигрыш
function loss(index) {
    if (Get("Field").children[index].style.backgroundPosition == coords.mine) {
        Get("Field").children[index].style.backgroundPosition = coords.mineboom;
        for (let i = 0; i < 255; i++) {
            if (Get("Tiles").children[i].style.backgroundPosition == coords.checkbox) {
                if (Get("Field").children[i].style.backgroundPosition != coords.mine) {
                    Get("Tiles").children[i].style.opacity = "0";
                    Get("Tiles").children[i].style.pointerEvents = "none";
                    Get("Field").children[i].style.backgroundPosition = coords.nomine;
                }
            }
            if (Get("Tiles").children[i].style.opacity == "") {
                if (Get("Field").children[i].style.backgroundPosition == coords.mine) {
                    Get("Tiles").children[i].style.opacity = "0";
                    Get("Tiles").children[i].style.pointerEvents = "none";
                }
            }
        }
        Get("Back_Light").style.background = "radial-gradient(circle, red 0%, transparent 60%)";
        Get("Back_Light").style.scale = "1.8";
        setTimeout("Get('Back_Light').style.scale = '1.5'", 1000);

        Get("Tiles").style.pointerEvents = "none";
        SmileySad();
        clearTimeout(timeoutID);
        boolstartStopwatch = false;

        var audio = new Audio();
        audio.src = 'src/lose.mp3';
        audio.autoplay = true;
    }
}