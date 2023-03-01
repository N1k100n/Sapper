
// Загрузка поля
function loadField(params) {
    for (let i = 0; i < 256; i++) {
        Get("Field").insertAdjacentHTML("beforeend", "<div></div>")
    }
    for (let i = 0; i < 256; i++) {
        Get("Tiles").insertAdjacentHTML("beforeend", "<button></button>")
    }
}
loadField();
var numberOfClicks = 0;

// Нажатие на плитки
Get("Tiles").addEventListener("contextmenu", function() {
    event.preventDefault();
});
Get("Tiles").addEventListener("mouseup", function() {
    if(event.button == 2){
        contextmenuOnTiles();
        return;
    }
    
    mouseupOnTiles();
});
Get("Tiles").addEventListener("mousedown", function() {
    if(event.button == 2){
        return;
    }
    ScaredEmoticon();
});

// Левая кнопка
function mouseupOnTiles() {
    // Первое нажатие
    if (event.target.style.backgroundPosition == "") {
        if (event.target.id != "Tiles" && numberOfClicks == 0) {
            event.target.style.opacity = "0";
            event.target.style.pointerEvents = "none";
            var index;
            for (let i = 0; i < 256; i++) {
                if (event.target == event.target.parentNode.children[i]) {
                    index = i;
                    break;
                }
            }
            var audio = new Audio();
            audio.src = 'src/click.mp3';
            audio.autoplay = true;

            loadMine(index);
            cellDiscovery(index);
            StartStopwatch();
        }
        // Последующие нажатия
        if (event.target.id != "Tiles" && numberOfClicks > 0) {
            event.target.style.opacity = "0";
            event.target.style.pointerEvents = "none";
            var index;
            for (let i = 0; i < 256; i++) {
                if (event.target == event.target.parentNode.children[i]) {
                    index = i;
                    break;
                }
            }
            var audio = new Audio();
            audio.src = 'src/click.mp3';
            audio.autoplay = true;
            
            loss(index);
            cellDiscovery(index);
            win();
        }

        numberOfClicks++;
    }
}
// Правая кнопка
function contextmenuOnTiles() {
    if (event.target.id != "Tiles") {
        if (event.target.style.backgroundPosition == "") {
            event.target.style.backgroundPosition = coords.checkbox;
            counter--;
            CounterMine();
        } else if (event.target.style.backgroundPosition == coords.checkbox) {
            event.target.style.backgroundPosition = coords.question;
            counter++;
            CounterMine();
        } else if (event.target.style.backgroundPosition == coords.question) {
            event.target.style.backgroundPosition = "";
        }
        var audio = new Audio();
        audio.src = 'src/tick.mp3';
        audio.autoplay = true;
    }
}

// Загрузка цифр на поле
function loadQuantityNearby() {
    for (let i = 0; i < 256; i++) {
        var numberOfMines = 0;
        if (Get("Field").children[i].style.backgroundPosition == "") {
            if (i > BorderCheckLeft(i)) {
                if (Get("Field").children[i - 17] != undefined) {
                    if (Get("Field").children[i - 17].style.backgroundPosition == coords.mine) {numberOfMines++}
                }
                if (Get("Field").children[i - 1] != undefined) {
                    if (Get("Field").children[i - 1].style.backgroundPosition == coords.mine) {numberOfMines++}
                }
                if (Get("Field").children[i + 15] != undefined) {
                    if (Get("Field").children[i + 15].style.backgroundPosition == coords.mine) {numberOfMines++}
                }
            }
            if (i < BorderCheckRight(i)) {
                if (Get("Field").children[i - 15] != undefined) {
                    if (Get("Field").children[i - 15].style.backgroundPosition == coords.mine) {numberOfMines++}
                }
                if (Get("Field").children[i + 1] != undefined) {
                    if (Get("Field").children[i + 1].style.backgroundPosition == coords.mine) {numberOfMines++}
                }
                if (Get("Field").children[i + 17] != undefined) {
                    if (Get("Field").children[i + 17].style.backgroundPosition == coords.mine) {numberOfMines++}
                }
            }
            if (Get("Field").children[i - 16] != undefined) {
                if (Get("Field").children[i - 16].style.backgroundPosition == coords.mine) {numberOfMines++}
            }
            if (Get("Field").children[i + 16] != undefined) {
                if (Get("Field").children[i + 16].style.backgroundPosition == coords.mine) {numberOfMines++}
            }
            
    
            if (numberOfMines != 0) {
                Get("Field").children[i].style.backgroundPosition = coordsNumber[numberOfMines];
            }
        }
    }
}

// Загрузка поля с минами
function loadMine(firstTileIndex) {
    for (let i = 0; i < 40; i++) {
        var rand = Math.round(Math.random() * 255);

        if (rand != firstTileIndex
            && rand != firstTileIndex - 17
            && rand != firstTileIndex - 16
            && rand != firstTileIndex - 15
            && rand != firstTileIndex - 1
            && rand != firstTileIndex + 1
            && rand != firstTileIndex + 15
            && rand != firstTileIndex + 16
            && rand != firstTileIndex + 17) {
            if (Get("Field").children[rand].style.backgroundPosition != coords.mine) {
                Get("Field").children[rand].style.backgroundPosition = coords.mine;
            } else {
                i--;
            }
        } else {
            i--;
        }
    }
    loadQuantityNearby();
}

// Открытие клеток где нет мин
function cellDiscovery(indexTile) {
    for (let j = 0; j < 20; j++) {
        for (let i = 0; i < 256; i++) {
            if (Get("Tiles").children[i].style.opacity == "0" && Get("Field").children[i].style.backgroundPosition == "") {
                if (i <= 15) {
                    if (i == 0) {
                        OpenTheCage(i, "R");
                        OpenTheCage(i, "BR");
                        OpenTheCage(i, "B");
                    }
                    if (i == 15) {
                        OpenTheCage(i, "L");
                        OpenTheCage(i, "BL");
                        OpenTheCage(i, "B");
                    }
                    if (i > 0 && i < 15) {
                        OpenTheCage(i, "R");
                        OpenTheCage(i, "BR");
                        OpenTheCage(i, "B");
                        OpenTheCage(i, "BL");
                        OpenTheCage(i, "L");
                    }
                    continue;
                }
                if (i >= 240) {
                    if (i == 240) {
                        OpenTheCage(i, "R");
                        OpenTheCage(i, "TR");
                        OpenTheCage(i, "T");
                    }
                    if (i == 255) {
                        OpenTheCage(i, "L");
                        OpenTheCage(i, "TL");
                        OpenTheCage(i, "T");
                    }
                    if (i > 240 && i < 255) {
                        OpenTheCage(i, "R");
                        OpenTheCage(i, "TR");
                        OpenTheCage(i, "T");
                        OpenTheCage(i, "TL");
                        OpenTheCage(i, "L");
                    }
                    continue;
                }

                if (i == BorderCheckLeft(i)) {
                    OpenTheCage(i, "T");
                    OpenTheCage(i, "TR");
                    OpenTheCage(i, "R");
                    OpenTheCage(i, "BR");
                    OpenTheCage(i, "B");
                    continue;
                }
                if (i == BorderCheckRight(i)) {
                    OpenTheCage(i, "T");
                    OpenTheCage(i, "TL");
                    OpenTheCage(i, "L");
                    OpenTheCage(i, "BL");
                    OpenTheCage(i, "B");
                    continue;
                }
                if (i < BorderCheckRight(i) && i > BorderCheckLeft(i)) {
                    OpenTheCage(i, "TL");
                    OpenTheCage(i, "T");
                    OpenTheCage(i, "TR");
                    OpenTheCage(i, "R");
                    OpenTheCage(i, "BR");
                    OpenTheCage(i, "B");
                    OpenTheCage(i, "BL");
                    OpenTheCage(i, "L");
                }
            }
        }
    }
}
// Открытие плиток по очереди
function OpenTheCage(index, side) {
    switch (side) {
        case "T":
            if (Get("Tiles").children[index - 16].style.backgroundPosition == "") {
                Get("Tiles").children[index - 16].style.opacity = "0";
                Get("Tiles").children[index - 16].style.pointerEvents = "none";
            }
            break;
        case "R":
            if (Get("Tiles").children[index + 1].style.backgroundPosition == "") {
                Get("Tiles").children[index + 1].style.opacity = "0";
                Get("Tiles").children[index + 1].style.pointerEvents = "none";
            }
            break;
        case "B":
            if (Get("Tiles").children[index + 16].style.backgroundPosition == "") {
                Get("Tiles").children[index + 16].style.opacity = "0";
                Get("Tiles").children[index + 16].style.pointerEvents = "none";
            }
            break;
        case "L":
            if (Get("Tiles").children[index - 1].style.backgroundPosition == "") {
                Get("Tiles").children[index - 1].style.opacity = "0";
                Get("Tiles").children[index - 1].style.pointerEvents = "none";
            }
            break;
        case "TL":
            if (Get("Tiles").children[index - 17].style.backgroundPosition == "") {
                Get("Tiles").children[index - 17].style.opacity = "0";
                Get("Tiles").children[index - 17].style.pointerEvents = "none";
            }
            break;
        case "TR":
            if (Get("Tiles").children[index - 15].style.backgroundPosition == "") {
                Get("Tiles").children[index - 15].style.opacity = "0";
                Get("Tiles").children[index - 15].style.pointerEvents = "none";
            }
            break;
        case "BL":
            if (Get("Tiles").children[index + 15].style.backgroundPosition == "") {
                Get("Tiles").children[index + 15].style.opacity = "0";
                Get("Tiles").children[index + 15].style.pointerEvents = "none";
            }
            break;
        case "BR":
            if (Get("Tiles").children[index + 17].style.backgroundPosition == "") {
                Get("Tiles").children[index + 17].style.opacity = "0";
                Get("Tiles").children[index + 17].style.pointerEvents = "none";
            }
            break;
    }
}
// Проверка на границу
function BorderCheckRight(indexTile) {
    if (indexTile >= 0 && indexTile <= 15) {return 15}
    if (indexTile >= 16 && indexTile <= 31) {return 31}

    if (indexTile >= 32 && indexTile <= 47) {return 47}
    if (indexTile >= 48 && indexTile <= 63) {return 63}
    
    if (indexTile >= 64 && indexTile <= 79) {return 79}
    if (indexTile >= 80 && indexTile <= 95) {return 95}

    if (indexTile >= 96 && indexTile <= 111) {return 111}
    if (indexTile >= 112 && indexTile <= 127) {return 127}

    if (indexTile >= 128 && indexTile <= 143) {return 143}
    if (indexTile >= 144 && indexTile <= 159) {return 159}
    
    if (indexTile >= 160 && indexTile <= 175) {return 175}
    if (indexTile >= 176 && indexTile <= 191) {return 191}

    if (indexTile >= 192 && indexTile <= 207) {return 207}
    if (indexTile >= 208 && indexTile <= 223) {return 223}

    if (indexTile >= 224 && indexTile <= 239) {return 239}
    if (indexTile >= 240 && indexTile <= 255) {return 255}
}
function BorderCheckLeft(indexTile) {
    if (indexTile >= 0 && indexTile <= 15) {return 0}
    if (indexTile >= 16 && indexTile <= 31) {return 16}

    if (indexTile >= 32 && indexTile <= 47) {return 32}
    if (indexTile >= 48 && indexTile <= 63) {return 48}
    
    if (indexTile >= 64 && indexTile <= 79) {return 64}
    if (indexTile >= 80 && indexTile <= 95) {return 80}

    if (indexTile >= 96 && indexTile <= 111) {return 96}
    if (indexTile >= 112 && indexTile <= 127) {return 112}

    if (indexTile >= 128 && indexTile <= 143) {return 128}
    if (indexTile >= 144 && indexTile <= 159) {return 144}
    
    if (indexTile >= 160 && indexTile <= 175) {return 160}
    if (indexTile >= 176 && indexTile <= 191) {return 176}

    if (indexTile >= 192 && indexTile <= 207) {return 192}
    if (indexTile >= 208 && indexTile <= 223) {return 208}

    if (indexTile >= 224 && indexTile <= 239) {return 224}
    if (indexTile >= 240 && indexTile <= 255) {return 240}
}
