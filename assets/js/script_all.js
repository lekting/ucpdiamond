$('#totop').toTop();
var clickDelay = 500
	, clickDelayTimer = null;
$('.burger-click-region').on('click', function () {
	if (clickDelayTimer === null) {
		var $burger = $(this);
		$burger.toggleClass('active');
		$burger.parent().toggleClass('is-open');
		if (!$burger.hasClass('active')) {
			$burger.addClass('closing');
		}
		clickDelayTimer = setTimeout(function () {
			$burger.removeClass('closing');
			clearTimeout(clickDelayTimer);
			clickDelayTimer = null;
		}, clickDelay);
	}
});