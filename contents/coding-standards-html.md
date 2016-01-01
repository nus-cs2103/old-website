# HTML Style Guide

- <a href="#document-properties">Document Properties</a>
- <a href="#external-files">External Files</a>
- <a href="#tags">Tags</a>
- <a href="#attributes">Attributes</a>
- <a href="#naming-convention">Naming Convention</a>
- <a href="#indentation">Indentation</a>
- <a href="#miscellaneous">Miscellaneous</a>

## Document Properties
- __We will use the HTML5 Doctype and HTML5 features__
  ```html
  <!DOCTYPE html>
  ```

  Do __NOT__ include xml namespace in the document.
  ```html
  xmlns="http://www.w3.org/1999/xhtml”
  ```

- __Character Encoding__
  All markup should be delivered as UTF-8, as its the most friendly for internationalization.
  ```html
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  ```

- __General Rules__
  - Indentation
  
    Indentation should be 2 spaces for html files.
    Spaces should be used instead of <code>tab</code>

  - Readability vs Compression
  
    We prefer readability over file-size savings when it comes to maintaining existing files.
    Plenty of whitespace is encouraged, along with ASCII art, where appropriate.
    There is no need for any developer to purposefully compress HTML or CSS, nor obfuscate JavaScript.

  - Markup and inline styling
  
    Markup defines the structure and outline of a document and offers a structured content.
    It is not intended to define the look and feel of the content on the page beyond rudimentary concepts such as headers, paragraphs, and lists.
    The presentation attributes of HTML have all been deprecated and style should be contained in style sheets.
    No inline styling should be present in any form.

- __General structure for HTML document__
  ```html
  <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      
      <title>Teammates</title>
      
      <link rel="shortcut icon" href="/favicon.png">
      <!-- Sample stylesheet inclusion -->
      <link type="text/css" href="stylesheets/teammates.css" rel="stylesheet">
      
      <!-- Sample javascript inclusion -->
      <script type="text/javascript" src="/js/jquery-minified.js"></script>
    </head>
    <body>
      <div id="frameTop">
        stuff...
      </div>
      <div id="frameBodyWrapper" class="container theme-showcase">
        stuff...
      </div>
      <div id="frameBottom">
        stuff...
      </div>
    </body>
    </html>
  ```

## External Files
- Each webpage should include it's own css file if there is any, as well as the general css file.
- Each webpage should include it's own javascript file(if necessary), as well as the respective common.js, instructor/student.js, and all the 3rd party js files.

## Tags
- All HTML tags are to be closed properly

  <table>
    <tr>
      <th align="center">Good</th>
      <th align="center">Bad</th>
    </tr>
    <tr>
      <td>
        <pre lang="html">
  &lt;div&gt;Stuff&lt;/div&gt;</pre>
      </td>
      <td>
        <pre lang="html">
  &lt;p&gt;Stuff
  &lt;p&gt;More Stuff</pre>
      </td>
    </tr>
  </table>

- Void elements do not have a closing tag. Do not use /> for void elements
  Void elements are: <code>area</code>, <code>base</code>, <code>br</code>, <code>col</code>, <code>command</code>, <code>embed</code>, <code>hr</code>, <code>img</code>, <code>input</code>, <code>keygen</code>, <code>link</code>, <code>meta</code>, <code>param</code>, <code>source</code>, <code>track</code>, <code>wbr</code>

  <table>
    <tr>
      <th align="center">Good</th>
      <th align="center">Bad</th>
    </tr>
    <tr>
      <td>
        <pre lang="html">
  &lt;br&gt;
  &lt;img src="a" width="5px" height="10px"&gt;</pre>
      </td>
      <td>
        <pre lang="html">
  &lt;br /&gt;
  &lt;img src="a" width="5px" height="10px" /&gt;</pre>
      </td>
    </tr>
  </table>

- Use lowercase for all attributes and tag names

  <table>
    <tr>
      <th align="center">Good</th>
      <th align="center">Bad</th>
    </tr>
    <tr>
      <td>
        <pre lang="html">
  &lt;div id="frame"&gt;Test&lt;/div&gt;</pre>
      </td>
      <td>
        <pre lang="html">
  &lt;DIV ID="frame"&gt;Test&lt;/div&gt;</pre>
      </td>
    </tr>
  </table>

## Attributes
- Use [attr=”value”] for attribute values

  <table>
    <tr>
      <th align="center">Good</th>
    </tr>
    <tr>
      <td>
        <pre lang="html">
  &lt;input value="computer" id="someInput" disabled="disabled" tabindex="2"&gt;</pre>
      </td>
    </tr>
  </table>
  
  <table>
    <tr>
      <th align="center">Bad</th>
    </tr>
    <tr>
      <td>
        <pre lang="html">
  &lt;input value=computer id='someInput' disabled='disabled' tabindex=2&gt;(single/no quotes)
  &lt;input value="computer" id="someInput" disabled tabindex="2"&gt;(specify boolean variables in the attributes)</pre>
      </td>
    </tr>
  </table>

## Naming convention
- Class
  See Css style guide for this section

- Id
  lower-case, join-by-hyphen

  ```html
  instructor-email-1
  ```

## Indentation<a name="indentation"></a>
- Indentation should be 2 spaces for html files.
- Spaces should be used instead of <code>tab</code>

## Miscellaneous
- Take note of script tags.

  <table>
    <tr>
      <th align="center">Good</th>
    </tr>
    <tr>
      <td>
        <pre lang="html">
  &lt;script type="text/javascript" src="/js/jquery-minified.js"&gt;&lt;/script&gt;</pre>
      </td>
    </tr>
  </table>
  
  <table>
    <tr>
      <th align="center">Bad</th>
    </tr>
    <tr>
      <td>
        <pre lang="html">
  &lt;script language="JavaScript" src="/js/jquery-minified.js"&gt;&lt;/script&gt;</pre>
      </td>
    </tr>
  </table>

- Do not have trailing whitespaces between opening and closing tags

  <table>
    <tr>
      <th align="center">Good</th>
      <th align="center">Bad</th>
    </tr>
    <tr>
      <td>
        <pre lang="html">
  &lt;p&gt;Student Name&lt;/p&gt;</pre>
      </td>
      <td>
        <pre lang="html">
  &lt;p&gt; Student Name &lt;/p&gt;</pre>
      </td>
    </tr>
  </table>
