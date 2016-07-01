const {remote} = require('electron');
const {dialog} = remote;

window.$ = window.jQuery = require('jquery');
let modal;

$('.code').on('click', () => $('.code input').focus());

function calcCodeWidth () {
    var codeWidth = $(window).width() - ($('.menu').width() + $('.submenu').width());
    $('.main').width(codeWidth);
}

calcCodeWidth();
$(window).on('resize', () => { calcCodeWidth(); });

$('.code input').on('click', () => {
    test();
});

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  createModal();
}, false);

function createModal () {
  modal = dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
}