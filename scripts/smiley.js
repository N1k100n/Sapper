
// Нажатие на смайлик
Get("Smiley").addEventListener("mousedown", function() {
    event.target.style.backgroundPosition = coords.smileyPress;
});
Get("Smiley").addEventListener("mouseup", function() {
    if (numberOfClicks != 0) {
        StopStopwatch();
    }
    event.target.style.backgroundPosition = coords.smiley;
    numberOfClicks = 0;
    Get("Field").innerHTML = "";
    Get("Tiles").innerHTML = "";
    Get("Boom").innerHTML = "";
    loadField();
    counter = 40;
    Get("Counter_2").style.backgroundPosition = coordsDigitalNumber[4];
    Get("Counter_3").style.backgroundPosition = coordsDigitalNumber[0];
    Get("Tiles").style.pointerEvents = "";

    var audio = new Audio();
    audio.src = 'src/start.mp3';
    audio.autoplay = true;

    Get("Back_Light").style.scale = "1";
});

// Испуганный смайлик
function ScaredEmoticon() {
    if (event.target.id != "Tiles") {
        if (event.target.style.backgroundPosition == "") {
            Get("Smiley").style.backgroundPosition = coords.smileyFrightened;
        }
    }
}
Get("Tiles").addEventListener("mouseup", function() {
    if (event.target.id != "Tiles") {
        Get("Smiley").style.backgroundPosition = coords.smiley;
    }
});

// Смайлик Грустный
function SmileySad() {
    Get("Smiley").style.backgroundPosition = coords.smileySad;
}