// Change this to set the module start date
// Format: 'Year.Month.Date'
// E.g. '2015.8.10'
var MODULE_START_DATE = setModuleStartDate('2016.8.8');
var MONTH_NAMES_SHORT_FORM = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function setModuleStartDate(inputDate) {
    var dateArray = inputDate.split('.');
    var year = dateArray[0];
    var month = dateArray[1] - 1; // Javascript's month are zero-indexed
    var date = dateArray[2];
    return new Date(year, month, date);
}

function makeAccordion(elementSelector) {
    $(elementSelector).accordion({
        active: false,
        collapsible: true,
        heightStyle: 'content'
    });
}

function getContentUsingAjax(fileName, elementSelector, sectionName) {
    pullContent(fileName, elementSelector, 'Extract from handbook', sectionName);
}

function pullContent(fileName, elementSelector, title, sectionName) {
    var toBeLoaded = fileName + '.html' + (sectionName == undefined ? '' : ' #' + sectionName);
    var directLink = 'handbook.html#'+fileName;
    var linkNotice = '<span class="important">{Some links in this embedded content box might not work. ' +
        'If you need to follow the links, please go to the <a href="' + directLink + '" target="_blank">relevant section</a> ' +
        'of the handbook instead}</span>';
    $(elementSelector).html('<img class="embedded-link-loading-img" src="../images/ajax-preload.gif" alt="Loading...">');
    $(elementSelector).load(toBeLoaded, function(response, status, xhr) {
        if (status == 'success') {
            $(elementSelector).addClass('embedded');
            $(elementSelector).prepend('<div><span class="embeddedHeading">' + title + '</span><button onclick="$(\'' + elementSelector + '\').html(\'\');' +
               ' $(\'' + elementSelector + '\').removeClass(\'embedded\');" ' +
               'class="btn-dismiss">X</button><br><br> '+linkNotice+' </div>');
            $(elementSelector + ' > div > .btn-dismiss').button();
        }
    }); 
}

function addCollapseAndExpandButtonsForComponents(accordionHeaderSelector, divId) {
    $(accordionHeaderSelector).append('<button id="collapse-' + divId + '" class="btn-collapse">- -</button>' +
                                      '<button id="expand-' + divId + '" class="btn-expand">+ +</button>');
    $(accordionHeaderSelector + ' > .btn-collapse').on('click', function(e) {
        e.stopPropagation();
        var divId = $(this).attr('id').substr(('collapse-').length);
        var expandedAccordions = $('.' + divId + ' > .ui-accordion-header-active');
        $(expandedAccordions).click();
        $(this).hide();
        $(accordionHeaderSelector + ' > .btn-expand').show();
        showExpandAllButton(accordionHeaderSelector);
        if ($(accordionHeaderSelector).hasClass('ui-accordion-header-active')) {
            $(accordionHeaderSelector).click();
        }
    });
    $(accordionHeaderSelector + ' > .btn-collapse').button();
    $(accordionHeaderSelector + ' > .btn-collapse').hide();
    $(accordionHeaderSelector + ' > .btn-expand').on('click', function(e) {
        e.stopPropagation();
        var divId = $(this).attr('id').substr(('expand-').length);
        var collapseInnerAccordionsButtons = $('.' + divId + ' h3 > .btn-collapse');
        $(collapseInnerAccordionsButtons).click();
        var collapsedAccordions = $('.' + divId + ' > h3:not(.ui-accordion-header-active)');
        $(collapsedAccordions).click();
        $(this).hide();
        $(accordionHeaderSelector + ' > .btn-collapse').show();
        if (!$(accordionHeaderSelector).hasClass('ui-accordion-header-active')) {
            $(accordionHeaderSelector).click();
        }
    });
    $(accordionHeaderSelector + ' > .btn-expand').button();
    $(accordionHeaderSelector).on('click', function(e) {
        // show [++] if any collapsed accordion exists in all children
        var allCollapsedAccordions = $('.' + divId + ' h3:not(.ui-accordion-header-active)');
        if (allCollapsedAccordions.length > 0) {
            showExpandAllButton(accordionHeaderSelector);
        } else {
            showCollapseAllButton(accordionHeaderSelector);
        }

        // show [+] if collapsed accordions exist in immediate children
        var collapsedAccordions = $('.' + divId + ' > h3:not(.ui-accordion-header-active)');
        if (collapsedAccordions.length > 0) {
            showExpandButton(accordionHeaderSelector);
        } else {
            showCollapseButton(accordionHeaderSelector);
        }

        // if collapsing the header, always show [+] and [++]
        if (!$(accordionHeaderSelector).hasClass('ui-accordion-header-active')) {
            showExpandButton(accordionHeaderSelector);
            showExpandAllButton(accordionHeaderSelector);
        }
    });
}

function showExpandButton(accordionHeaderSelector) {
    $(accordionHeaderSelector + ' > .btn-collapse').hide();
    $(accordionHeaderSelector + ' > .btn-expand').show();
}
function showCollapseButton(accordionHeaderSelector) {
    $(accordionHeaderSelector + ' > .btn-collapse').show();
    $(accordionHeaderSelector + ' > .btn-expand').hide();
}

function showExpandAllButton(accordionHeaderSelector) {
    $(accordionHeaderSelector + ' > .btn-collapseall').hide();
    $(accordionHeaderSelector + ' > .btn-expandall').show();
}

function showCollapseAllButton(accordionHeaderSelector) {
    $(accordionHeaderSelector + ' > .btn-collapseall').show();
    $(accordionHeaderSelector + ' > .btn-expandall').hide();
}

function addCollapseAndExpandButtonsForWeek(accordionHeaderSelector, divId) {
    addCollapseAndExpandButtonsForComponents(accordionHeaderSelector, divId);
    $(accordionHeaderSelector + ' > .btn-expand').show();
    $(accordionHeaderSelector + ' > .btn-collapse').hide();
    $(accordionHeaderSelector).append('<button id="collapseall-' + divId + '" class="btn-collapseall">- - -</button>' +
                                      '<button id="expandall-' + divId + '" class="btn-expandall">+ + +</button>');
    $(accordionHeaderSelector + ' > .btn-collapseall').on('click', function(e) {
        e.stopPropagation();
        var divId = $(this).attr('id').substr(('collapseall-').length);
        var collapseAccordionButton = $(accordionHeaderSelector + ' > .btn-collapse');
        var collapseSubAccordionButtons = $('.' + divId + ' > .ui-accordion-header .btn-collapse');
        $(collapseAccordionButton).click();
        $(collapseSubAccordionButtons).click();
        $(this).hide();
        $(accordionHeaderSelector + ' > .btn-expandall').show();
    });
    $(accordionHeaderSelector + ' > .btn-collapseall').button();
    $(accordionHeaderSelector + ' > .btn-collapseall').hide();
    $(accordionHeaderSelector + ' > .btn-expandall').on('click', function(e) {
        e.stopPropagation();
        var divId = $(this).attr('id').substr(('expandall-').length);
        var collapsedAccordions = $(accordionHeaderSelector + ' > .btn-expand');
        var expandSubAccordionButtons = $('.' + divId + ' > .ui-accordion-header .btn-expand');
        $(collapsedAccordions).click();
        $(expandSubAccordionButtons).click();
        $(this).hide();
        $(accordionHeaderSelector + ' > .btn-collapseall').show();
    });
    $(accordionHeaderSelector + ' > .btn-expandall').button();
}

function addCollapseAndExpandButtonsForAllContents(preferenceSelector) {
    var tableDataElement = $("<td></td>");
    $(preferenceSelector + " > table > tbody > tr").append(tableDataElement);
    var expandAllButton = $('<button id="expandall-contents" ' +
                            'class="btn-expandall-contents ui-button ui-widget ' +
                            'ui-state-default ui-corner-all ui-button-text-only" ' +
                            'role="button" style="display: inline-block;"> ' +
                            '<span class="ui-button-text">+ + + +</span></button>');

    var collapseAllButton = $('<button id="collapseall-contents" ' +
                              'class="btn-collapseall-contents ui-button ui-widget ' +
                              'ui-state-default ui-corner-all ui-button-text-only" ' +
                              'role="button" style="display: inline-block;"> ' +
                              '<span class="ui-button-text">- - - -</span></button>');
    $(collapseAllButton).hide();
    $(tableDataElement).append(expandAllButton);
    $(tableDataElement).append(collapseAllButton);
    $(expandAllButton).click(function() {
        $(this).hide();
        $(collapseAllButton).show();  
        $(".btn-expandall").click();
    });
    $(collapseAllButton).click(function() {
        $(this).hide();
        $(expandAllButton).show();  
        $(".btn-collapseall").click();
    });
}

function checkIfAllComponentsChecked() {
    var isAllChecked = true;
    $('.preferences').each(function() {
        var type = $(this).prop('value');
        if (!$(this).prop('checked') && type != 'all') {
            isAllChecked = false;
        }
    });
    return isAllChecked;
}

function loadContent(week) {
    $.ajax({
        type: 'GET',
        url: 'week' + week + '.html',
        error: function() {

        },
        success: function(data) {
            var components = ['things-to-do', 'activity', 'tutorial', 'lecture', 'deadline1', 'deadline2', 'ilo'];
            $('#content-week' + week).html(data);
            generateDates();
            makeAccordion('.content-week' + week);
            for (var i in components) {
                var component = components[i];
                makeAccordion('.' + component + '-week' + week);
                addCollapseAndExpandButtonsForComponents('#' + component + '-content-week' + week, component + '-week' + week);
               
                var componentToBeOpened = '#' + component + '-content-week' + week;
                addAutoExpandSubheadingsBehaviour(componentToBeOpened);
            }

            $('.preferences').each(function() {
                var type = $(this).prop('value');
                if (!$(this).prop('checked')) {
                    $('.' + type + '.content-week' + week).hide();
                }
            });
        }
    });
}

function addAutoExpandSubheadingsBehaviour(component) {
    $(component).click(function(e) {
        var id = e.currentTarget.id;
        var componentNameAndWeek = id.split('-content-');
        var componentName = componentNameAndWeek[0];
        var week = componentNameAndWeek[1];
        var buttonId = '#expand-' + componentName +'-' + week;
        if ($('#' + id).hasClass('ui-accordion-header-active')) {
            $(buttonId).click();
        }
    });
}

/**
 * Adds the 'top' and 'bottom' functions to any jQuery object.
 * These return the offset positions relative to the document.
 */
function addTopAndBottomFunctions(object) {
    object.top = function() {
        return object.offset().top;
    }
    object.bottom = function() {
        return object.offset().top + object.outerHeight();
    }
}

/**
 * Adds the 'makePlaceholder' function to week headings (jQuery object).
 * The placeholder is a 'div' with the original id appended with '-placeholder'.
 * The placeholder is created, as the name implies, but not automatically added.
 * The reference to the placeholder is stored as attribute in the jQuery object.
 */
function addMakePlaceholderFunction(accordionHeader) {
    accordionHeader.makePlaceholder = function() {
        var placeholder = $('<div></div>');
        placeholder.attr('id', accordionHeader.attr('id') + '-placeholder');
        placeholder.css({ height: String(accordionHeader.height()) });
        placeholder.addClass('ui-accordion-header');
        accordionHeader.placeholder = placeholder;
    }
}

/**
 * Adds the 'freeze' and 'unfreeze' functions to week headings (jQuery object).
 * A week heading that is 'frozen' has its position fixed at the top of a page.
 * A placeholder is used to avoid jerky transition, since fixing a html element
 *  will cause 'position: relative' elements to shift up to fill vacated space.
 */
function addFreezeAndUnfreezeFunctions(accordionHeader) {
    addMakePlaceholderFunction(accordionHeader);

    accordionHeader.freeze = function() {
        accordionHeader.makePlaceholder();
        accordionHeader.parent().prepend(accordionHeader.placeholder);
        accordionHeader.css({ width: String(accordionHeader.width()) });
        accordionHeader.addClass('ui-accordion-header-sticky');
    }
    accordionHeader.unfreeze = function() {
        accordionHeader.placeholder.remove();
        accordionHeader.css({ width: '' });
        accordionHeader.removeClass('ui-accordion-header-sticky');
    }
}

/**
 * Adds the 'sticky' behaviour to week headings.
 * Freezes the *expanded* accordion header when:
 * - scrolled past the header.
 * Unfreezes the *frozen* accordion header when:
 * - scrolled above the week, or
 * - scrolled past the week.
 * Disambiguation of terms:
 * - 'sticky' describes the above dynamic behaviour.
 * - 'frozen' describes the current state, whether position is fixed at the top.
 */
function addStickyBehaviourToWeekHeadings(accordionHeaderSelector) {
    var header = $(accordionHeaderSelector);
    var accordion = header.parent();

    addTopAndBottomFunctions(accordion);
    addTopAndBottomFunctions(header);
    addFreezeAndUnfreezeFunctions(header);

    $(window).scroll(function(){
        var isFrozen = header.hasClass('ui-accordion-header-sticky');
        var isExpanded = header.hasClass('ui-accordion-header-active');
        if (isFrozen) {
            if (!isExpanded) { // Header collapsed
                header.unfreeze();
            } else if (header.top() < accordion.top()) { // Scrolled above week
                header.unfreeze();
            } else if (header.bottom() > accordion.bottom()) { // Scrolled past week
                header.unfreeze();
            }
        } else { // !isFrozen
            if (!isExpanded) {
                return;
            } else if (header.top() > $(this).scrollTop()) { // Not scrolled past header
                return;
            }
            var isFreezingExceedsWeek = $(this).scrollTop() + header.outerHeight() > accordion.bottom();
            if (!isFreezingExceedsWeek) {
                header.freeze();
            }
        }
    });
}

/**
 * Iterates through 'date-marker' span class and generates the corresponding dates based on the moduleStartDate.
 * Refer to the top of the file to set the start of the module date.
 * To specify a date, add '<span class="date-marker" week="1" day="1"></span>' in the html file.
 * The week attribute denotes the week number while the day attribute denotes the day of the intended week.
 * Both attributes must be a positive integer.
 * Format of the generated dates: 'Month Date'. E.g. Aug 10
 */
function generateDates() {
    $('.date-marker').each(function() {
        var week = parseInt($(this).attr('week'));
        var day = parseInt($(this).attr('day'));
        var date = getDate(week, day);
        $(this).html(MONTH_NAMES_SHORT_FORM[date.getMonth()] + ' ' + date.getDate());
    });
}

function getDate(week, day) {
    var date = new Date();
    var MILLI_SECS_PER_DAY = 24 * 60 * 60 * 1000;
    var isAfterRecessWeek = week > 6;
    var weeksPassed = week - 1 + isAfterRecessWeek;
    var daysPassed = weeksPassed * 7 + day - 1;
    date.setTime(MODULE_START_DATE.getTime() + daysPassed * MILLI_SECS_PER_DAY);
    return date;
}

function addAutoScrollToClickedWeekHeader() {
    var isAnimating = false;
    $('.buttoned').click(function(event) {
        // Don't scroll when an animation is in progress
        if (isAnimating) {
            return;
        }
        var scrollTarget = '#' + event.currentTarget.id;
        isAnimating = true;
        $('html, body').animate({
            scrollTop: $(scrollTarget).offset().top 
        }, 500, function() { // Complete callback function
            isAnimating = false;
        });
    });
}

$(document).ready(function() {

    makeAccordion('.weeklyschedule');
    $('.weeklyschedule > h3').each(function() {
        var id = $(this).attr('id');
        var week = id.substr(('header-content-week').length);
        addCollapseAndExpandButtonsForWeek('#' + id, 'content-week' + week);
        addStickyBehaviourToWeekHeadings('#' + id);
    });
    var headerHeight = 40;
    var topMargin = 5;
    var topPadding = 5;
    $('#form-preferences').css('height', headerHeight);
    $('#form-preferences').css('padding-top', topPadding);
    $('#content').css('margin-top', topMargin);
    $('#content').css('height', 'auto');

    for (var week = 0; week <= 14; week++) {
        $('#content-week' + week).html('<img height="40" width="40" class="margin-center-horizontal" src="../images/ajax-preload.gif"/>');
        loadContent(week);
    }

    addAutoScrollToClickedWeekHeader();
    addCollapseAndExpandButtonsForAllContents("#form-preferences");

    // toggles showing/hiding certain sections according to the preferences checkbox

    $(document).on('change', '.preferences', function() {
        var type = $(this).prop('value');
        if (type === 'all') {
            var components = ['things-to-do', 'activity', 'tutorial', 'lecture', 'deadline', 'ilo'];
            if ($(this).prop('checked')) {
                for (var i in components) {
                    var component = components[i];
                    var isChecked = $('.preferences[value="' + component + '"]').prop('checked');
                    if (!isChecked) {
                        $('.preferences[value="' + component + '"]').click();
                    }
                }
            } else {
                for (var i in components) {
                    var component = components[i];
                    var isChecked = $('.preferences[value="' + component + '"]').prop('checked');
                    if (isChecked) {
                        $('.preferences[value="' + component + '"]').click();
                    }
                }
            }
        } else {
            if ($(this).prop('checked')) {
                $('.' + type).show();
                if (checkIfAllComponentsChecked()) {
                    $('.preferences[value="all"]').prop('checked', true);
                }
            } else {
                $('.' + type).hide();
                if ($('.preferences[value="all"]').prop('checked')) {
                    $('.preferences[value="all"]').prop('checked', false);
                }
            }
        }
    });

});
