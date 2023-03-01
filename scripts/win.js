// Победа
function win() {
    var k = 0;
    for (let i = 0; i < 256; i++) {
        if (Get("Tiles").children[i].style.opacity == "") {
            k++;
        }
    }
    if (k == 40) {
        Get("Smiley").style.backgroundPosition = coords.smileySpectacled;
        
        clearTimeout(timeoutID);
        boolstartStopwatch = false;

        Get("Tiles").style.pointerEvents = "none";

        counter = 0;
        CounterMine();

        Get("Back_Light").style.background = "radial-gradient(circle, green 0%, transparent 60%)";
        Get("Back_Light").style.scale = "1.8";
        setTimeout("Get('Back_Light').style.scale = '1.5'", 1000);

        for (let i = 0; i < 255; i++) {
            if (Get("Tiles").children[i].style.backgroundPosition != coords.checkbox) {
                Get("Tiles").children[i].style.opacity = "0";
                Get("Tiles").children[i].style.pointerEvents = "none";
            }
        }

        var audio = new Audio();
        audio.src = 'src/win.mp3';
        audio.autoplay = true;
    }
}