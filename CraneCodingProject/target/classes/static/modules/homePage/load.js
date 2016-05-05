 $(document).ready(function () {
      $('#loginForm').hide();
      $('#commandBlockModal').hide();
      $('#videoTutorialModal').hide();
      $('#logoutModal').hide();
  });
  $('#btn-sign-in').click(function(){
		$('#loginForm').show();
		console.log('khfdahjfbdafbdbf');
	}); 
  
  $('#btn-sign-out').click(function(){
		$('#logoutModal').show();
		console.log('khfdahjfbdafbdbf');
	}); 
  $('.close').click(function(){
    $('#loginForm').hide();
      $('#commandBlockModal').hide();
      $('#videoTutorialModal').hide();
      $('#logoutModal').hide();
  });
  $('#closeModal').click(function(){
    $('#loginForm').hide();
      $('#commandBlockModal').hide();
      $('#videoTutorialModal').hide();
      $('#logoutModal').hide();
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
