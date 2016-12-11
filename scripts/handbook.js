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
    var headerPosition = $('#' + section).prev().offset().top;
    $(window).scrollTop(headerPosition);
}

var preview = window.location.href.match(/\?preview=([^&#]*)/);
if (preview != null) {
    var part = preview[1];
    if (part == 'all') {
        loadSectionsIncrementally(0);
        $('a').click(function() {
            var section = this.hash.substring(1);
            jumpToSectionHeading(section);
        });
    } else {
        var section = 'handbook-' + part;
        var callback = function() {
            jumpToSectionHeading(section);
            removeOverlay();
        };
        loadSectionUsingAjax(section, callback);
        $('a[href="#' + section + '"]').click(function() {
            jumpToSectionHeading(section);
        });
    }
} else {
    $('a').click(function() { // Add behaviour 1: For most anchors
        var section = this.hash.substring(1);
        var callback = function() {
            jumpToSectionHeading(section);
        };
        loadSectionUsingAjax(section, callback);
    });

    var containerSection = 'handbook-appendixC-faq';
    var subsectionAnchors = $('a[href="#' + containerSection + '"]').next().find('a');
    subsectionAnchors.off();  // Remove behaviour 1
    subsectionAnchors.click(function() { // Add behaviour 2: For first click, trigger ajax load of containerSection
        var subsection = this.hash.substring(1);
        var callback = function() {
            jumpToSectionHeading(subsection);
        };
        loadSectionUsingAjax(containerSection, callback);
        subsectionAnchors.off();         // Remove behaviour 2
        subsectionAnchors.click(function(event) { // Add final behaviour: For subsequent clicks, jump to its header
            event.preventDefault();               // Prevent default behaviour of anchor tags
            subsection = this.hash.substring(1);
            jumpToSectionHeading(subsection);
        });
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

    $(window).scroll(function() {
        if (!isTableOfContentVisible()) {
            $('#back-to-top-button').fadeIn(buttonAnimationDuration);
        } else {
            $('#back-to-top-button').fadeOut(buttonAnimationDuration);
        }
    });
});
