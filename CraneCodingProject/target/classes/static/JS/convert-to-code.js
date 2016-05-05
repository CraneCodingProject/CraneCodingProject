var returnResult;
var demRunFor;
/*$("#btnRun").click(function(){
	$('#result').removeAttr('src');
	var CODE = "<script>function MATH (n) { var S; ";
	demRunFor=0;
	$('#dropArea .topdown').map(function(){
		if($(this).data('command')=='for'){
			CODE=CODE+forExecute($(this));
		}
		if($(this).data('command')=='while'){
			CODE=CODE+whileExecute($(this));
		}
		else if($(this).attr('name')=='gan'){
			CODE=CODE+ganExecute($(this));	
		}
		else if($(this).attr('name')=='var'){
			CODE=CODE+varExecute($(this));
		}
		else if($(this).attr('name')=='if'){
			CODE=CODE+ifExecute($(this));
		}
		else if($(this).attr('name')=='else'){
			CODE=CODE+elseExecute($(this));
		}
		else if($(this).attr('name')=='switchcase'){
			CODE=CODE+switchcaseExecute($(this));
		}
		else if($(this).attr('name')=='return'){
			CODE=CODE+returnExecute($(this)); 
		}
		else if($(this).attr('name')=='int' || $(this).attr('name')=='double'){
			CODE=CODE+dataTypeNumberExecute($(this)); 
		}
		else if($(this).attr('name')=='string'){
			CODE=CODE+stringExecute($(this));
		}
		else if($(this).attr('name')=='array'){
			CODE=CODE+arrayExecute($(this));	
		}
	});
	$('li').map(function(){
		$(this).data('pass',false);
	});
	$('input').map(function(){
		$(this).data('pass',false);
	});
	CODE = CODE + " return S; } document.write(MATH(" +$("#mathInput").val()+ "));</script>" ;
	var testJS="<script>function MATH (n) { var S; S = 10; return S; } document.write(MATH(10));<"+"/"+"script>";
	console.log( "shit: "+testJS );
	// IFRAME
	var ifr = document.getElementById("result");
	var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr. contentDocument;
	ifrw.document.open();
	ifrw.document.write(testJS);
	var getVal = $("#result").contents().find("body").html();
	console.log(getVal);
	ifrw.close();
});*/
function switchCaseCommandName(commandItem){
	var code="";
	switch(commandItem.attr('name')){
			case 'var': 	if(commandItem.data("pass")==false){
								code=code+varExecute(commandItem);
								commandItem.data("pass",true);
							}
				break;					 
			case 'gan': 	if(commandItem.data("pass")==false){
								code=code+ganExecute(commandItem);
								commandItem.data("pass",true);
							}
				break;
			case 'while': 	if(commandItem.data("pass")==false){
								code=code+whileExecute(commandItem);
								commandItem.data("pass",true);
							}
				break; 
			case 'for': 	if(commandItem.data("pass")==false){
								code=code+forExecute(commandItem);
								commandItem.data("pass",true);
							}
				break;
			case 'if': 		if(commandItem.data("pass")==false){
								code=code+ifExecute(commandItem);
								commandItem.data("pass",true);
							}		
				break;
			case 'else': 	if(commandItem.data("pass")==false){
								code=code+elseExecute(commandItem);
								commandItem.data("pass",true);
							}	
				break;
			case 'switchcase': 	if(commandItem.data("pass")==false){
								code = code + switchcaseExecute(commandItem);
								commandItem.data("pass",true);
							}	
				break;
			case 'return': 	if(commandItem.data("pass")==false){
								code = code + returnExecute(commandItem);
								commandItem.data("pass",true);
							}
				break;
			case 'int' : 	if(commandItem.data("pass")==false){
								code=code + dataTypeNumberExecute(commandItem);
								commandItem.data('pass',true);
							}
				break;
			case 'double' : 	if(commandItem.data("pass")==false){
								code=code + dataTypeNumberExecute(commandItem);
								commandItem.data('pass',true);
							}
				break;
			case 'string' : 	if(commandItem.data("pass")==false){
								code=code + stringExecute(commandItem);
								commandItem.data('pass',true);
							}
				break;	
			case 'array' : 	if(commandItem.data("pass")==false){
								code=code + arrayExecute(commandItem);
								commandItem.data('pass',true);
							}
				break;		
		}
		return code;
}
function switchcaseExecute(command){
	var code="";
	var inDefault="";
	code = code + command.data('command')+"( "+command.find('input').val()+" ) {";
	$('.container-case-ul'+command.data('droptime')).find('.in-switch').each(function(){
		if($(this).data("pass")==false){
		 	if($(this).data('command')!='default'){
				 code = code + $(this).data('command') +"'"+$(this).find('input').val() +"':" + switchcaseInCaseExecute($(this))+" break;";
			}
			else{
				code = code + $(this).data('command') +"'"+$(this).find('input').val() +"':" + switchcaseIndefaultExecute($(this));
			}
			$(this).data("pass",true);
		}
	});
	code = code + inDefault;
	return code;
}
function switchcaseInCaseExecute(command){
	var code="";
	command.find('.in-case-ol').each(function(){
		if($(this).data("pass")==false){
			code = code + switchCaseCommandName($(this));
			$(this).data("pass",true);
		}
	});
	return code;
}
function switchcaseIndefaultExecute(command){
	var code="";
	command.find('.in-default-ol').each(function(){
		if($(this).data("pass")==false){
			code = code + switchCaseCommandName($(this));
			$(this).data("pass",true);
		}
	});
	return code = code + "}";
}
function elseExecute(command){
	var code="";
	code = code + command.data('command')+" {";
	command.find('.in-else').each(function(){
		code=code+switchCaseCommandName($(this));
	});
	code=code+"}";
	return code;
}
function ifExecute(command){
	var code="";
	code = code + command.data('command')+"( "+command.find('input').val()+" ) {";
	command.find('.in-if').each(function(){
		code=code+switchCaseCommandName($(this));
	});
	code=code+"}";
	return code;
}
function demSumFor(){
	var demsumfor=0;
	$('#dropArea .forClass').map(function(){
		demsumfor++;
	});
	return demsumfor;
}
function forExecute(command){
    
    var code = "";
	if(demRunFor<demSumFor())
	{
	code=code+command.data('command')+" ( ";
		command.find('.input-in-for'+ command.data('droptime') +' input').each(function(){
			if($(this).data("pass")==false){
				code=code+$(this).val()+";";
				$(this).data("pass",true);
			}
		});
	code=code.substr(0,code.length-1);
	code=code+") {";
	var j=0;
	demRunFor++;
	command.find('.in-for').each(function(){
		code=code+switchCaseCommandName($(this));
	});
	code=code+"}";}
	return code;
}
function ganExecute(command){
	var i=0;
	var code="";
	command.find('input').each(function(){
		if(i==0){
			if($(this).data("pass")==false){
				code=code+$(this).val();
				$(this).data("pass",true);
			}
		}
		else{
			if($(this).data("pass")==false){
				code=code+" = "+$(this).val()+";";
				$(this).data("pass",true);
			}
		}
		i++;
	});
	return code;	
}
function varExecute(command){
	return command.data('command')+" "+command.find('input').val()+";";
}
function whileExecute(command){
	var code="";
	code=code+command.data('command')+" ( "+ command.find('input').val() +" ) {";
	var j=0;
	command.find('.in-while').each(function(){
		code=code+switchCaseCommandName($(this));
	});
	code=code+"}";
	return code;
}
function returnExecute(command){
	return command.data('command')+" "+command.find('input').val()+";";
}
function btnEventAddMoreCaseInSwitchCase(id){
	//alert('#addmorecase'+id);
	$('#addmorecase'+id).prepend(
		"<li class='in-switch caseClass' data-command='case' name='case' data-pass='false'>"
          +"case '<input data-pass='false' type='text' style='width:30px'></input>' :"
		  +"<ol class='case-ol'>"
          +"</ol>"
       +"</li>"
    );
}
function dataTypeNumberExecute(command) {
    console.log("fuck you bitch");
    var i = 0;
	var code=command.data('command')+ " ";
	command.find('input').each(function () {
	    console.log("fuck you bitch2");
		if(i==0){
			if($(this).data("pass")==false){
				code=code+$(this).val();
				$(this).data("pass",true);
			}
		}
		else{
			if($(this).data("pass")==false){
				code=code+" = "+$(this).val()+";";
				$(this).data("pass",true);
			}
		}
		i++;
	});
	return code;
}
function stringExecute(command){
	var i=0;
	console.log("abababab");
	var code=command.data('command')+" ";
	console.log("abababab:"+code);
	command.find('input').each(function(){
		if(i==0){
			if($(this).data("pass")==false){
				code=code+$(this).val();
				$(this).data("pass",true);
			}
		}
		else{
			if($(this).data("pass")==false){
				code=code+' = "'+$(this).val()+'";';
				$(this).data("pass",true);
			}
		}
		i++;
	});
	return code;
}
function arrayExecute(command){
	var i=0;
	var code=command.data('command')+" ";
	command.find('input').each(function(){
		if(i==0){
			if($(this).data("pass")==false){
				code=code+$(this).val();
				$(this).data("pass",true);
			}
		}
		else{
			if($(this).data("pass")==false){
				code=code+' = ['+$(this).val()+'];';
				$(this).data("pass",true);
			}
		}
		i++;
	});
	return code;
}
