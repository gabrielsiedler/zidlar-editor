const {remote} = require('electron');
const {dialog, Menu, MenuItem} = remote;

window.$ = window.jQuery = require('jquery');
const modal = $('#modal');

$('.code').on('click', () => $('.code input').focus());

function calcCodeWidth() {
    var codeWidth = $(window).width() - ($('.menu').width() + $('.submenu').width());
    $('.main').width(codeWidth);
}

calcCodeWidth();
$(window).on('resize', () => {
    calcCodeWidth();
});

window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    createModal('right click');
}, false);

function createModal(feature, customMessages) {
    const okMessages = [
        'Ok',
        'Ok. Lets buy it.',
        'I want that!',
        'Full version please!',
        'Of course!',
        'Would love that!'
    ];

    const noMessages = [
        'No',
        'No way',
        'Not convinced yet',
        'Maybe later',
        'No, thanks',
        'Rather not'
    ];

    const randomOkMessage = okMessages[Math.floor(Math.random() * okMessages.length)];
    const randomNoMessage = noMessages[Math.floor(Math.random() * noMessages.length)];
    
    $('#yes').text(randomOkMessage);
    $('#no').text(randomNoMessage);
    $('#feature').text(feature);
    $('#custom').html('');

    if (customMessages) {
        if (Array.isArray(customMessages)) {
            customMessages.forEach(message => $('#custom').append(`<p>${message}</p>`));
        } else {
            $('#custom').append(`<p>${customMessages}</p>`)
        }
    }

    modal.show();
    $('.code input').blur();
}

$('a, i, span, li').click(function() {
    if($(this).attr("data-click")) {
        const feature = $(this).attr("data-click");
        const comment = $(this).attr("data-comment");

        createModal(feature, comment);
    };
});
// $()
// if ($("#dataTable").attr('data-timer'))

$('#no, #close').on('click', () => {
    modal.hide();
    $('.code input').focus();
});

$('#yes').on('click', () => {
    alert('Sorry! Pricing page is under development :(');
});



$(window).on('resize', (e) => {
    e.preventDefault();
    createModal('resize', 'Full professional resize, minimize and maximize are pro features.');
});

let template = [{
  label: 'Menu',
  submenu: [{
    label: 'Only in full version',
    click: function() {
      console.log('menu item clicked'); // executed
    }},
    {
    label: 'Exit',
    role: 'close'
  }]
}];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

menu.items[0].submenu.items[0].enabled = false;

$(".code input").keydown(function(e) {

    if ($(".code input").val().length >= 12) {
        createModal('More than 12 characters', 'If you want to make more codeful files, go pro!');
        return;
    }
    const w = e.which;

    if (e.ctrlKey) {
        switch(w) {
            case 65:
                e.preventDefault();
                createModal('Select all');
                break;
            case 67:
                e.preventDefault();
                createModal('Copy');
                break;
            case 83:
                e.preventDefault();
                createModal('Save');
                break;
            case 86:
                e.preventDefault();
                createModal('Paste');
                break;
        }
    } else {
        switch (w) {
            case 65:
            case 69:
            case 73:
            case 79:
            case 85:
                e.preventDefault();
                createModal('vowels', 'Do you think you need this? Go full!');
                break;
            case 13:
                e.preventDefault();
                createModal('enter');
                break;
        }
    }
});