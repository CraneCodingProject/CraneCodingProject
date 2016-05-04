$("#btnRun").click(function () {
    //$('#testCaseSubmit').empty();
  	console.log(testCODE());
    //console.log(getCodeJsToTest(3534));
    
});

$('#btnTest').click(function () {
    var inputParameter = $('#inputParameter').val();
    $('#actResult').html(getCodeJsToTest(inputParameter));
    console.log(getCodeJsToTest(inputParameter));
})
function testCODE() {
    dataNumberToNumber = '[{"inp":"1", "outp":"1"},{"inp":"4", "outp":"2"},{"inp":"3", "outp":"3"}]';
    dataArrayToNumber = '[{"inp":"[3,9,6,8]","outp":"9"},{"inp":"[3,10,6,8]","outp":"10"}]';
    dataArrayToArray = '[{"inp":"[987,657,333,666,555,444,33,3322,888,9999]","outp":"9999,888,3322,33,444,555,666,333,657,987"},{"inp":"[1,2,3]","outp":"3,2,1"},{"inp":"[3,2,1]","outp":"1,2,3"},{"inp":"[9,8,7]","outp":"7,8,9"}]';
    $('#testCaseSubmit').empty();
    $('#submitModal .modal-footer').find('h3').remove();
    var json = $.parseJSON(dataNumberToNumber);
    var test = true;
    var sumTestCases = 0;
    var falseTestCase = 0;
    $.each(json, function (index, abc) {
        sumTestCases++;
	    var statusCase = "<i style='color:#2BC430;font-size: xx-large;' class='fa fa-check'></i>";
	    if (getCodeJsToTest(abc.inp) != abc.outp) {
	        test = false;
	        falseTestCase++;
	        statusCase = "<i style='color:#C42B2B;font-size: xx-large;' class='fa fa-times'></i>";
	    }
	    setTimeout(function () {
	        $('#testCaseSubmit').append('<tr><td>' + abc.inp + '</td><td>' + getCodeJsToTest(abc.inp) + '</td><td>' + abc.outp + '</td><td>' + statusCase + '</td></tr>');
	    }, 300 * sumTestCases);
    });
    setTimeout(function () {
        $('#submitModal .modal-footer').append('<h3 style="float: left;">Your record : ' + (sumTestCases - falseTestCase) + '/' + sumTestCases + '</h3>');
    },300*(sumTestCases+1));
  	return test;
}
function getCodeJsToTest(inputParameterToTest){
	$('#result').removeAttr('src');
	var CODE = "<script>function MATH (n) { var S; ";
	demRunFor=0;
	$('#dropArea .topdown').map(function(){
	    switch ($(this).attr('name')) {
			case 'for' : CODE=CODE+forExecute($(this)); break;
			case 'while' : CODE=CODE+whileExecute($(this)); break;
			case 'gan' : CODE=CODE+ganExecute($(this)); break;
			case 'var' : CODE=CODE+varExecute($(this)); break;
			case 'if' : CODE=CODE+ifExecute($(this)); break;
			case 'else' : CODE=CODE+elseExecute($(this)); break;
			case 'switchcase' : CODE=CODE+switchcaseExecute($(this)); break;
			case 'return' : CODE=CODE+returnExecute($(this)); break;
			case 'int' : CODE=CODE+dataTypeNumberExecute($(this)); break;
			case 'double' : CODE=CODE+dataTypeNumberExecute($(this)); break;
			case 'string' : CODE=CODE+stringExecute($(this)); break;
			case 'array' : CODE=CODE+arrayExecute($(this)); break;
		}
	});
	$('li').map(function(){
		$(this).data('pass',false);
	});
	$('input').map(function(){
		$(this).data('pass',false);
	});
	CODE = CODE + "S=" + inputParameterToTest + "; return S; } document.write(MATH(" + inputParameterToTest + "));</script>";
	var ifr = document.getElementById("result");
	var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr. contentDocument;
	ifrw.document.open();
	ifrw.document.write(CODE);
	var getVal = $("#result").contents().find("body").html();
	ifrw.close();
	return getVal;
}