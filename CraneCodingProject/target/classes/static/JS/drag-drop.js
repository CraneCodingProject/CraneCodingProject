var allCommand="";
var demFor=0;
var demSwitch=0;
var demItem = 0;
$(function () {
  var oldContainer;
$("#dragArea").sortable({
    group: 'serialization',
    drop: false,
    onDragStart: function ($item, container, _super) {
          if(!container.options.drop)
              $item.clone().insertAfter($item);
          _super($item, container);
       
    },
    onDrop:   function ($item, container, _super, event)
    {
        
        // make form dirty if have drop by set value to input and trgger
        var input = $('#testFormRequire');
        input.val('a');
        input.trigger('input');
        demItem++;
        //
        $item.attr("id", "itemId" + demItem);
        //$item.find('.close').attr("id", demItem);

        $item.find('.close').eq(0).remove();
        //$item.find('.btn').eq(0).remove();
        $item.prepend('<button type="button" class="close" data-dismiss="alert" aria-hidden="true" id="' + demItem + '" onclick="abc(this.id)"><i class="fa fa-times"></i></button>');
        

        //<button type="button" class="btn btn-warning btn-circle"><i class="fa fa-times"></i>
        //                    </button>


        if($item.parent().is("ul.trunggian")){
            $item.remove();
            alert("ko dc phep nam trong switch");
        }
        else if($item.parent().is(".row")){
                console.log("remove");
                $item.remove();
        }
        else{
            if($item.attr("name")=="for"){
                demFor++;
                $item.find('div').attr("class","input-in-for"+demFor);

                $item.data('droptime',''+demFor);
                if($item.parent().is(".while-ol")){
                    $item.attr('class','alert in-while forClass');
                }
                else if($item.parent().is(".for-ol")){
                    $item.attr('class','alert in-for forClass'); 
                }
                else if($item.parent().is(".if-ol")){
                    $item.attr('class','alert in-if forClass');
                }
                else if($item.parent().is(".else-ol")){
                    $item.attr('class','alert in-else forClass');
                }
                else if($item.parent().is('.case-ol')){
                    $item.attr('class','alert in-case-ol forClass');
                }
                else if($item.parent().is('.default-ol')){
                    $item.attr('class','alert in-default-ol forClass');
                }
                else{
                    $item.attr('class','alert topdown forClass');   
                }
            }
            else if($item.attr("name")=="while"){
                if($item.parent().is(".while-ol")){
                    $item.attr('class','in-while whileClass');
                }
                else if($item.parent().is(".for-ol")){
                    $item.attr('class','in-for whileClass');   
                }
                else if($item.parent().is(".if-ol")){
                    $item.attr('class','in-if whileClass');
                }
                else if($item.parent().is('.else-ol')){
                    $item.attr('class','in-else whileClass');
                }
                else if($item.parent().is('.case-ol')){
                    $item.attr('class','in-case-ol whileClass');
                }
                else if($item.parent().is('.default-ol')){
                    $item.attr('class','in-default-ol whileClass');
                }
                else{
                    $item.attr('class','topdown whileClass');   
                }
            }
            else if($item.attr("name")=="if"){
                if($item.parent().is(".while-ol")){
                    $item.attr('class','in-while ifClass');
                }
                else if($item.parent().is(".for-ol")){
                    $item.attr('class','in-for ifClass');   
                }
                else if($item.parent().is(".if-ol")){
                    $item.attr('class','in-if ifClass'); 
                }
                else if($item.parent().is(".else-ol")){
                    $item.attr('class','in-else ifClass'); 
                }
                else if($item.parent().is('.case-ol')){
                    $item.attr('class','in-case-ol ifClass');
                }
                else if($item.parent().is('.default-ol')){
                    $item.attr('class','in-default-ol ifClass');
                }
                else{
                    $item.attr('class','topdown ifClass');   
                }
            }
            else if($item.attr("name")=="else"){
                if($item.parent().is(".while-ol")){
                    $item.attr('class','in-while elseClass');
                }
                else if($item.parent().is(".for-ol")){
                    $item.attr('class','in-for forClass');   
                }
                else if($item.parent().is(".if-ol")){
                    $item.attr('class','in-if elseClass'); 
                }
                else if($item.parent().is(".else-ol")){
                    $item.attr('class','in-else elseClass');
                }
                else if($item.parent().is('.case-ol')){
                    $item.attr('class','in-case-ol elseClass');
                }
                else if($item.parent().is('.default-ol')){
                    $item.attr('class','in-default-ol elseClass');
                }
                else{
                    $item.attr('class','topdown elseClass');   
                }
            }
            else if($item.attr("name")=="switchcase"){
                demSwitch++;
                $item.data('droptime',''+demSwitch);
                $item.find('#addmorecase').attr("class","container-case-ul"+demSwitch+" trunggian");
                $item.find('.trunggian').attr("id","addmorecase"+demSwitch);
                $item.find('.classAddCaseInSwitchCommand').attr("id",""+demSwitch);
                if($item.parent().is(".while-ol")){
                    $item.attr('class','alert in-while switchcase');
                }
                else if($item.parent().is(".for-ol")){
                    $item.attr('class','alert in-for switchcase');   
                }
                else if($item.parent().is(".if-ol")){
                    $item.attr('class','alert in-if switchcase'); 
                }
                else if($item.parent().is(".else-ol")){
                    $item.attr('class','alert in-else switchcase');
                }
                else if($item.parent().is(".default-ol")){
                    $item.attr('class','alert in-default-ol switchcase');
                }
                else if($item.parent().is(".case-ol")){
                    $item.attr('class','alert in-case-ol switchcase');
                }
                else{
                    $item.attr('class','alert topdown switchcase');   
                }
            }
            else if($item.attr("name")=="gan" || $item.attr("name")=="var"|| $item.attr("name")=="return" || $item.attr("name")=="int" || $item.attr("name")=="double" || $item.attr("name")=="string" || $item.attr("name")=="array" || $item.attr("name")=="return"){
                if($item.parent().is(".while-ol")){
                    $item.attr('class','in-while');
                }
                else if($item.parent().is(".for-ol")){
                    $item.attr('class','in-for');
                }
                else if($item.parent().is(".if-ol")){
                    $item.attr('class','in-if');
                }
                else if($item.parent().is('.else-ol')){
                    $item.attr('class','in-else');
                }
                else if($item.parent().is('.case-ol')){
                    $item.attr('class','in-case-ol');
                }
                else if($item.parent().is('.default-ol')){
                    $item.attr('class','in-default-ol');
                }
                else if( !$item.parent().is(".while-ol") && !$item.parent().is(".for-ol")){
                     $item.attr('class','topdown');
                }
            }
            $item.removeClass(container.group.options.draggedClass).removeAttr("style");
            $("body").removeClass(container.group.options.bodyClass);
        }
    }
});
$("#dropArea").sortable({
    group: 'serialization',
    drop: true
});
$(".row").sortable({
    group: 'serialization',
    drop: false
});
});
