# HTML Style Guide

## Table of Contents
- [Document Properties](#document-properties)
- [External Files](#external-files)
- [Tags](#tags)
- [Attributes](#attributes)
- [Naming Convention](#naming-convention)
- [Indentation](#indentation)
- [Miscellaneous](#miscellaneous)

## Document Properties<a name="document-properties"></a>
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

## External Files<a name="external-files"></a>
- Each webpage should include it's own css file if there is any, as well as the general css file.
- Each webpage should include it's own javascript file(if necessary), as well as the respective common.js, instructor/student.js, and all the 3rd party js files.

## Tags<a name="tags"></a>
- All HTML tags are to be closed properly

  Good:
  ```html
  <div>Stuff</div>
  ```
  
  Bad:
  ```html
  <p>Stuff
  <p>More Stuff
  ```

- Void elements do not have a closing tag. Do not use /> for void elements
  Void elements are: <code>area</code>, <code>base</code>, <code>br</code>, <code>col</code>, <code>command</code>, <code>embed</code>, <code>hr</code>, <code>img</code>, <code>input</code>, <code>keygen</code>, <code>link</code>, <code>meta</code>, <code>param</code>, <code>source</code>, <code>track</code>, <code>wbr</code>

  Good:
  ```html
  <br>
  <img src=”a” width=”5px” height=”10px”>
  ```
  
  Bad:
  ```html
  <br />
  <img src=”a” width=”5px” height=”10px” />
  ```

- Use lowercase for all attributes and tag names
  
  Good:
  ```html
  <div id=”frame”>Test</div>
  ```
  
  Bad:
  ```html
  <DIV ID=”frame”>Test</div>
  ```

## Attributes<a name="attributes"></a>
- Use [attr=”value”] for attribute values

  Good:
  ```html
  <input value=”computer” id=”someInput” disabled=”disabled” tabindex=”2”>
  ```

  Bad:
  ```html
  <input value=computer id='someInput' disabled='disabled' tabindex=2> (single/no quotes)
  <input value="computer" id="someInput" disabled tabindex="2"> (specify boolean variables in the attributes)
  ```

## Naming convention<a name="naming-convention"></a>
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

## Miscellaneous<a name="miscellaneous"></a>
- Take note of script tags.
 
  Good:
  ``` html
  <script type="text/javascript" src="/js/jquery-minified.js"></script>
  ```
  
  Bad:
  ```html
  <script language="JavaScript" src="/js/jquery-minified.js"></script>
  ```

- Do not have trailing whitespaces between opening and closing tags

  Good:
  ```html
  <p>Student Name</p>
  ```
  
  Bad:
  ```html
  <p> Student Name </p>
  ```
