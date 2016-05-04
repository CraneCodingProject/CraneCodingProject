$(document).ready(function () {
  
    $('#defaultForm').validate({
        rules: {
            intInput: {
                required: true,
                number: true,
                integer: true
            },
            doubleInput: {
                required: true,
                number: true
            }
        },
        errorPlacement: function (error, element) {
        },
        highlight: function (input) {
            $(input).addClass('error');
        }
    });
    $("#defaultForm").removeAttr("novalidate");
});
/*$('.validate').on('keyup blur', function () {
    console.log("[phat]");
    if ($('#defaultForm').valid())
    {
        $('#btnRun').prop('disabled', false);
    } 
    else 
    {
        $('#btnRun').prop('disabled', 'disabled');
    }
});*/