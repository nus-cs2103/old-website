var preview = window.location.href.match(/\?preview=([^&#]*)/);
if (preview != null) {
    var section = 'handbook-' + preview[1];
    sections = [section];
    $(window).scrollTop($('#' + section).prev().offset().top);
}

/**
 * Load sections incrementally, through recursive call in ajax callback.
 * If the last section is loaded, remove the loading overlay and return.
 * Otherwise, load the next section in setTimeout(0) to allow rendering.
 */
function loadSectionsIncrementally(index) {
    if (index == sections.length) {
        $('#overlay').remove();
        return;
    }
    setTimeout(function () {
        var section = sections[index];
        $.ajax({
            type: 'GET',
            async: false,
            url: section + '.html',
            error: function() {
            },
            success: function(data) {
                $('#' + section).html(data);
                loadSectionsIncrementally(index + 1);
            }
        });
    }, 0);
}

loadSectionsIncrementally(0);

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
