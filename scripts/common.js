function makeAccordion(elementSelector) {
    $(elementSelector).accordion({
        active: false,
        collapsible: true,
        heightStyle: 'content'
    });
}

function getContentUsingAjax(section, elementSelector) {
    pullContent(section, elementSelector, 'Exract from handbook');
}

function pullContent(section, elementSelector, title) {
    $.ajax({
        type: 'GET',
        url: section + '.html',
        error: function() {

        },
        success: function(data) {
            $(elementSelector).addClass('embedded');
            $(elementSelector).html('<div><span class="embeddedHeading">' + title + '</span><button onclick="$(\'' + elementSelector + '\').html(\'\');' +
                                                         ' $(\'' + elementSelector + '\').removeClass(\'embedded\');" ' +
                                                 'class="btn-dismiss">X</button><br><br></div>' + data);
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

function autoExpandCurrentSchedule(week) {
	var dateNotFound = 0;
	var bracketOffset = 1;
	var delimeter = " ";
	var pattern = /\[(.*?)\]/g;
	
	//retrieve current date indicated on the week
	var title = $("#header-content-week" + week + " .schedule-title").html();
	var startIndex = title.search(pattern) + bracketOffset;
	var endIndex = title.length - bracketOffset;
	if(startIndex != dateNotFound) { 
		title = title.substring(startIndex, endIndex);
		title = title.split(delimeter);
		
		var isSameWeek = compareWeek(title);
		triggerScheduleExpand(isSameWeek, week);
	}
}

function triggerScheduleExpand(isSameWeek, week) {
	var scrollOffset = 70;
	if(isSameWeek) { 
		var selectedWeek = $("#expand-content-week" + week);
		$("#content").animate({
       		scrollTop: selectedWeek.offset().top - scrollOffset
		}, 1500);
		selectedWeek.trigger('click');
	}
}

function compareWeek(title) {
	var isSameWeek = false;
	var startDate = retrieveStartDateOfWeek();
	var startDay = startDate.getDate();
	var startMonth = startDate.getMonth();
	var month = convertMonthNametoNumeric(title[0]);
	var day = title[1];
	if(startDay == day && startMonth == month) {
		isSameWeek = true;
	}
	return isSameWeek;
}

function retrieveStartDateOfWeek() {
	var dayOffset = 1;
	var today = new Date();
	var day = today.getDay(); 
	var startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + dayOffset);
	return startDate;
}

function convertMonthNametoNumeric(monthName) {
	var characterOffset = 3;
	var months = "JanFebMarAprMayJunJulAugSepOctNovDec";
	return months.indexOf(monthName)  / characterOffset;
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
            makeAccordion('.content-week' + week);
            for (var i in components) {
                var component = components[i];
                makeAccordion('.' + component + '-week' + week);
                addCollapseAndExpandButtonsForComponents('#' + component + '-content-week' + week, component + '-week' + week);
            }
            $('.preferences').each(function() {
                var type = $(this).prop('value');
                if (!$(this).prop('checked')) {
                    $('.' + type + '.content-week' + week).hide();
                }
            });
			autoExpandCurrentSchedule(week);
        }
    });
}

$(document).ready(function() {

    makeAccordion('.weeklyschedule');
    $('.weeklyschedule > h3').each(function() {
        var id = $(this).attr('id');
        var week = id.substr(('header-content-week').length);
        addCollapseAndExpandButtonsForWeek('#' + id, 'content-week' + week);
    });
    var bannerHeight = 25;
    var headerHeight = 40;
    var topMargin = 5;
    var topPadding = 5;
    $('#form-preferences').css('height', headerHeight);
    $('#form-preferences').css('padding-top', topPadding);
    $('#content').css('margin-top', topMargin);

    function calculateContainerSize() {
        return $(window).height() - headerHeight - bannerHeight - topMargin - topPadding;
    }

    $('#content').css('height', calculateContainerSize());

    $(window).resize(function() {
        $('#content').css('height', calculateContainerSize());
    });

    for (var week = 0; week <= 14; week++) {
        $('#content-week' + week).html('<img height="40" width="40" class="margin-center-horizontal" src="/images/ajax-preload.gif"/>');
        loadContent(week);
    }

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
