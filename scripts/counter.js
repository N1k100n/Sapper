
// Счетчик
Get("Counter_2").style.backgroundPosition = coordsDigitalNumber[4];
var counter = 40;
function CounterMine() {
    if (counter >= 0) {
        Get("Counter_3").style.backgroundPosition = coordsDigitalNumber[counter % 10];
        Get("Counter_2").style.backgroundPosition = coordsDigitalNumber[(counter - (counter % 10)) / 10];
    }
}