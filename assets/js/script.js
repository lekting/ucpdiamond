$('.button-servers').click(function () {
	$('#serversmodal').addClass('in');
});
$('.closethis').click(function () {
	$('#serversmodal').removeClass('in');
});
$('.copy-server').click(function () {
	var copyvar = $(this);
	copyvar.addClass('ok')
	setTimeout(function () {
		copyvar.removeClass('ok')
	}, 2000)
});
$('.gobut').hover(function () {
	$('#mannew').toggleClass('in');
});
new Clipboard('.copy-server');
var heightTop;

function heighter(heightTop) {
	if (self.innerHeight) {
		heightTop = self.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientHeight) {
		heightTop = document.documentElement.clientHeight;
	}
	else if (document.body) {
		heightTop = document.body.clientHeight;
	}
	document.getElementById('content').style.height = heightTop - 300 + 'px';
}
heighter();
window.onresize = heighter;