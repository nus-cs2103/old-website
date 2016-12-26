# Content Author Guide
* [Syntax](#syntax)
    * [Embedded Links](#embedded-links)
    * [Tooltips](#tooltips)

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

### Tooltips
Tooltips are used for short supplementary information, triggered by a hover.  
Tooltips are enabled for content in **schedule.html** through **common.js**.

Adding a tooltip:

1. Wrap the keyword in the `<tooltip>` tag,  
e.g. `<tooltip>IDE</tooltip>`

2. Register `tooltips` in [tooltip.js](../scripts/tooltip.js) with the form: `'keyword' : 'tooltip'`,  
e.g. `'IDE' : 'Integrated Development Environment'`

3. Register `aliases` in [tooltip.js](../scripts/tooltip.js) with the form: `'keyword' : ['alias1', 'alias2']`,  
e.g. `'IDE' : ['IDEs']`

> **Limitation**  
\- Multiple definitions are not yet supported (Issue #235).
