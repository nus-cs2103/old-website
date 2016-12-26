# Content Author Guide
* [Syntax](#syntax)
    * [Embedded Links](#embedded-links)

## Syntax

### Embedded Links
Embedded links are used to load supplementary sections, triggered by a click.

Adding an embedded link:

1. Surround with `<span onclick="getContentUsingAjax('param-1', 'param-2', 'param-3');" class="embedded-link">`**Link Text**`</span>`
where:
    * param-1: filename (without .html)
    * param-2: #selector-for-element-in-current-page-to-load-into (with #)
    * param-3: section id for element in param-1 to load-into param-2 (optional)

e.g. `<span onclick="getContentUsingAjax('handbook-teams', '#embedded-week1-teams');" class="embedded-link">`**Teams**`</span>`

> **Limitations**  
\- Embedded links are limited to **schedule.html** referencing local files (Issues #230, #232).  
\- HTML syntax for embedded links are overly verbose (PR #174).
