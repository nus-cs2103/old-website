# Search Feature

Search feature aims to help users searching for specific keywords from the whole CS2103/T website.

## Design
Search page is analogous to the index section of a book in terms of how keywords are linked to revelant page and the table of contents section in terms on how keywords are organized. Search page can also be viewed as a sitemap of CS2103/T website, in such way that relevant keywords from the whole CS2103/T website are listed on this page.

[What are the alternative approaches to implement search feature?](#what-are-the-alternative-approaches-to-implement-search-feature)

### User Interface
Although search page is analogous to the index section of a book, keywords are not listed in alphabetical order. Instead, keywords are organized in a tree-like structure like the table of contents section of a book. This way, context of a keyword are clearly displayed and linked with a page or section related to this keyword.

As the number of keywords on the page might go up to hundreds, it becomes necessary to let users have a better control of number of keywords displayed. Therefore, expanding and collapsing is implemented to show/hide children keywords of a keyword.

### Data Storage
Just like the index section of a book, keywords are selected manually not automatically. Information and structure of these keywords are added manually and stored inside HTML file of the page itself.

The main purpose of storing these keywords inside a HTML file is to make it easy and simple to add new keywords to search page. Three custom HTML elements (`main-category`, `category`, `keyword`) are introduced to make the keywords page easier to understand and modify.

[Why is data stored inside a HTML file?](#why-is-data-stored-inside-a-html-file)

### Search Function
Search function is implemented on the page and it is designed to be flexible. For instance, searching for `activity` will also returns `Activities` as a result.

The implemented nature of searching done by the search function is an OR search, that is results that are displayed must contain only at least of a word from users' query. This implemented nature is considered more flexible than an AND search nature that is more strict such that a result must contains all words from users' query.

[How search function works?](#how-search-function-works)

## Contribute

### Adding new keywords

**Note:** In this section, we will refer keywords that group other keywords as `category` and keywords that don't group other keywords as `keyword`.

To add new keywords, it is necessary for contributors to understand three custom HTML elements and its attributes introduced on the search page.


#### `<main-category>`
`main-category` element acts as a root category. Typically used on a category that doesn't have any parent category. User can click on this element to be linked to a page that contains this keyword.


| Attribute            | Value                   | Description                                       |
|----------------------|-------------------------|---------------------------------------------------|
| text                 | *text*                  | Specifies text of the title                       |
| href                 | *url*                   | Specifies link to the relevant location           |
| label                | *value*                 | Specifies text of the label                       |
| type                 | [*bootstrap color class*](http://getbootstrap.com/components/#available-variations) | Specifies color of the label                      |
| related (optional)   | *text*                  | Specifies other keywords related to this category |

Keywords or subcategories that are part of main category can be added inside the `main-category` element.

#### `<category>`
`category` element acts as a non-root category that parents other categories and keywords. This element can be collapsed and expanding by users.

| Attribute            | Value                   | Description                                       |
|----------------------|-------------------------|---------------------------------------------------|
| text                 | *text*                  | Specifies text of the title                       |
| related (optional)   | *text*                  | Specifies other keywords related to this category |

Keywords or subcategories that are part of category can be added inside the `main-category` element.

#### `<keyword>`
`keyword` element acts as leaf of the tree structure and doesn't group other keywords. User can click on this element to be linked to a page that contains this keyword.


| Attribute            | Value                   | Description                                       |
|----------------------|-------------------------|---------------------------------------------------|
| text                 | *text*                  | Specifies text of the title                       |
| href                 | *url*                   | Specifies link to the relevant location           |
| related (optional)   | *text*                  | Specifies other keywords related to this keyword  |

To understand more, you can take a look at source file of [search.html](#).

### Improving user interface

You might wonder how `main-category`, `category`, and `keyword` elements can be displayed on your browser.

When the search page is loaded, those elements will actually be compiled and replaced by template HTML fragments.

Those fragments can be accessed at the following files:

| Element       | File Location                                |
|---------------|----------------------------------------------|
| main-category | *contents/search-main-category-partial.html* |
| category      | *contents/search-category-partial.html*      |
| keyword       | *contents/search-keyword-partial.html*       |

Those fragments can be modified to change how the user interface looks.

**Note:** The double curly brace notation {{ }} will be injected by the logic part inside javascript file.


## Appendix

### What are the alternative approaches to implement search feature?
There are indeed many approaches to implement a search feature. Search feature need to be able to search from the whole CS2103/T website. Below are some approaches that are considered:

#### Use Google Custom Search Engine
##### Pros
* Powerful search algorithm, more relevant result

##### Cons
* More suitable on website with many pages
* Less control over search page (Advertising, Uncustomizable search page, etc..)

#### Crawl website to build index automatically

##### Pros
* Everything can be done programmatically

##### Cons
* Less relevant results
* Cannot be organized accurately

#### Manually add relevant keywords

##### Pros
* More relevant results
* Full control over search page, keywords displayed, and keywords organization

##### Cons
* Requires a lot of manual works

Although a lot of works have to be done manually, adding keywords manually seems to be the best approach. Relevance of the search results and full control over the search page is a really important point. And considering the website being an open source project, adding keywords can be done using crowdsourcing. 

### Why is data stored inside a HTML file?
Several methods to store keywords data has been implemented and analyzed before we decided to use the current method.

#### Store data inside plain HTML file
This is indeed the simplest method to store keywords data.

##### Pros
 * Centralized
  * Keywords data are stored in a single file. 
  * Freedom to modify an element inside the HTML file.

##### Cons
 * Complexity and Readability
  * HTML fragment for a single keyword can consists of several lines of code. Having hundreds of keywords increase complexity of the HTML file.
  * As keywords are organized in a tree-like structure, many elements inside the HTML file will have to be nested. As complexity of the tree structure increases, complexity of the HTML file also increases.
 * Maintainability
  * Modifying HTML fragment of a keyword means HTML fragment of all keywords must also be modified.
 * DRY
  * HTML fragment of two distinct keywords actually contains many common elements. But when using plain HTML file, these elements must be duplicated many times.

#### Store data inside JSON file
Keywords are represented as an array inside JSON file. Each entry inside the array represent a keyword object having `title`, `alias`, `parent`, and `href` attributes.

##### Pros
 * Readability
  * Each entry inside the array represents a keyword, there are no redundant information. This method is more readable than using plain HTML file.  
 * Reusability
  * JSON being a data interchange format. This file can be used for other purposes.
 * Maintainability
  * Each entry inside the array is independent from another. Modifying an entry doesn't affect other entries. 

##### Cons
 * Construction
  *  Adding large number of new keywords are more tedious than expected. Keywords are not represented in a tree-like structure inside JSON file, so additional works are needed to determine `parent` attribute of each entry.
 * Decentralized
  * Keywords data are stored in a separate file. Less freedom in modifying HTML file.

#### Store data inside HTML file with AngularJS with directives and its templating engine
Each keyword are represented as a single HTML element using [AngularJS](https://angularjs.org/) directives.

##### Pros
 * Maintainability
  * Each element independent from another element. Modifying an element can be done inside HTML fragment file. 
 * Readability
  * Each element represents a keyword, there are no redundant information. This method is more readable than using plain HTML file. 
 * Construction
  * Each element represents a keyword, this makes it easy to add new keyword. But unlike JSON file, HTML being a tree-based file format, elements inside HTML file can be organized in a tree structure. This makes it easy to construct the tree structure.

##### Cons
 * Dependency
  * Require an external library, AngularJS.
 * Reusability
  * HTML is not a data-interchange format. This file need to be converted to a data-interchange format like XML or JSON format.
 * Decentralized
  * Many separate files. Less freedom in modifying HTML file.

After considering both pros and cons of these methods, storing data inside HTML file with AngularJS directives seems to be the best method. While it requires additional dependency, it makes adding new keywords a lot easier which is important for an open source project.

### How search function works?

Search function is implemented with help of full-text search library [lunr.js](http://lunrjs.com/).

[Why is search function implemented using lunr.js?](#why-is-search-function-implemented-using-lunrjs)

Searching involves the following processes:

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

### Why is search function implemented using lunr.js?

Search algorithm in general can be categorized into two types, search using stemming algorithm and fuzzy search.

#### Search using stemming algorithm
[lunr.js](http://lunrjs.com/) uses this approach. Stemming is a process of reducing a word into its [base word](https://en.wikipedia.org/wiki/Word_stem). This process allows `activity` and `activities` to be considered as the same word.

#### Fuzzy search
[fuse.js](http://kiro.me/projects/fuse.html) uses this approach. It allows misspellings in users' query by using edit distance algorithm.

At first glance, allowing misspellings might be the better approach. But in practice, it produces more irrelevant results due to its tolerance and might not be suitable for CS2103/T search function. Search using stemming algorithm on the other hand produces more relevant and flexible search results.  




