$('.code').on('click', () => $('.code input').focus());

function calcCodeWidth () {
    var codeWidth = $(window).width() - ($('.menu').width() + $('.submenu').width());
    $('.main').width(codeWidth);
}

calcCodeWidth();
$(window).on('resize', () => { calcCodeWidth(); });