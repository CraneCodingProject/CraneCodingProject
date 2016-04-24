var minutes = 0;
var seconds = -1;
var runTime;
//OnLoad
$(document).ready(function () {
    //Modal
    $('#testModal').hide();
    $('div#submitModal').hide();
    $('#validateChangeExerciseModel').hide();
    $('#validateGoToHomePageModal').hide();
    $('#validateGoBack').hide();
    //$('#startModal').hide();
    $('#validateSubmitModal').hide();
    $('#dropArea').empty();
    $('#showCodeModal').hide();
    $('#rulesModal').hide();
    $('#userHistoryModal').hide();
    //Popover
    //$('[data-toggle="popover"]').popover({
    //    html: true,
    //    content: function () {
    //        return $('#popover_content_wrapper').html();
    //    }

    //});
    //set height : 203px
    var h = $(window).height();
    $('.row').height(h + 'px');
    $('#dragArea').height(h - 55 + 'px');
    if (h * 0.67 < 349.74)
        $('#dropArea').height(h * 0.5 + 'px');
    else if (h * 0.67 > 485.75)
        $('#dropArea').height(h * 0.72 + 'px');
    else
        $('#dropArea').height(h * 0.685 + 'px');
});
//run time
//$('#starttheexercise').click(function () {
//    seconds = -1;
//    minutes = 0;
//    clearTimeout(runTime);
//    displayTime();
//});
//function checkTime(i) {
//    if (i < 10) { i = "0" + i };
//    return i;
//}
//function displayTime() {
//    seconds++;
//    if (seconds == 60) {
//        seconds = 0;
//        minutes++;
//    }
//    $('#time').html(checkTime(minutes) + ':' + checkTime(seconds));
//    runTime = setTimeout('displayTime()', 1000);
//}
//Rezive screen
window.onresize = function () {
    var h = $(window).height();
    $('.row').height(h + 'px');
    $('#dragArea').height(h - 55 + 'px');
    if (h * 0.67 < 349.74)
        $('#dropArea').height(h * 0.5 + 'px');
    else if (h * 0.67 > 485.75)
        $('#dropArea').height(h * 0.72 + 'px');
    else
        $('#dropArea').height(h * 0.685 + 'px');
}
//Add more case in switch
function btnEventAddMoreCaseInSwitchCase(id) {
    $('#addmorecase' + id).prepend(
        "<li class='in-switch caseClass' data-command='case' name='case' data-pass='false'>"
          + "'case <input data-pass='false' type='text' style='width:30px'></input> :'"
          + "<ol class='case-ol'>"
          + "</ol>"
       + "</li>"
    );
}
function abc(id) {
    $('#itemId' + id).remove();
}