
var timeCurrent = 0.00;
var theInterval;
var displaySecondInterval;
var displayTenthInterval;
var displayHundrethInterval;
var setAlready = false;
var timerGoing = false;
var popupOpen = false;
var inspectionGoing = false;
var penalty = false;
//var currentSelection;
var cubeTypeSelectedAtStart;

/////////// TIMER STUFF ///////////////////////////////////////

function getCurrentTime() {
    return timeCurrent;
}

//function checkCubeTypes() {
//    var selected = $("#cubeType").val();
//    if (selected != currentSelection) {
//        currentSelection = selected;
//        getCubeTimes();
//    }
//}

//function setTypeCheck() {
//    iv = setInterval(checkCubeTypes, 100);
//}



function timeDecision() {
    if (timerGoing) {
        stopTime();
    } else {
        if (!popupOpen) {
            if ($('#inspection').is(':checked')) {
                if (!inspectionGoing) {
                    startInspectionTime();
                } else {
                    stopInspectionTime();
                    startTime();
                }
            } else {
                startTime();
            }
        }
        else if (popupOpen) {
            removeSavePopUp();
            saveTime();
            resetTime();
        }
    }
}

function startInspectionTime() {
    if (!inspectionGoing) {
        inspectionGoing = true;
        timeCurrent = 15;
        $("#startBtn").removeClass("btn-success").addClass("btn-warning");
        $("#startBtn").html("Inspection");
        theInterval = setInterval(incrementInspectionTime, 10);
        displaySecondInterval = setInterval(displaySecond, 100);
        displayTenthInterval = setInterval(displayTenth, 100);
        displayHundrethInterval = setInterval(displayHundreth, 10);

    }
}

function incrementInspectionTime() {
    if (timeCurrent <= 0) {
        freezeInspectionTime();
        penalty = true;
    }
    var inter = timeCurrent -= 0.01;
    timeCurrent = Math.round(inter * 100) / 100;
}

function stopInspectionTime() {
    inspectionGoing = false;
    clearInterval(theInterval);
    clearInterval(displaySecondInterval);
    clearInterval(displayTenthInterval);
    clearInterval(displayHundrethInterval);

    resetTime();
}

function freezeInspectionTime() {
    clearInterval(theInterval);
    clearInterval(displaySecondInterval);
    clearInterval(displayTenthInterval);
    clearInterval(displayHundrethInterval);

    resetTime();
}



function startTime() {
    if (!setAlready) {
        var theType = $("#cubeType").val();
        cubeTypeSelectedAtStart = theType;
        $("#startBtn").removeClass("btn-success").removeClass("btn-warning").addClass("btn-danger");
        $("#startBtn").html("Stop Time");
        if (popupOpen) {
            removeSavePopUp();
        }

        theInterval = setInterval(incrementTime, 10);
        displaySecondInterval = setInterval(displaySecond, 100);
        displayTenthInterval = setInterval(displayTenth, 100);
        displayHundrethInterval = setInterval(displayHundreth, 10);
        setAlready = true;
        timerGoing = true;
    }
}

function stopTime() {
    if (setAlready) {
        getUpdatedScramble();
        $("#startBtn").removeClass("btn-danger").addClass("btn-success");
        $("#startBtn").html("Start Time");
        displaySavePopUp();

        clearInterval(theInterval);
        clearInterval(displaySecondInterval);
        clearInterval(displayTenthInterval);
        clearInterval(displayHundrethInterval);
        setAlready = false;
        timerGoing = false;
    }

    displayTenth();
    displayHundreth();
    displaySecond();
    
}

function resetTime() {
    stopTime();
    timeCurrent = 0.00;
    $("#timerDiv").css("width", "10px");
    $("#period").css("margin-left", "11px");
    $("#seconds").css("margin-right", "30px");
    document.getElementById("timerDiv").innerHTML = "0";
    document.getElementById("tenths").innerHTML = "0";
    document.getElementById("milli").innerHTML = "0";
    document.getElementById("minute").innerHTML = "";
    document.getElementById("seconds").innerHTML = "s";
    document.getElementById("minDiv").innerHTML = "";
}

function displaySecond() {
    var toDisplay = timeCurrent.toString();
    if (toDisplay.indexOf(".") > 1) {
        $("#timerDiv").css("width", "55px");
        $("#period").css("margin-left", "0px");
        var secs = toDisplay.slice(0, toDisplay.indexOf("."));
        var numSecs = parseInt(secs);
        if (numSecs > 59) {
            var numMinutes = Math.floor(numSecs / 60);
            var leftOverSeconds = numSecs % 60;
            if (leftOverSeconds < 10) {
                $("#timerDiv").css("width", "10px");
                $("#period").css("margin-left", "11px");
                $("#seconds").css("margin-right", "15px");
            } else {
                $("#seconds").css("margin-right", "10px");
            }


            toDisplay = leftOverSeconds.toString();
            var minutesDisplay = numMinutes.toString();
            if (numMinutes >= 10) {
                $("#minDiv").css("width", "55px");
            } else {
                $("#minDiv").css("width", "30px");
            }
            document.getElementById("timerDiv").innerHTML = toDisplay;
            document.getElementById("minDiv").innerHTML = minutesDisplay;
            document.getElementById("minute").innerHTML = "m";

        } else {
            toDisplay = numSecs.toString();
            document.getElementById("timerDiv").innerHTML = toDisplay;
        }
    }
    else {
        $("#timerDiv").css("width", "10px");
        $("#period").css("margin-left", "11px");
        toDisplay = toDisplay.slice(0, toDisplay.indexOf("."));
        document.getElementById("timerDiv").innerHTML = toDisplay;
    }
}

function displayTenth() {
    var toDisplay = timeCurrent.toString();
    toDisplay = toDisplay.slice(toDisplay.indexOf(".") + 1, toDisplay.indexOf(".") + 2);
    document.getElementById("tenths").innerHTML = toDisplay;
}

function displayHundreth() {
    var toDisplay = timeCurrent.toString();
    toDisplay = toDisplay.slice(toDisplay.indexOf(".") + 2, toDisplay.indexOf(".") + 3);
    document.getElementById("milli").innerHTML = toDisplay;
}


function incrementTime() {
    
    var inter = timeCurrent += 0.01;
    timeCurrent = Math.round(inter * 100) / 100;
}



function displaySavePopUp() {
    var todisplay =
        '<div class="well" id="popup" style="display: block; height: 115px; width: 150px;">' +
            '<button class="btn btn-success" style= "width : 100px; background-color: darkviolet; border-color: dimgray;" onclick="removeSavePopUp(), saveTime(), resetTime()"> Save Time</button>' +
            '<button class="btn btn-warning" style="width: 100px; margin-top: 10px; background-color: crimson; border-color: dimgray;" onclick="resetTime(), removeSavePopUp()">Discard Time</button> </div>';


    $("#popupDiv").css({"text-align" : "center", "display" : "block"});
    popupOpen = true;

    document.getElementById("popupDiv").innerHTML = todisplay;
}

function removeSavePopUp() {
    document.getElementById("popupDiv").innerHTML = "";
    popupOpen = false;
}


/////////// SCRAMBLE STUFF ///////////////////////////////////////

function displayScramble(scramble) {
    document.getElementById("displayer").innerHTML = "";
    document.getElementById("displayer").innerHTML = scramble;
}



/////////// TABLE BUILDING STUFF ///////////////////////////////////////

function buildStatTable(data) {
    var average;
    var total = 0;
    var largest = 0;
    var smallest = 9999;

    var count = 0;
    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            var unit = data[i];
            total += unit.Time;
            count++;
        }
    }
    average = total / count;


    for (var q in data) {
        if (data.hasOwnProperty(q)) {
            var unit1 = data[q];
            if (unit1.Time > largest) {
                largest = unit1.Time;
            }
        }
        
    }


    for (var z in data) {
        if (data.hasOwnProperty(z)) {
            var unit2 = data[z];
            if (unit2.Time < smallest) {
                smallest = unit2.Time;
            }
        }
    }

    var lastTwelve = getLastTenAverage(data);
    var lastThree = getLastThreeAverage(data);
    var lastFifty = getLastFiftyAverage(data);
    var lastHundred = getLastHundredAverage(data);
    var lastFiveHundred = getLastFiveHundredAverage(data);
    var lastThousand = getLastThousandAverage(data);
    var threeOfFive = getThreeOfFive(data);
    var tenOfTwelve = getTenOfTwelve(data);

    buildLastFiveTable(data);

    if (lastTwelve === -1) {
        lastTwelve = "*";
    } else {
        lastTwelve = convertTime(roundNumber(lastTwelve));
    }
    if (lastThree === -1) {
        lastThree = "*";
    } else {
        lastThree = convertTime(roundNumber(lastThree));
    }
    if (lastFifty === -1) {
        lastFifty = "*";
    } else {
        lastFifty = convertTime(roundNumber(lastFifty));
    }
    if (lastHundred === -1) {
        lastHundred = "*";
    } else {
        lastHundred = convertTime(roundNumber(lastHundred));
    }
    if (lastFiveHundred === -1) {
        lastFiveHundred = "*";
    } else {
        lastFiveHundred = convertTime(roundNumber(lastFiveHundred));
    }
    if (lastThousand === -1) {
        lastThousand = "*";
    } else {
        lastThousand = convertTime(roundNumber(lastThousand));
    }
    if (threeOfFive === -1) {
        threeOfFive = "*";
    } else {
        threeOfFive = convertTime(roundNumber(threeOfFive));
    }
    if (tenOfTwelve === -1) {
        tenOfTwelve = "*";
    } else {
        tenOfTwelve = convertTime(roundNumber(tenOfTwelve));
    }
    

    average = convertTime(roundNumber(average));
    smallest = convertTime(roundNumber(smallest));
    largest = convertTime(roundNumber(largest));



    //if (lastThree === -1) {
    //    lastThree = "*";
    //}

    //if (lastFifty === -1) {
    //    lastFifty = "*";
    //}
    //if (lastHundred === -1) {
    //    lastHundred = "*";
    //}
    //if (lastFiveHundred === -1) {
    //    lastFiveHundred = "*";
    //}
    //if (lastThousand === -1) {
    //    lastThousand = "*";
    //}

    //if (lastThree === -99) {
    //    lastThree = " ";
    //}
    //if (lastTwelve === -1) {
    //    lastTwelve = "*";
    //}
    //if (lastTwelve === -99) {
    //    lastTwelve = " ";
    //}
    if (count === 0) {
        average = "*";
        largest = "*";
        smallest = "*";
    }

    var tableBegin = "<table id='statsTable'>";
    var tableEnd = "</table>";
    var largestRow = "<tr><td style='width: 125px'>Worst Time</td><td style='width: 125px'>" + largest + "</td></tr>";
    var smallestRow = "<tr><td style='width: 125px'>Best Time</td><td style='width: 125px'>" + smallest +"</td></tr>";
    var averageRow = "<tr><td style='width: 125px'>Avg</td><td style='width: 125px'>" + average + "</td></tr>";
    //var lastThreeRow = "<tr><td style='width: 125px'>Avg 3</td><td style='width: 125px'>" + lastThree + "</td></tr>";
    //var lastTwelveRow = "<tr><td style='width: 125px'>Avg 12</td><td style='width: 125px'>" + lastTwelve + "</td></tr>";
    //var lastFiftyAvgRow = "<tr><td style='width: 125px'>Avg 50</td><td style='width: 125px'>" + lastFifty + "</td></tr>";
    //var lastHundredRow = "<tr><td style='width: 125px'>Avg 100</td><td style='width: 125px'>" + lastHundred + "</td></tr>";
    //var lastFiveHundredRow = "<tr><td style='width: 125px'>Avg 500</td><td style='width: 125px'>" + lastFiveHundred + "</td></tr>";
    //var lastThousandRow = "<tr><td style='width: 125px'>Avg 1000</td><td style='width: 125px'>" + lastThousand + "</td></tr>";
    var threeOfFiveRow = "<tr><td style='width: 125px'>3 of 5</td><td style='width: 125px'>" + threeOfFive + "</td></tr>";
    var tenOfTwelveRow = "<tr><td style='width: 125px'>10 of 12</td><td style='width: 125px'>" + tenOfTwelve + "</td></tr>";
    var finalTable = tableBegin + largestRow + smallestRow + averageRow + tenOfTwelveRow + threeOfFiveRow + tableEnd;

    $("#statsTable").replaceWith(finalTable);
}

function buildLastFiveTable(data) {
    var index = data.length - 1;


    var tableArray = Array();

    if (data.length < 5) {

        for (var i = 0; i < data.length; i++) {
            tableArray[i] = data[index].Time;
            index--;
        }

        var count = 4;
        for (var i = 0; i < (5 - data.length); i++) {
            tableArray[count] = "*";
            count--;
        }

    } else if (data.length >= 5) {
        for (var i = 0; i < 5; i++) {
            tableArray[i] = data[index].Time;
            index--;
        }
    }

    var first = convertTime(tableArray[0]);
    var second = convertTime(tableArray[1]);
    var third = convertTime(tableArray[2]);
    var fourth = convertTime(tableArray[3]);
    var fifth = convertTime(tableArray[4]);

    if (data.length == 0) {
        first = "*";
        second = "*";
        third = "*";
        fourth = "*";
        fifth = "*";
    } else if (data.length == 1){
        second = "*";
        third = "*";
        fourth = "*";
        fifth = "*";
    } else if (data.length == 2) {
        third = "*";
        fourth = "*";
        fifth = "*";
    } else if (data.length == 3) {
        fourth = "*";
        fifth = "*";
    } else if (data.length == 4) {
        fifth = "*";
    }
        


    var tableBegin = "<table class='table-striped' id='recentTable'>";
    var tableEnd = "</table>";
    var header = "<thead><tr><td>Recent Times</td></tr></thead>";
    var bodyBegin = "<tbody>";
    var bodyEnd = "</tbody>";
    var firstRow = "<tr><td style='width: 75px'>" + first + "</td></tr>";
    var secondRow = "<tr><td style='width: 75px'>" + second + "</td></tr>";
    var thirdRow = "<tr><td style='width: 75px'>" + third + "</td></tr>";
    var fourthRow = "<tr><td style='width: 75px'>" + fourth + "</td></tr>";
    var fifthRow = "<tr><td style='width: 75px'>" + fifth + "</td></tr>";

    var finalTable = tableBegin + header + bodyBegin + firstRow + secondRow + thirdRow + fourthRow + fifthRow + bodyEnd + tableEnd;

    $("#recentTable").replaceWith(finalTable);

}


function getThreeOfFive(data) {
    var index = data.length - 1;


    var tableArray = Array();

    if (data.length >= 5) {

        for (var i = 0; i < 5; i++) {
            tableArray[i] = data[index].Time;
            index--;
        }
    }else if (data.length < 5) {
        return -1;
    }

    
    tableArray.sort();
    tableArray.pop();
    tableArray.shift();

    var total = 0;
    for (var i = 0; i < 3; i++) {
        total += tableArray[i];
    }

    return total / 3;

}

function getTenOfTwelve(data) {
    var index = data.length - 1;


    var tableArray = Array();

    if (data.length >= 12) {

        for (var i = 0; i < 12; i++) {
            tableArray[i] = data[index].Time;
            index--;
        }
    } else if (data.length < 12) {
        return -1;
    }


    tableArray.sort();
    tableArray.pop();
    tableArray.shift();

    var total = 0;
    for (var i = 0; i < 10; i++) {
        total += tableArray[i];
    }

    return total / 10;

}

function convertTime(time) {
    var stringTime = time.toString();
    var minAndSec;

    var tenth = stringTime.slice(stringTime.indexOf(".") + 1, stringTime.indexOf(".") + 2);
    var hundreth = stringTime.slice(stringTime.indexOf(".") + 2, stringTime.indexOf(".") + 3);

    var secs = stringTime.slice(0, stringTime.indexOf("."));


    if (stringTime.indexOf(".") > 1) {// if double digits

        var numSecs = parseInt(secs);
        if (numSecs > 59) {
            var numMinutes = Math.floor(numSecs / 60);
            var leftOverSeconds = numSecs % 60;



            var secondDisplay = leftOverSeconds.toString();
            var minutesDisplay = numMinutes.toString();

            minAndSec = minutesDisplay + "m " + secondDisplay;
        } else {
            minAndSec = numSecs.toString();
        }
    }
    else {

        minAndSec = stringTime.slice(0, stringTime.indexOf("."));

    }

    var result =  minAndSec + "." + tenth + hundreth + "s";

    return result;
}


function getLastThreeAverage(data) {

    var index = data.length - 1;
    var total = 0;
    var final = -99;
    if (data.length < 3) {
        final = -1;

    }else if (data.length >= 3) {
        for (var i = 0; i < 3; i++) {
            total += data[index].Time;
            index--;
        }

        final = total / 3;
    }


    return final;


}

function getLastFiftyAverage(data) {
    var index = data.length - 1;
    var total = 0;
    var final = -99;
    if (data.length < 50) {
        final = -1;

    } else if (data.length >= 50) {
        for (var i = 0; i < 50; i++) {
            total += data[index].Time;
            index--;
        }

        final = total / 50;
    }


    return final;
}

function getLastHundredAverage(data) {
    var index = data.length - 1;
    var total = 0;
    var final = -99;
    if (data.length < 100) {
        final = -1;

    } else if (data.length >= 100) {
        for (var i = 0; i < 100; i++) {
            total += data[index].Time;
            index--;
        }

        final = total / 100;
    }


    return final;
}

function getLastFiveHundredAverage(data) {
    var index = data.length - 1;
    var total = 0;
    var final = -99;
    if (data.length < 500) {
        final = -1;

    } else if (data.length >= 500) {
        for (var i = 0; i < 500; i++) {
            total += data[index].Time;
            index--;
        }

        final = total / 500;
    }


    return final;
}

function getLastThousandAverage(data) {
    var index = data.length - 1;
    var total = 0;
    var final = -99;
    if (data.length < 1000) {
        final = -1;

    } else if (data.length >= 1000) {
        for (var i = 0; i < 1000; i++) {
            total += data[index].Time;
            index--;
        }

        final = total / 1000;
    }


    return final;
}

function roundNumber(num) {
    var correct = Math.round(num * 1000) / 1000;
    return correct;
}

function getLastTenAverage(data) {
    var index = data.length - 1;
    var total = 0;
    var final = -99;


    if (data.length < 12) {
        final = -1;
        
    } else if (data.length >= 12) {
        for (var i = 0; i < 12; i++) {
            total += data[index].Time;
            index--;
        }

        final = total / 12;
    }


    return final;

}





function removeTypeOption(option) {
    $('#cubeType option').each(function () {
        if ($(this).val() == option) {
            $(this).remove();
        }
    });
}


function appendLoadedCubeTypes(data) {

    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            var unit = data[i];
            if (!isInList(unit.Type)) {
                $("#cubeType").append($("<option>", {
                    value: unit.Type,
                    text: unit.Type
                }));
            }
        }
    }
}

function makeDuplicateCubeTypeDD(data) {
    $("#cubeTypeDup").children().remove();

    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            var unit = data[i];
            $("#cubeTypeDup").append($("<option>", {
                value: unit.Type,
                text: unit.Type
            }));
        }
    }
}

function isInList(type) {
    var optionExists = $('#cubeType option[value=' + type + ']').length > 0;
    return optionExists;
}
