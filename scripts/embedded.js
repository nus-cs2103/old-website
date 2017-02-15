function getContentUsingAjax(fileName, elementSelector, sectionName) {
    pullContent(fileName, elementSelector, 'Extract from handbook', sectionName);
}

function pullContent(fileName, elementSelector, title, sectionName) {
    var toBeLoaded = fileName + '.html' + (sectionName == undefined ? '' : ' #' + sectionName);
    var section = fileName.substring(fileName.lastIndexOf('/') + 1);
    var directLink = 'handbook.html#' + section;
    var linkNotice = '<span class="important">{Some links in this embedded content box might not work. ' +
        'If you need to follow the links, please go to the <a href="' + directLink + '" target="_blank">relevant section</a> ' +
        'of the handbook instead}</span>';
    $(elementSelector).html('<img class="embedded-link-loading-img" src="../images/ajax-preload.gif" alt="Loading...">');
    $(elementSelector).load(toBeLoaded, function(response, status, xhr) {
        if (status == 'success') {
            $(elementSelector).addClass('embedded');
            $(elementSelector).prepend('<div><div id="embedded-heading-container"><span class="embedded-heading">' + title + '</span><button onclick="$(\'' + elementSelector + '\').html(\'\');' +
               ' $(\'' + elementSelector + '\').removeClass(\'embedded\');" ' +
               'class="btn-dismiss-embedded">X</button></div><br> '+linkNotice+' </div>');
            $(elementSelector + ' > div > .btn-dismiss').button();

            if ($('.prettyprint:not(.prettyprinted)').length > 0) {
                prettyPrintCodeSamples();
            }
        }
    });
}
