# Search Feature

Search feature helps you to search for keywords from the whole CS2103/T website.

## Design
Search page is designed to be analogous to the index section of a book. But this also means, keywords on the search page will have to be added manually. This makes it easy for you to look for specific keywords. 

### User Interface
Keywords on search page is organized in a tree-like structure. This helps you to know the parent category of a keyword and better understand connection between keywords.

While searching, you can also expand or collapse a category to have a better control of the number of keywords displayed on the page.

### Data Collection
Keywords data is collected from HTML file of the search page itself. It is designed to be easy and simple to contribute adding new keywords data by introducing three custom HTML elements (`main-category`, `category`, `keyword`).

[Why collect data from HTML file?](#why-collect-data-from-a-html-file)

### Search Function
Search function is designed to be flexible. For instance, searching for `activity` will also returns `Activities` as a result. 

It is also possible to search for multiple keywords (OR search), search function will returns and highlights all results that matches at least one of them.

To make the search results for relevant, keywords that don't match your query will be hidden.

[How search function works?](#how-search-function-works)

## Contribute

### Adding new keywords

To add new keywords, it is necessary for you to know three custom HTML elements introduced on the search page.

#### `<main-category>`
`main-category` element acts as a root category. Typically used on a category that doesn't have any parent category.


| Attribute            | Value                   | Description                                       |
|----------------------|-------------------------|---------------------------------------------------|
| text                 | *text*                  | Specifies text of the title                       |
| href                 | *url*                   | Specifies link to the relevant location           |
| label                | *value*                 | Specifies text of the label                       |
| type                 | [*bootstrap color class*](http://getbootstrap.com/components/#available-variations) | Specifies color of the label                      |
| related (optional)   | *text*                  | Specifies other keywords related to this category |

Children of this category can be added inside the `main-category` element.

#### `<category>`
`category` element acts as a non-root category that parents other categories and keywords. Collapsing and expanding children of this category is supported on this element.

| Attribute            | Value                   | Description                                       |
|----------------------|-------------------------|---------------------------------------------------|
| text                 | *text*                  | Specifies text of the title                       |
| related (optional)   | *text*                  | Specifies other keywords related to this category |

Children of this category can be added inside the `category` element.

#### `<keyword>`
`keyword` element acts as leaf of the tree structure. It should link to a specific part that contains this keyword.

| Attribute            | Value                   | Description                                       |
|----------------------|-------------------------|---------------------------------------------------|
| text                 | *text*                  | Specifies text of the title                       |
| href                 | *url*                   | Specifies link to the relevant location           |
| related (optional)   | *text*                  | Specifies other keywords related to this keyword  |

You can take a look at [search.html](#) to have more understanding.

### Improving user interface

You might wonder how `main-category`, `category`, and `keyword` elements can be displayed on your browser.

When the search page is loaded, those elements will actually be compiled and replaced by template HTML fragments.

Those fragments can be accessed at the following files:

| Element       | File Location                                |
|---------------|----------------------------------------------|
| main-category | *contents/search-main-category-partial.html* |
| category      | *contents/search-category-partial.html*      |
| keyword       | *contents/search-keyword-partial.html*       |

You can modify those fragments to change how the user interface looks.

**Note:** Text in curly bracket will be injected with suitable information on the javascript.

## Implementation

### User Interface
User interface of the search page take advantage of powerful templating engine of [AngularJS](https://angularjs.org/) to compile custom elements (Angular directives). [Bootstrap](http://getbootstrap.com/) also used to do quick CSS styling.

### Data Collection
Data collection is done when [AngularJS](https://angularjs.org/) is compiling `main-category`, `category`, and `keyword` elements from the HTML file. After that, javascript will construct a tree data structure from the collected data to make it easier to analyze. 

### Searching
Searching is implemented with help of text search library [lunr.js](http://lunrjs.com/). From the collected data, a search index will be created to handle faster keywords searching.

## Appendix

### Why collect data from a HTML file?
Several different methods to store data has been implemented before I decided to use the current method.

#### Using plain HTML file
* Pros
 * Freedom in modifying the contents

* Cons
 * Since a keyword can have a complicated HTML code, large number of them can produce a messy and hard to read HTML code.
 * A lot of copy paste involved when adding new keywords (violate DRY principle).

#### Using JSON file
* Pros
 * Can be reuse for other applications.
 * Maintainable.
 * Readable.

* Cons
 * Require an additional file.
 * Adding large number of new keywords are more tedious than expected since it is necessary to have a `parent` attribute on each keyword entry.

#### Using HTML file and AngularJS with directives and its templating engine
* Pros
 * Maintainable.
 * Readable.
 * Easy to add new keywords.

* Cons
 * Require additional library (AngularJS).
 * Cannot be reused for other applications, but a script can written to convert this into a JSON file.

After considering both pros and cons of these methods, I think using AngularJS is the best method as easiness of adding new keywords is important in an open project.

### How search function works?

Search function begins right after data collection is completed.

It involves the following processes:

#### Enhancing search data
A new attribute `keywords` will be added to each data entry which is the concatenation of text inside `text` attribute and `related` attribute.

#### Creating search index
Text search library is used to construct a search index, enhanced data will be passed to lunr.js.
The library will process a `keywords` attribute of an data entry in the following steps:
 
* Split text inside `keywords` attribute into tokens (Lowercased string with no white-spaces).
* Remove [stop words](https://en.wikipedia.org/wiki/Stop_words) from those tokens.
* Reduce each token into its base word using lunr.js's stemming algorithm. For instance `activities` reduced into `active`.
* Those tokens are now the representative of the data entry.

#### Searching
By default, lunr.js implements AND search to match query and keyword. So to do an OR search, it is necessary to split user query into tokens first, then do the search independently. For each query tokens, the following steps will be applied:

* Reduce the query token into its base word.
* Search for data entries that contain reduced query token.
* Reference to matching data entries will be returned.

Search results from each query tokens will be combined. Javascript will them display and highlight the results.


