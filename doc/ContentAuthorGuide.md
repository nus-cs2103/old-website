# Content Author Guide
* [Syntax](#syntax)
    * [Embedded Links](#embedded-links)
    * [Tooltips](#tooltips)
    * [Useful Style Classes](#useful-style-classes)
    * [Code Tags](#code-tags)
    * [Syntax Highlighting](#syntax-highlighting)
    * [Difficulty Stars](#difficulty-stars)
* [Best Practices](#best-practices)
    * [Coding Standards](#coding-standards)
    * [Committing Changes](#committing-changes)
* [How to Preview Changes](#how-to-preview-changes)
* [Tool Stack](#tool-stack)

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

### Useful Style Classes
These style classes are used frequently (sorted here in alphabetical order):

* `additional-info` for information that is in a separate `<div>`
> padding: 10px 10px  
> background-color: gray

* `dim` for less important additional information that is inline
> color: gray

* `highlighted` for important bits of information
> background-color: yellow

* `important` for extra-important bits of information (used sparingly)
> color: maroon

### Code Tags
Use `<code>` tags to represent fragments of computer code in monospace font.
> font-family: courier  
> font-size: small  
> background-color: gray

### Syntax Highlighting
Language-specific syntax highlighting is achieved by enclosing code samples in:  
`<pre class="prettyprint"><code class="language-java>` `</code></pre>`  
> Other valid code classes: `lang-html`, `shell`

### Difficulty Stars
Each tutorial has a list of learning activities. Stars are used for categories.

* Single star: Basic / Skills to pass the module  
`<img src="../images/star.png">`

* 2 stars: Intermediate / Skills for a good grade  
`<img src="../images/2stars.png">`

* 3 stars: Advanced / Beyond the module syllabus  
`<img src="../images/3stars.png">`

## Best Practices

### Coding Standards
* [JavaScript](https://docs.google.com/document/d/1gZ6WG6HBTJYHAtVkz9kzi_SUuzfXqzO-SvFnLuag2xM/pub?embedded=true)
* [CSS](https://docs.google.com/document/d/1wA9paRA9cS7ByStGbhRRUZLEzEzimrNQjIDPVqy1ScI/pub)
* [HTML](https://oss-generic.github.io/process/codingstandards/coding-standards-html.html)

### Committing Changes
* Commit each distinct change as a separate commit.
* Write short, descriptive commit messages.
* Use the imperative mood when writing commit messages.  
  e.g. `Add README.md` rather than `Added README.md` or `Adding README.md`

## How to Preview Changes
Refer to: [DeveloperGuide.md#how-to-preview-changes](DeveloperGuide.md#how-to-preview-changes)

## Tool Stack
Refer to: [DeveloperGuide.md#tool-stack](DeveloperGuide.md#tool-stack)
