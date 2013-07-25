$(document).ready(function() {
	$('#rlBtn').click(function() {
		$('#login-overlay').fadeIn('fast');
	});
	
	$('.cover').click(function() {
		$('#login-overlay').fadeOut('fast');
	});
});