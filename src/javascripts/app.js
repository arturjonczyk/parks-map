$(document).ready(function() {
  $("[data-toggle]").click(function() {
    var toggle_el = $(this).data("toggle");
    $(toggle_el).toggleClass("open-sidebar");
  });
     
});

// var $search = $('.filter'),
// 	$button = $("#header__button");

// $button.on('click', function() {
//   $(this).toggleClass("hamburger--open");
//   $search.toggleClass('filter-open');
// });