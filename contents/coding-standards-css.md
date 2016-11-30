# CSS Coding Standard
 
 ## Contents
 - [General](#general)
 - [CSS Files](#css-files)
 - [Sections](#sections)
 - [Selectors](#selectors)
 - [Classes](#classes)
 - [Attributes](#attributes)
 - [Resources](#resources)
 
 ## General<a name="general"></a>
 We are using the [Google CSS Style Guide](#https://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml&amp;sa=D&amp;ust=1480461672565000&amp;usg=AFQjCNENvrZEYTgdQkanPde16QEu-FqFHA) as our primary guide and have made a few changes to suit TEAMMATES project. The Google Style Document shall be used for any topics not covered in this document.

We are using Bootstrap front-end framework to ease our styling efforts

>Use bootstrap classes wherever possible and as much as possible. In those rare occasions that additional rules are needed, follow the standard given below. 

We only have one CSS file for the entire website

>Since the golden rule is to use as much bootstrap classes as possible, we do not expect much additional css to be written. Thus we shall use just one file teammatesCommon.css to contain all the additional css. Also, having just one file helps to isolate the css rules in one file rather than to search multiple files. Finally there is a performance boost when only one file is used as there are fewer HTML requests and better use of caching.

We are not using CSS3 selectors  --reconsider this rule when IE12 releases

Although they are powerful, cross browser compatibility is difficult to achieve and many rules are supported by different browsers starting from different versions (refer: [W3CSchools List](https://www.google.com/url?q=http://www.w3schools.com/cssref/css3_browsersupport.asp&amp;sa=D&amp;ust=1480461672574000&amp;usg=AFQjCNHJOKLPktm0j5dN20ldwPZmumz1bQ) ). Also, we can stick to more functional names for the css and use classes to achieve our needs → more readable and easier to manage.
    
## Resources<a name="resources"></a>

### Highly Recommended
 - [Google CSS Style Guide](#https://www.google.com/url?q=https://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml&sa=D&ust=1480461672641000&usg=AFQjCNFamL4PYjTTMrqBsHCGBgQdl5IZCg)
 - [Writing Your Best Code](#https://www.google.com/url?q=http://learn.shayhowe.com/html-css/writing-your-best-code/%23css-coding-practices&sa=D&ust=1480461672642000&usg=AFQjCNHtGiad1-XEIElzKPKmTxUYP1t1AQ)

### Other Readings
 - [Isobar Coding Standards](#https://www.google.com/url?q=http://isobar-idev.github.io/code-standards/&sa=D&ust=1480461672643000&usg=AFQjCNHERbOy_onAr0b5IDIplnahd4PknA)
 - [30 CSS Best Practices For Beginners](#https://www.google.com/url?q=http://code.tutsplus.com/tutorials/30-css-best-practices-for-beginners--net-6741&sa=D&ust=1480461672644000&usg=AFQjCNFAgLMbsNjA-2kz3uWDkN39Dc3NMA)
 - [Writing efficient CSS (MDN article)](#https://www.google.com/url?q=https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS&sa=D&ust=1480461672644000&usg=AFQjCNHphBRs8U7j2qvrWW0cGYuHvjOeOg)
 - [A list of CSS style guides](#https://www.google.com/url?q=http://css-tricks.com/css-style-guides/&sa=D&ust=1480461672645000&usg=AFQjCNG4XuhlqAJNkU_Yn_V9BuSwRjqMaw)
