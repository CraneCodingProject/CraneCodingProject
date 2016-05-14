 $(document).ready(function () {
      /**
       * 
       * When load  Hide all pop-up, modal
       */
      
      $('#loginForm').hide();
      $('#commandBlockModal').hide();
      $('#videoTutorialModal').hide();
      $('#logoutModal').hide();
      $('#CommandDetailModal').hide();
      $('#loginFacebookModal').hide();
  });
  $('.box-with-icon.text-center').click(function(){
	  $('#CommandDetailModal').show();
	  console.log("$(this).data('commandId'):"+$(this).data('commandtype'));
  });
 
 
 
 
  // $('#btn-sign-in').click(function(){
	// 	$('#loginForm').show();
	// 	console.log('khfdahjfbdafbdbf');
	// }); 
  $('#loginFacebook').click(function(){
	  $('#loginFacebookModal').show();
	  $('#loginForm').hide();
  })
  $('#btn-sign-out').click(function(){
		$('#logoutModal').show();
		console.log('khfdahjfbdafbdbf');
	}); 
  $('.close').click(function(){
    $('#loginForm').hide();
      $('#commandBlockModal').hide();
      $('#videoTutorialModal').hide();
      $('#logoutModal').hide();
      $('#CommandDetailModal').hide();
      $('#loginFacebookModal').hide();
  });
  $('#closeModal').click(function(){
    $('#loginForm').hide();
      $('#commandBlockModal').hide();
      $('#videoTutorialModal').hide();
      $('#logoutModal').hide();
      $('#loginFacebookModal').hide();
  });
  var video = 'http://www.youtube.com/embed/XGSy3_Czz8k?autoplay=0';
  function stopTutorialVideo () {
       //= $("#videoTutorial").attr("src");
      //console.log(video);
      var videoURL = $('#videoTutorial').prop('src');
      videoURL = videoURL.replace("&autoplay=1", "");
      $('#videoTutorial').prop('src', '');
      $('#videoTutorial').prop('src', videoURL);
      //$("#playerid").attr("src", video);
  }
  function playTutorialVideo() {
      var videoURL = $('#videoTutorial').prop('src');
      videoURL += "&autoplay=1";
      $('#videoTutorial').prop('src', videoURL);
  }
