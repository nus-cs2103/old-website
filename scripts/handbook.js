/**
 * Jumps to a section's heading.
 * The header is before the div.
 */
function jumpToSectionHeading(section) {
    var headerPosition = $('#' + section).prev().offset().top;
    $(window).scrollTop(headerPosition);
}

/**
 * Adds jumps-to-section-heading behaviour for anchors.
 * Previous behaviour is remove and default is blocked.
 */
function addJumpToSectionHeadingBehavior(anchors) {
    anchors.off(); // Remove previous behaviour
    anchors.click(function(event) {
        event.preventDefault(); // Prevent default behaviour
        jumpToSectionHeading(this.hash.substring(1));
    });
}

/**
 * Adds load-on-demand capability for anchors in table-of-contents.
 * This capability is triggered when any of the anchors is clicked.
 */
function addLoadOnDemandToAnchors() {
    var allAnchors = $('a');
    handleClickForAllAnchors(allAnchors);

    // Appendix B
    var policySection = 'handbook-appendixB-policies';
    var policyAnchors = $('a[href^="#policy-"]');
    handleClickForAppendixAnchors(policySection, policyAnchors);

    // Appendix C
    var faqSection = 'handbook-appendixC-faq';
    var faqAnchors = $('a[href="#' + faqSection + '"]').next().find('a');
    handleClickForAppendixAnchors(faqSection, faqAnchors);
}

/**
 * Handles onclick event for all anchors.
 * For first click, load 'section' using ajax then jump to 'section' heading.
 * For subsequent clicks, jump to 'section' heading only.
 */
function handleClickForAllAnchors(allAnchors) {
    allAnchors.click(function() {
        var thisAnchor = $(this);
        var section = this.hash.substring(1);
        var callback = function() {
            jumpToSectionHeading(section);
            addJumpToSectionHeadingBehavior(thisAnchor);
        };
        loadSectionUsingAjax(section, callback);
    });
}

/**
 * Handles onclick event for Appendix B and C anchors (subsections in common HTML file).
 * For first click, load 'containerSection' using ajax then jump to 'subsection' heading.
 * For subsequent clicks, jump to 'subsection' heading only.
 */
function handleClickForAppendixAnchors(containerSection, subsectionAnchors) {
    subsectionAnchors.off(); // Remove previous behaviour
    subsectionAnchors.click(function() {
        var subsection = this.hash.substring(1);
        var callback = function() {
            jumpToSectionHeading(subsection);
            addJumpToSectionHeadingBehavior(subsectionAnchors);
        };
        loadSectionUsingAjax(containerSection, callback);
    });
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
    var callback = function() {
        loadSectionsIncrementally(index + 1);
    }
    loadSectionUsingAjax(section, callback);
}

function isTableOfContentVisible() {
    var windowTop = $(window).scrollTop();
    var tableTop = $('#table-of-contents').offset().top;
    var tableBottom = $('#table-of-contents').height() + tableTop;
    return windowTop < tableBottom;
}

$(document).ready(function() {
    var preview = window.location.hash.substring(1);

    if (preview) {
        addLoadOnDemandToAnchors();
        $('a[href="#' + preview + '"]').click();
        $('#overlay').remove();
    } else {
        loadSectionsIncrementally(0);
        addJumpToSectionHeadingBehavior($('a'));
    }

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
