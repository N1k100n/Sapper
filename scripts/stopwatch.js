
// Секундомер
var iStopwatch_1 = 0;
var iStopwatch_2 = 0;
var iStopwatch_3 = -1;

var boolstartStopwatch = false;
function StartStopwatch() {
    boolstartStopwatch = true;
    Stopwatch();
}
function StopStopwatch() {
    clearTimeout(timeoutID);
    boolstartStopwatch = false;
    iStopwatch_1 = 0;
    iStopwatch_2 = 0;
    iStopwatch_3 = -1;
    Get("Stopwatch_3").style.backgroundPosition = coordsDigitalNumber[0];
    Get("Stopwatch_2").style.backgroundPosition = coordsDigitalNumber[0];
    Get("Stopwatch_1").style.backgroundPosition = coordsDigitalNumber[0];
}
function Stopwatch() {
    if (boolstartStopwatch) {
        if (iStopwatch_3 < 9 || iStopwatch_2 < 9 || iStopwatch_1 < 9) {
            if (iStopwatch_3 < 9) {
                iStopwatch_3++;
                Get("Stopwatch_3").style.backgroundPosition = coordsDigitalNumber[iStopwatch_3];
            } else {
                if (iStopwatch_2 < 9) {
                    iStopwatch_3 = 0;
                    Get("Stopwatch_3").style.backgroundPosition = coordsDigitalNumber[iStopwatch_3];
                    iStopwatch_2++;
                    Get("Stopwatch_2").style.backgroundPosition = coordsDigitalNumber[iStopwatch_2];
                } else {
                    iStopwatch_3 = 0;
                    Get("Stopwatch_3").style.backgroundPosition = coordsDigitalNumber[iStopwatch_3];
                    iStopwatch_2 = 0;
                    Get("Stopwatch_2").style.backgroundPosition = coordsDigitalNumber[iStopwatch_2];
                    iStopwatch_1++;
                    Get("Stopwatch_1").style.backgroundPosition = coordsDigitalNumber[iStopwatch_1];
                }
            }
        } else {
            iStopwatch_1 = 0;
            iStopwatch_2 = 0;
            iStopwatch_3 = 0;
            Get("Stopwatch_1").style.backgroundPosition = coordsDigitalNumber[0];
        }
        if (boolstartStopwatch) {
            timeoutID = setTimeout(Stopwatch, 1000);
        }
    }
}