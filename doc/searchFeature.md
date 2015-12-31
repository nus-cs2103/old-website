# Site-Wide Search Feature
### Author: Stefano Chiesa

## Overview
Without a dedicated search feature, users tend to have problem searching for specific keywords — i.e., users might not know the page which the specific keywords resides, browser built-in search function is not flexible enough for keyword searching. To solve these problems, a dedicated search feature is needed. This dedicated search feature aims to help users searching for specific keywords from the whole CS2103/T website with ease.

## Design

### Introduction
Search page is analogous to the index section of a book in terms of how keywords are linked to relevant page and the table of contents section in terms on how keywords are organized. Search page can also be viewed as a sitemap of CS2103/T website, in such way that relevant keywords from the whole CS2103/T website are listed on this page.

There are other approaches to implement a search feature. Below are some approaches that are considered:

<table>
    <tr>
        <th>Approach</th>
        <th>Pros</th>
        <th>Cons</th>
    </tr>
    <tr>
        <td>
            Use Google Custom Search Engine
        </td>
        <td>
            <ul>
            <li>Powerful search algorithm, more relevant result</li>
            </ul>
        </td>
        <td>
            <ul>
            <li>More suitable on website with many pages</li>
            <li>Less control over search page (Advertising, Uncustomizable search page, etc..)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            Crawl website to build index automatically
        </td>
        <td>
            <ul>
            <li>Everything can be done programmatically</li>
            </ul>
        </td>
        <td>
            <ul>
            <li>Less relevant results</li>
            <li>Difficult to be organized accurately</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            Add relevant keywords to build index manually
        </td>
        <td>
            <ul>
            <li>More relevant results</li>
            <li>Full control over search page, keywords displayed, and keywords organization</li>
            </ul>
        </td>
        <td>
            <ul>
            <li>Requires a lot of manual works</li>
            </ul>
        </td>
    </tr>
</table>

Although a lot of works have to be done manually, adding keywords manually seems to be the best approach. Relevance of the search results and full control over the search page is a really important point to have. Also, considering the website being an open source project, adding keywords can be done by crowdsourcing. 

### User Interface
Although search page is analogous to the index section of a book, keywords are not listed in alphabetical order. Instead, keywords are organized in a tree-like structure like the table of contents section of a book. This way, context of a keyword are clearly displayed and linked with a page or section related to this keyword.

As the number of keywords on the page might go up to hundreds, it becomes necessary to let users have a better control of number of keywords displayed. Therefore, expanding and collapsing is implemented to show/hide children keywords of a keyword.

### Data Storage
Just like the index section of a book, keywords are selected manually not automatically. Information and structure of these keywords are added manually and stored inside HTML file of the page itself.

The main purpose of storing these keywords inside a HTML file is to make it easy and simple to add new keywords to search page. Three custom HTML elements (`main-category`, `category`, `keyword`) are introduced to make the keywords page easier to understand and modify.

### Search Function
Search function is implemented on the page and it is designed to be flexible. For instance, searching for `activity` will also returns `Activities` as a result.

The implemented nature of searching done by the search function is an OR search, that is results that are displayed must contain only at least of a word from users' query. This implemented nature is considered more flexible than an AND search nature that is more strict such that a result must contains all words from users' query.

## Implementation

### User Interface

Although user interface is mainly implemented in HTML, Javascript is used many times to modify Document Object Model(DOM) of the search page. The three custom elements are compiled into template HTML fragments by [AngularJS templating engine](https://docs.angularjs.org/guide/templates), this prevents many repetition of code fragments inside the HTML file since the HTML file also used as data storage. 

To have a better user experience, Javascript with help of jQuery also is used to listen for events such as expanding and collapsing subcategory.

### Data Storage
Keywords data are stored inside HTML file of the search page. But we decided not to use plain HTML to store the keywords. Three custom HTML elements are introduced using [AngularJS directives](https://docs.angularjs.org/guide/directive) to have more human readable data. When search page is loaded, [AngularJS](https://angularjs.org/) will try to collect the keywords from custom HTML elements and convert it into a Javascript array to be processed further by the search function.

Before we decided to use the current approach, several approaches to store keywords data has been implemented and analyzed for its pros and cons:

#### Store data inside plain HTML file
This is indeed the simplest method to store keywords data.

<table>
    <tr>
        <th>Pros</th>
        <th>Cons</th>
    </tr>
    <tr>
        <td>
            <b>Centralized</b>
            <ul>
                <li>Keywords data are stored in a single file.</li>
                <li>Freedom to modify an element inside the HTML file.</li>
            </ul>
        </td>
        <td>
            <b>Complexity and Readability</b>
            <ul>
                <li>HTML fragment for a single keyword can consists of several lines of code. Having hundreds of keywords increase complexity of the HTML file.</li>
                <li>As keywords are organized in a tree-like structure, many elements inside the HTML file will have to be nested. As complexity of the tree structure increases, complexity of the HTML file also increases.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
        </td>
        <td>
            <b>Maintainability</b>
            <ul>
                <li>Modifying HTML fragment of a keyword means HTML fragment of all keywords must also be modified.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
        </td>
        <td>
            <b>Don't Repeat Yourself (DRY)</b>
            <ul>
            <li>HTML fragment of two distinct keywords actually contains many common elements. But when using plain HTML file, these elements must be duplicated many times.</li>
            </ul>
        </td>
    </tr>
</table>

#### Store data inside JSON file
Keywords are represented as an array inside JSON file. Each entry inside the array represent a keyword object having `title`, `alias`, `parent`, and `href` attributes.

<table>
    <tr>
        <th>Pros</th>
        <th>Cons</th>
    </tr>
    <tr>
        <td>
            <b>Readability</b>
            <ul>
                <li>Each entry inside the array represents a keyword, there are no redundant information. This method is more readable than using plain HTML file.</li>
            </ul>
        </td>
        <td>
            <b>Construction</b>
            <ul>
                <li>Adding large number of new keywords are more tedious than expected. Keywords are not represented in a tree-like structure inside JSON file, so additional works are needed to determine `parent` attribute of each entry.</li>
            </ul>
        </td>
        
    </tr>
    <tr>
        <td>
            <b>Reusability</b>
            <ul>
                <li>JSON being a data interchange format. This file can be used for other purposes.</li>
            </ul>
        </td>
        <td>
            <b>Decentralized</b>
            <ul>
                <li>Keywords data are stored in a separate file. Less freedom in modifying HTML file.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            <b>Maintainability</b>
            <ul>
                <li>Each entry inside the array is independent from another. Modifying an entry doesn't affect other entries. </li>            </ul>
        </td>
        <td>
        </td>
    </tr>
</table>

#### Store data inside HTML file with AngularJS with directives and its templating engine
Each keyword are represented as a single HTML element using [AngularJS](https://angularjs.org/) directives.

<table>
    <tr>
        <th>Pros</th>
        <th>Cons</th>
    </tr>
    <tr>
        <td>
            <b>Maintainability</b>
            <ul>
                <li>Each element independent from another element. Modifying an element can be done inside HTML fragment file. </li>
            </ul>
        </td>
        <td>
            <b>Dependency</b>
            <ul>
                <li>Require an external library, AngularJS.</li>
            </ul>
        </td>
        
    </tr>
    <tr>
        <td>
            <b>Readability</b>
            <ul>
                <li>Each element represents a keyword, there are no redundant information. This method is more readable than using plain HTML file. </li>
            </ul>
        </td>
        <td>
            <b>Reusability</b>
            <ul>
                <li>HTML is not a data-interchange format. This file need to be converted to a data-interchange format like XML or JSON format.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            <b>Construction</b>
            <ul>
                <li>Each element represents a keyword, this makes it easy to add new keyword. But unlike JSON file, HTML being a tree-based file format, elements inside HTML file can be organized in a tree structure. This makes it easy to construct the tree structure. </li>            </ul>
        </td>
        <td>
            <b>Decentralized</b>
            <ul>
                <li>Many separate files. Less freedom in modifying HTML file.</li>
            </ul>
        </td>
    </tr>
</table>

After considering both pros and cons of these methods, storing data inside HTML file with AngularJS directives seems to be the best method. While it requires additional dependency, it makes adding new keywords a lot easier which is important for an open source project.


### Search Function

To have a more freedom in customizing search function, we decided to use a search library or plugin instead of search engine service like [Google Custom Search Engine](https://www.google.com/cse/) or [Swiftype](https://swiftype.com/).

In terms of search flexibility, search libraries or plugins for static sites that we discover can be categorized into three methods.

#### Search using string matching algorithm
This is the simplest method of searching. It is basically the same as browser built-in search function. This method gives no flexibility in search query but this is the fastest method in terms of performance.

**Library/Plugin**: [Tapir jQuery plugin](http://tapirgo.com/), [Tipue jQuery plugin](http://www.tipue.com/), [List.js](http://www.listjs.com/)

#### Fuzzy search
The strong point of this method is it allows misspellings in search query by using measuring difference between search query and a valid word. This method is the most flexible method among the three discovered methods. But in practice, it produces more irrelevant results due to its tolerance and might not be suitable for CS2103/T search function.

**Library/Plugin**: [fuse.js](kiro.me/projects/fuse.html), [List.js](http://www.listjs.com/)

#### Search using stemming algorithm
This method works by reducing a word into its [base word](https://en.wikipedia.org/wiki/Word_stem) (stemming) first. This produces a quite flexible search e.g, searching for `activity` also returns `activities` as a result.

**Library/Plugin**: [lunr.js](lunrjs.com)

Search using stemming algorithm seems to be the suitable method for CS2103/T search function. It provides a reasonable amount of flexibility and relevant search results.

Library that we choose to use to implement search function is lunr.js. It provides an easy to use API to process keywords data.

## Maintenance

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

## Possible Improvement

### Spell checker on search box
While current search function provides a fair flexibility, it wasn't able to detect misspelling error. Using fuzzy search function also might not be a good idea because it provides to much flexibility. So it might be a good idea to notify users if they misspell a word inside the search box similar to Google search box.

## References

- [JavaScript library for search engine style searching](http://stackoverflow.com/questions/11832591/javascript-library-for-search-engine-style-searching)

- [Search Options for Static Websites](http://www.budparr.com/article/search/2014/08/24/search-options-for-static-websites/)

