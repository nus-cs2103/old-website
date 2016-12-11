/**
 * Removes the loading overlay.
 */
function removeOverlay() {
    $('#overlay').remove();
}

/**
 * Jumps to a section's heading.
 * The header is before the div.
 */
function jumpToSectionHeading(section) {
    var header = $('#' + section).prev();
    $(window).scrollTop(header.offset().top);
}

var preview = window.location.href.match(/\?preview=([^&#]*)/);
if (preview != null) {
    var part = preview[1];
    if (part == 'all') {
        loadSectionsIncrementally(0);
    } else {
        var section = 'handbook-' + part;
        var callback = function() {
            jumpToSectionHeading(section);
            removeOverlay();
        };
        loadSectionUsingAjax(section, callback);
    }
} else {
    $('a').click(function() {
        var section = $(this).attr('href').substring(1);
        var callback = function() {
            jumpToSectionHeading(section);
        };
        loadSectionUsingAjax(section, callback);
    });
    removeOverlay();
}

/**
 * Loads a single section on demand using ajax.
 * On success, execute the callback.
 */
function loadSectionUsingAjax(section, callback) {
    $.ajax({
        type: 'GET',
        url: section + '.html',
        error: function() {
        },
        success: function(data) {
            $('#' + section).html(data);
            callback();
        }
    });
}

/**
 * Load sections incrementally, through recursive call in ajax callback.
 * If the last section is loaded, remove the loading overlay and return.
 * Otherwise, load the next section.
 */
function loadSectionsIncrementally(index) {
    if (index == sections.length) {
        $('#overlay').remove();
        return;
    }
    var section = sections[index];
    $.ajax({
        type: 'GET',
        url: section + '.html',
        error: function() {
        },
        success: function(data) {
            $('#' + section).html(data);
            loadSectionsIncrementally(index + 1);
        }
    });
}

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
