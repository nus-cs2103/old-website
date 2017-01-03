$.ajax({
    type: 'GET',
    url: markdownUrl,
    error: function(jqXHR, textStatus, error) {
        redirectToGithub();
    },
    success: function(data) {
        $.ajax({
            type: "POST",
            url: "https://api.github.com/markdown",
            data: JSON.stringify({
                "text": data,
                "mode": "markdown"
            }),
            error: function(jqXHR, textStatus, error) {
                redirectToGithub();
            },
            success: function(data) {
                processAndDisplayResult(data);
            }
        });
    }
});

function redirectToGithub() {
    window.location.href = 'https://github.com/nus-cs2103/website/blob/master/contents/' + markdownUrl;
}

function displayResult(html) {
    $(document.body).html($('<div class="markdown-body">' + html + '</div>'));
}

function processAndDisplayResult(html) {
    // Pre-process the result as necessary
    html = html.replace(/user-content-/g, '');
    html = html.replace(/<th align="center">Good<\/th>/g, '<th align="center" class="example-good">Good</th>');
    html = html.replace(/<th align="center">Bad<\/th>/g, '<th align="center" class="example-bad">Bad</th>');
    html = html.replace('id="borderless"', 'class="borderless"');

    // Display the result in the page; this is the minimum requirement of the function
    displayResult(html);

    // Post-process the result as necessary
}
