# CSS Coding Standard

<br>
## Contents
 - [General](#general)
 - [CSS Files](#css-files)
 - [Selectors](#selectors)
 - [Classes](#classes)
 - [Sections](#sections)
 - [Attributes](#attributes)
 - [Resources](#resources)

<br>
## General<a name="general"></a>
 We are using the [Google CSS Style Guide](https://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml&amp;sa=D&amp;ust=1480461672565000&amp;usg=AFQjCNENvrZEYTgdQkanPde16QEu-FqFHA) as our primary guide and have made a few changes to suit TEAMMATES project. The Google Style Document shall be used for any topics not covered in this document.

→ We are using Bootstrap front-end framework to ease our styling efforts
```
   Use bootstrap classes wherever possible and as much as possible. In those rare occasions that additional 
   rules are needed, follow the standard given below. 
```
→ We only have one CSS file for the entire website

```
   Since the golden rule is to use as much bootstrap classes as possible, we do not expect much additional css 
   to be written. Thus we shall use just one file teammatesCommon.css to contain all the additional css. Also, 
   having just one file helps to isolate the css rules in one file rather than to search multiple files. Finally 
   there is a performance boost when only one file is used as there are fewer HTML requests and better use of caching.
```
→ We are not using CSS3 selectors  --reconsider this rule when IE12 releases

>Although they are powerful, cross browser compatibility is difficult to achieve and many rules are supported by different browsers starting from different versions (refer: [W3CSchools List](https://www.google.com/urlq=http://www.w3schools.com/cssref/css3_browsersupport.asp&amp;sa=D&amp;ust=1480461672574000&amp;usg=AFQjCNHJOKLPktm0j5dN20ldwPZmumz1bQ) ). Also, we can stick to more functional names for the css and use classes to achieve our needs → more readable and easier to manage.

<br>
## CSS Files<a name="css-files"></a>

→  Include any additional css specifications in one file - [teammatesCommon.css](https://www.google.com/url?q=http://github.com/TEAMMATES/repo/blob/master/src/main/webapp/stylesheets/teammatesCommon.css&sa=D&ust=1480481409238000&usg=AFQjCNH-oKQpY9ou8MhyUre63_A8KXY-Eg) <br>

→ In the future if we have more files, CSS file includes must be done using `<link>` tags in the html/jsp files and NOT using `@import`   in other css files.

```html
    <link rel=”stylesheets” href=”../teammatesCommon.css” type=”text/css”>
   ```
```html
    @import “teammatesCommon.css”;
   ```   
` `**`@import`**` can be slow and may result in the page being rendered without css for a while before the page magically 
   comes to life. As of now we are using css files as stylers of html pages and thus the dependency must be clearly visible 
   in the html page.`
   
→ NO inline style sheets or inline styles in the html/jsp files

```html
    /* write styles only in the external file teammatesCommon.css */
    #mainDiv {
        border: thin solid black;
        color:white;
        margin: auto;
    }
   ``` 
```html
    <!-- no inline stylesheets →
    <style>
    #mainDiv {
        color: white;
    }
    </style>

    <!-- no inline styling in tags -->
    <div id=”mainDiv” style=”border: thin solid black; margin: auto”>
   ```  
   
<br>
## Sections<a name="sections"></a>
→ [teammatesCommon.css](https://www.google.com/url?q=http://github.com/TEAMMATES/repo/blob/master/src/main/webapp/stylesheets/teammatesCommon.css&sa=D&ust=1480622085998000&usg=AFQjCNFloDL_D6ufw4UC66VBkxhBJ3tM-g) has been divided into 4 sections - Generic, NavBar, Header, MainContent. Place the new css rules in the appropriate section.

```
   By segmenting the file in this logical way, it is easy to locate css rules and to ensure that a new rule 
   being added is not already present.
```

<br>
## Selectors<a name="selectors"></a>
### Selector Formatting:
→  The selector(s) must be specified in separate lines 

```html
    /* Each selector in a new line */
    .button-sort-ascending:hover,
    .button-sort-none:hover {
    cursor: pointer;
    }
   ```

```html   
   /* do not write them in the same line */
   .button-sort-ascending:hover, .button-sort-none:hover {
   cursor: pointer;
   }
   ```
```
   This eases reading as well as helps in revision control as conflicts reduce.
```

→  Group related/hierarchical style specifications (eg :hover, child specifier, etc) and provide an additional indent to the more          specific selector --refer to [here](https://www.google.com/url?q=http://isobar-idev.github.io/code-standards/%23_css_formatting&sa=D&ust=1480630746836000&usg=AFQjCNGKmXgb45H-LsiHmt_ZoAYWg7fSDA) for examples

```
   This gives a nice hierarchical structure to the file and helps to visually group css rules by indentation. 
   In addition this gives an immediate idea as to how certain classes are being used in the HTML files 
   (from the hierarchy) without actually reading HTML files.
```

### Use of Efficient Selectors:

→ Do not qualify class/ID selectors using tag names (do not use: div.mainContent, simply use .mainContent) -- refer to [Writing           efficient CSS](https://www.google.com/url?q=https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS%23Guidelines_for_Efficient_CSS&sa=D&ust=1480622086019000&usg=AFQjCNEyqjnbD45y_Rw9xotN4CDhlJ8iwA) for examples

```
   This speeds up the css match lookup. If such a qualification is actually required, either use another 
   class on top of this to change the style or use a completely different class to start with. In any case, 
   if this kind of qualification is needed, then probably the class has not been named well enough 
   (see naming standards for classes).
```

→ Use Child selector rather than descendant selector (use ‘#container > span’ rather than ‘#container span’) -- refer to [Writing efficient CSS](https://www.google.com/url?q=https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS%23Guidelines_for_Efficient_CSS&sa=D&ust=1480622086019000&usg=AFQjCNEyqjnbD45y_Rw9xotN4CDhlJ8iwA) for examples

```
   This is a strong recommendation as descendant selector is extremely expensive, especially when the 
   specified ancestor has a lot of descendants.
```

<br>
## Classes<a name="classes"></a>

### Naming Standards
→ Use all lowercase letters <br>
→ Separate words with hyphens (‘-’) and no other separator <br>
→ We use 2 kinds of classes: Atomic and Component

```html
   /* Component Class */
   .comment-list
   .sort-icon
   /* Atomic Class */
   .align-center
   .border-gray
   ```
```html
    /* do not use these */
    .commentList
    .sort_icon
    .centeralign
   ```
```
   Atomic Classes describe atomic attributes like border-gray, align-center that can be used on any element. 
   They have at most 2 rules in them. Start their names with the attribute, followed by the value.  
   (eg: .align-center and not .center-align)
   
   Component Classes are used for components that have a particular role that (preferably) recurs in multiple 
   pages. To name these classes, describe the function of the element rather than its location 
   (eg: .panel-details rather than .top-details-box)
```
   
→ When adding classes to style elements in the page, follow the following steps:

   ⇒ Try and style the entire component using bootstrap <br>
   ⇒ For any additional css, if the component is used in many places create a functional name for the class <br>
   ⇒ If the component does not have any recurring function, utilise the generic classes to achieve the styling. <br>
   **Exception:** If a particular element requires too many generic classes ( > 5) create a functional class name for it.

<br>
## Attributes<a name="attributes"></a> 

### Order of Attributes

→ Alphabetize the attributes, disregarding any browser prefix. <br>
→ All browser prefixed versions of an attribute must be written together.

```html
   /* code the attributes in alphabetical order */
   .sort-icon {
       display: block;
       float: right;
       height: 17px;
       margin-top: 1px;
       width: 12px;
    }
   ```
```html
   .sort-icon {
       width: 12px;
       height: 17px;
       display: block;
       margin-top: 1px;
       float: right;
    }  
   ```

```   
   This way looking for an attribute is faster.
   ```

### Attribute Formatting

→ Semicolon after every attribute specification <br>
→ Space after colon <br>
→ Drop the units for 0 values (eg: margin: 0) <br>
→ All attribute(s) are to be specified in individual lines <br>
→ Attributes must have one more indentation than the selector <br>
→ indent attributes that require browser specifications so that the actual attribute being declared are in one column --refer to [Writing Your Best Code](https://www.google.com/url?q=http://learn.shayhowe.com/html-css/writing-your-best-code/%23css-coding-practices&sa=D&ust=1480717086146000&usg=AFQjCNEmbPGCl_znVtLr8ud0kbW3_jbbwQ) for examples <br>

### General Details

→ Use shorthands as much as possible (eg border: 2px 0 1px 4px) <br>
→ DO NOT use `!important` specifier <br>

```html
   /* not recommended */
   margin: 10px 0 !important; 
   ```
`Using the `**`!important`**` specifier overrides the natural flow of specificity and cascading hierarchy of css styles. 
 Unless absolutely necessary do not use it. If there is such a situation clearly state the reason with comments (/*  */).`
  
<br>

## Resources<a name="resources"></a>   

### Highly Recommended
 - [Google CSS Style Guide](https://www.google.com/url?q=https://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml&sa=D&ust=1480461672641000&usg=AFQjCNFamL4PYjTTMrqBsHCGBgQdl5IZCg)
 - [Writing Your Best Code](https://www.google.com/url?q=http://learn.shayhowe.com/html-css/writing-your-best-code/%23css-coding-practices&sa=D&ust=1480461672642000&usg=AFQjCNHtGiad1-XEIElzKPKmTxUYP1t1AQ)

### Other Readings
 - [Isobar Coding Standards](https://www.google.com/url?q=http://isobar-idev.github.io/code-standards/&sa=D&ust=1480461672643000&usg=AFQjCNHERbOy_onAr0b5IDIplnahd4PknA)
 - [30 CSS Best Practices For Beginners](https://www.google.com/url?q=http://code.tutsplus.com/tutorials/30-css-best-practices-for-beginners--net-6741&sa=D&ust=1480461672644000&usg=AFQjCNFAgLMbsNjA-2kz3uWDkN39Dc3NMA)
 - [Writing efficient CSS (MDN article)](https://www.google.com/url?q=https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS&sa=D&ust=1480461672644000&usg=AFQjCNHphBRs8U7j2qvrWW0cGYuHvjOeOg)
 - [A list of CSS style guides](https://www.google.com/url?q=http://css-tricks.com/css-style-guides/&sa=D&ust=1480461672645000&usg=AFQjCNG4XuhlqAJNkU_Yn_V9BuSwRjqMaw)
