$(document).ready(function() {
	$('#rlBtn').click(function() {
		$('#login-overlay').show();
	});
	
	$('.cover').click(function() {
		$('#login-overlay').hide();
	});
});