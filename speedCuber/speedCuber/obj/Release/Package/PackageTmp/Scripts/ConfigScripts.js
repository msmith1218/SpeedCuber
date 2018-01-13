



function createTimeTable(data) {

    var totalDisplay = "";
    var tableBegin = "<table id='timeTable' class='table-striped'><tr><td>Time</td><td>Type</td><td>Delete</td></tr>";
    var tableEnd = "</table>";

    totalDisplay = totalDisplay + tableBegin;

    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            var unit = data[i];
            var time = convertTime(unit.Time);
            var id = unit.Id;
            var type = unit.Type;
            if (type == "1101100011011101") {
                type = "Default 3x3";
            }
            var deleteRow = "deleteCurrentRow('" + id.toString() +"')";
            totalDisplay += "<tr id='" + id.toString() + "'><td>"+ time.toString() +"</td><td>"+ type +"</td><td style='width:33px'><button style='margin-left:4px;' class='btn btn-danger btn-sm' onclick=" + deleteRow + "><small><span class='glyphicon glyphicon-remove'></span></small></button></td></tr>";


        }
    }

    totalDisplay += tableEnd;

    $("#timeTable").replaceWith(totalDisplay);


}

function updateTable(id) {

    $("#" + id.toString()).remove();
}

function deleteCurrentRow(id) {
    deleteCubeTime(id);
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

    var result = minAndSec + "." + tenth + hundreth + "s";

    return result;
}