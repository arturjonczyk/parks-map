var $search = $('.filter'),
	$button = $("#header__button");

$button.on('click', function() {
  $(this).toggleClass("hamburger--open");
  $search.toggleClass('filter-open');
});