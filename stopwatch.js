var outputElement = document.getElementById("output");
var showResultsTable = document.getElementById("showResults");
var tableResults = document.getElementById("tableResults");

var startButton = document.getElementById("startButton");
var resetButton = document.getElementById("resetButton");
var timeButton = document.getElementById("timeButton");
var stopButton = document.getElementById("stopButton");
var lapButton = document.getElementById("lapButton");

startButton.addEventListener("click", startCounting);
resetButton.addEventListener("click", resetCounter);
timeButton.addEventListener("click", getCurrentTimeOnDisplay);
stopButton.addEventListener("click", stopTime);
lapButton.addEventListener("click", function() {
    getCurrentTimeOnDisplay(true);
}, );

setInterval(Timer, 100);

var startValue = 0;
var clockEnabled = false;
var stoppButtonActivated = false;
var resultsCounter = 1;
var resetButtonCounter = 0;
var elapsedTime = 0;
var savedValue = 0;
var duration = 0;
var currentDate = 0;
var isStopped = false;
var enableStoppButton = true;

function stopTime() {
    stoppButtonActivated = true;
    isStopped = true;
}

function Timer() {


    if (clockEnabled && !stoppButtonActivated) {
        currentDate = new Date();
        duration = new Date(currentDate - startValue + savedValue);
        elapsedTime = addZero(duration.getMinutes()) + ":" + addZero(duration.getSeconds()) + ":" + addZeroMs(duration.getMilliseconds());

        outputElement.innerHTML = elapsedTime;
    } else if (clockEnabled && stoppButtonActivated) {
        outputElement.innerHTML = elapsedTime;
        if (isStopped && enableStoppButton) {
            savedValue = currentDate - startValue + savedValue;
            isStopped = false;
            enableStoppButton = false;
        }
    } else {
        outputElement.innerHTML = "00:00:000";
    }
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function addZeroMs(i) {
    if (i < 10) {
        i = "00" + i;
    } else if (i >= 10 && i < 100) {
        i = "0" + i;
    }
    return i;
}

function startCounting() {
    startValue = Date.now();

    resetButtonCounter = 0

    clockEnabled = true;
    stoppButtonActivated = false;
    enableStoppButton = true;
}

function resetCounter() {
    clockEnabled = false;

    if (resetButtonCounter > 0) {
        while (tableResults.lastElementChild) {
            tableResults.removeChild(tableResults.lastElementChild);
        }
        resetButtonCounter = 0;
        resultsCounter = 1;
        savedValue = 0;
        stoppButtonActivated = false;
    } else {
        resetButtonCounter++
    }
}

function getCurrentTimeOnDisplay(round = false) {

    var timeFromDisplay = document.createTextNode(outputElement.innerHTML);
    var resultsCounterValue = document.createTextNode(resultsCounter);

    var element = document.createElement("tr");
    var elementLine = document.createElement("td");
    var elementCounter = document.createElement("td");


    elementLine.appendChild(timeFromDisplay);
    elementCounter.appendChild(resultsCounterValue);

    element.appendChild(elementCounter);
    element.appendChild(elementLine);

    tableResults.append(element);

    if (round == true) {
        startValue = Date.now();
        savedValue = 0;
    }

    resultsCounter++;
}