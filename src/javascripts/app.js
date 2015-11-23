$(document).ready(function(){
	$('#content__hamburger-button').on('click', function(){
		$(this).toggleClass('open');
		$('.content').toggleClass('is-open');
	});
});