/**
 * Jumps to a section's heading.
 * The header is before the div.
 * Account for Safari scrolling.
 */
function jumpToSectionHeading(section) {
    var isSafariBrowser = !navigator.userAgent.includes('Chrome') && navigator.userAgent.includes('Safari');
    var windowToScroll = window;
    var headingsFrameOffset = 0;
    if(isSafariBrowser && (windowToScroll != window.top)) {
        windowToScroll = window.top;
        headingsFrameOffset = 60; // From index.html
    }
    var headerPosition = $('#' + section).prev().offset().top;
    $(windowToScroll).scrollTop(headerPosition + headingsFrameOffset);
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
            var images = $('#' + section + ' img');
            if (images.length == 0) {
                callback();
            } else {
                var imagesLoaded = 0;
                images.on('load', function() {
                    imagesLoaded++;
                    if (imagesLoaded == images.length) {
                        callback();
                    }
                });
            }
        }
    });
}

/**
 * Load all sections asynchronously.
 * Increment number of sections loaded in callback.
 * If all sections loaded, remove the loading overlay.
 */
function loadAllSections() {
    var sectionsLoaded = 0;
    for (var i in sections) {
        var section = sections[i];
        var callback = function() {
            sectionsLoaded++;
            if (sectionsLoaded == sections.length) {
                $('#overlay').remove();
            }
        };
        loadSectionUsingAjax(section, callback);
    }
}

function isTableOfContentVisible() {
    var windowTop = $(window).scrollTop();
    var tableTop = $('#table-of-contents').offset().top;
    var tableBottom = $('#table-of-contents').height() + tableTop;
    return windowTop < tableBottom;
}

$(document).ready(function() {
    var preview = window.location.href.match(/\?preview=([^&#]*)/);

    if (preview) {
        var section = preview[1];
        var isNotPolicySection = (section.match(/^policy-/) == null);
        if (isNotPolicySection) {
            section = 'handbook-' + section;
        }
        addLoadOnDemandToAnchors();
        $('a[href="#' + section + '"]').click();
        $('#overlay').remove();
    } else {
        loadAllSections();
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
