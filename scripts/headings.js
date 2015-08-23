$(document).on('click', '.href', function() {
    $('#schedule-navigators').hide();
    $('#handbook-navigators').hide();
    if ($(this).hasClass('schedule')) {
        $('#schedule-navigators').show();
    }
    if ($(this).hasClass('handbook')) {
        $('#handbook-navigators').show();
    }                
});