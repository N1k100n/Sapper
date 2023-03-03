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
        ExplosionWaveMin(index);

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
function ExplosionWaveMin(index) {

    Get("Boom").insertAdjacentHTML("beforeend", "<p></p>");

    Get("Boom").lastElementChild.style.height = "20px";
    Get("Boom").lastElementChild.style.width = "20px";
    Get("Boom").lastElementChild.style.left = Get("Tiles").children[index].getBoundingClientRect().left - Get("Tiles").getBoundingClientRect().left + 10 + "px";
    Get("Boom").lastElementChild.style.top = Get("Tiles").children[index].getBoundingClientRect().top - Get("Tiles").getBoundingClientRect().top + 10 + "px";
    Get("Boom").lastElementChild.style.scale = "10";
    Get("Boom").lastElementChild.style.opacity = "0";
    

    console.log(index - 17);
    console.log(Get("Tiles").children[index + 17]);
    for (let i = index - 17; i < index + 18; i++) {
        if (i < BorderCheckRight(i) && i > BorderCheckLeft(i)) {
            if (i >= index - 17 && i <= index - 15) {
                Get("Tiles").children[i].style.scale = "1.2";
                setTimeout(ExplosionWaveTime, 300, i);
                Get("Field").children[i].style.scale = "1.2";
                setTimeout(ExplosionWaveTime, 300, i);
            }
            if (i == index - 1 || i == index + 1) {
                Get("Tiles").children[i].style.scale = "1.2";
                setTimeout(ExplosionWaveTime, 300, i);
                Get("Field").children[i].style.scale = "1.2";
                setTimeout(ExplosionWaveTime, 300, i);
                
            }
            if (i >= index + 15 && i <= index + 17) {
                Get("Tiles").children[i].style.scale = "1.2";
                setTimeout(ExplosionWaveTime, 300, i);
                Get("Field").children[i].style.scale = "1.2";
                setTimeout(ExplosionWaveTime, 300, i);
            }
        }
    }
    setTimeout(ExplosionWaveMax, 200, index);
}
function ExplosionWaveMax(index) {
    console.log(index - 33);
    console.log(Get("Tiles").children[index + 33]);
    for (let i = index - 33; i < index + 34; i++) {
        if (i < BorderCheckRight(i) && i > BorderCheckLeft(i) && i < BorderCheckRight(i) - 1 && i > BorderCheckLeft(i) + 1) {
            if (i >= index - 33 && i <= index - 31) {
                Get("Tiles").children[i].style.scale = "1.1";
                setTimeout(ExplosionWaveTime, 300, i);
                Get("Field").children[i].style.scale = "1.2";
                setTimeout(ExplosionWaveTime, 300, i);
            }
            if (i == index - 18 || i == index - 14) {
                Get("Tiles").children[i].style.scale = "1.1";
                setTimeout(ExplosionWaveTime, 300, i);
                Get("Field").children[i].style.scale = "1.2";
                setTimeout(ExplosionWaveTime, 300, i);
            }
            if (i == index - 2 || i == index + 2) {
                Get("Tiles").children[i].style.scale = "1.1";
                setTimeout(ExplosionWaveTime, 300, i);
                Get("Field").children[i].style.scale = "1.2";
                setTimeout(ExplosionWaveTime, 300, i);
            }
            if (i == index + 14 || i == index + 18) {
                Get("Tiles").children[i].style.scale = "1.1";
                setTimeout(ExplosionWaveTime, 300, i);
                Get("Field").children[i].style.scale = "1.2";
                setTimeout(ExplosionWaveTime, 300, i);
            }
            if (i >= index + 31 && i <= index + 33) {
                Get("Tiles").children[i].style.scale = "1.1";
                setTimeout(ExplosionWaveTime, 300, i);
                Get("Field").children[i].style.scale = "1.2";
                setTimeout(ExplosionWaveTime, 300, i);
            }
        }
    }
}
function ExplosionWaveTime(index) {
    Get("Tiles").children[index].style.scale = "";
    Get("Field").children[index].style.scale = "";
}