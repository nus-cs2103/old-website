# Content Author Guide
* [Syntax](#syntax)
    * [Embedded Links](#embedded-links)
    * [Component Panels](#component-panels)
    * [Tooltips](#tooltips)
    * [Useful Style Classes](#useful-style-classes)
    * [Contextual Backgrounds](#contextual-backgrounds)
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

1. Enclose link text in `<span onclick="getContentUsingAjax('param-name', 'param-selector', 'param-id');" class="embedded-link">` `</span>`,  
   e.g. `<span onclick="getContentUsingAjax('handbook/teams', '#embedded-week1-teams');" class="embedded-link">`**Teams**`</span>`
    * param-name: name of the file to load from (without .html)
    * param-selector: `#selector` for element in this page to load into
    * param-id: section id for element in file to load from (optional)
    <br><br>

    > To use a custom title (not **Extract from handbook**) for the embedded content, use `pullContent`  
      (instead of `getContentUsingAjax`) that takes an additional `'param-title'` as its 2nd argument.

2. Mark a `div` element with the id for `param-2` where content is loaded into.  
   In most cases, this can be right after the paragraph with the embedded link.  
   e.g. `<div id="embedded-week1-teams"></div>`

> Embedded links are enabled by including this script tag in a HTML file:
```html
<script type="text/javascript" src="../scripts/embedded.js"></script>
```

> **Limitation**  
\- HTML syntax for embedded links are overly verbose (PR #174).

### Component Panels
Component panels are the lowest-level panels in the Schedule page.  
One way to populate panels, other than including content directly,  
is by specifying a file to load from when the panel first expands.  
The file can be reused with different titles to match the context.

Inner panels should be `h3` elements nested in the `div`:
```html
<div class="divId">
  <h3 class="load-during-expansion" data-url="url">Title</h3>
</div>
```
where `divId` has a form `component-week#` e.g. `activity-week2`,  
      `url` links to a file with HTML meant to be inside a `div`.

> Component panels are enabled in **schedule.html** and **week.html**  
> through the `loadInnerPanels(divId)` function in **common.js**.

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
These classes are used frequently to style inline content.

* `dim` for less important additional information
> color: gray

* `highlighted` for important bits of information
> background-color: yellow

* `important` for extra-important bits of information (used sparingly)
> color: maroon

### Contextual Backgrounds
Contextual backgrounds are used for admonition blocks to convey meaning through color.

Adding contextual backgrounds:
```html
<p class="bg-additional">bg-additional</p>
<p class="bg-important">bg-important</p>
<p class="bg-quote">bg-quote</p>
<p class="bg-sidebar-info">bg-sidebar-info</p>
<p class="bg-sidebar-main">bg-sidebar-main</p>
<p class="bg-warning">bg-warning</p>
```
![](contextual-backgrounds.png)
> Classes may be used with `span`, but preferably blocks (e.g. `p` or `div`).  
> However, sidebar elements must be used with blocks and preceded by a block.

### Code Tags
Use `<code>` tags to represent fragments of computer code in monospace font.
> font-family: courier  
> font-size: small  
> background-color: gray

### Syntax Highlighting
Language-specific syntax highlighting is achieved by enclosing code samples in:  
```html
<pre class="prettyprint"><code class="language-java"> </code></pre>
```
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
* [CSS](../codingStandards/coding-standards-css.md)
* [HTML](https://oss-generic.github.io/process/codingStandards/CodingStandard-Html.html)

### Committing Changes
* Commit each distinct change as a separate commit.
* Write short, descriptive commit messages.
* Use the imperative mood when writing commit messages.  
  e.g. `Add README.md` rather than `Added README.md` or `Adding README.md`

## How to Preview Changes
Refer to: [DeveloperGuide.md#how-to-preview-changes](DeveloperGuide.md#how-to-preview-changes)

## Tool Stack
Refer to: [DeveloperGuide.md#tool-stack](DeveloperGuide.md#tool-stack)
