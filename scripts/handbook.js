setTimeout(function () {
    for (var i in sections) {
        var section = sections[i];
        $.ajax({
            type: 'GET',
            async: false,
            url: section + '.html',
            error: function() {
            },
            success: function(data) {
                $('#' + section).html(data);
            }
        });
    }
    $('#overlay').remove();
}, 0);

function isTableOfContentVisible() {
    var windowTop = $(window).scrollTop();
    var tableTop = $('#table-of-contents').offset().top;
    var tableBottom = $('#table-of-contents').height() + tableTop;
    return windowTop < tableBottom;
}

$(document).ready(function() {
    var buttonAnimationDuration = 200;
    var speed = 1;

    function scrollToPosition(scrollTopPosition) {
        $('html,body').animate({
            scrollTop: scrollTopPosition
        }, speed);
    }

    $('#back-to-top-button').button();
    $('#back-to-top-button').click(function(e) {
        scrollToPosition(0);
    });

    $('a').click(function() {
        var adjustment = 73;
        var header = this.hash;
        scrollToPosition($(header).offset().top - adjustment);
    });

    $(window).scroll(function() {
        if (!isTableOfContentVisible()) {
            $('#back-to-top-button').fadeIn(buttonAnimationDuration);
        } else {
            $('#back-to-top-button').fadeOut(buttonAnimationDuration);
        }
    });
});
