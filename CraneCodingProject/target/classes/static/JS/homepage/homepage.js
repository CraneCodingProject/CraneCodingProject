function openLoginModal() {
    showLoginForm(), setTimeout(function() {
        $("#loginModal").modal("show")
    }, 230)
}function showLoginForm() {
	$('#email-error-id').hide();
	$('#password-error-id').hide();
	$('#fullname-signup-error-id').hide();
	$('#email-signup-error-id').hide();
	$('#pass-signup-error-id').hide();
	$('#repass-signup-error-id').hide();
    $("#loginModal .registerBox").fadeOut("fast", function() {
        $(".loginBox").fadeIn("fast"), $(".register-footer").fadeOut("fast", function() {
            $(".login-footer").fadeIn("fast")
        }), $(".modal-title").html("Login")
    }), $(".error").removeClass("alert alert-danger").html("")
}