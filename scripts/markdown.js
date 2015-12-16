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
                "mode": "gfm"
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
