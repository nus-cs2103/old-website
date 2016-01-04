# Javascript Style Guide
 
 - <a href="#specific-rules">Specific Rules</a>
 - <a href="#general-rules">General Rules</a>
 - <a href="#additional-reading">Additional Reading</a>
 
 ## Specific Rules
 - __Line Break Limit__ 
 	
	Limits are at 110 characters instead of 80 characters
	 
 - __Indentation__
   
   Indentation should be 4 spaces for javascript files.
   4 spaces should be used instead of 2 `spaces` or `tab`.
   
 - __Constants__ 
  
  Constant should use screaming snake case

  ```javascript
    // bad
    var foobardescription = 'helloworld';

    // badAsWell
    var fooBarDescription = 'helloworld';

    // b_a_d
    var foo_bar_description = 'helloworld';

    // G_O_O_D
    var FOO_BAR_DESCRIPTION = 'helloworld';
    ```
	
 - __Line wrapping rules__ 
 
  Line wrapping rules for improving readability <a href="coding-standards-java.html">[follow Java Style Guide files rule 3]</a>

  When wrapping lines, the main objective is to improve readability. Feel free to break rules if it improves readability.
  It is OK to exceed the limit slightly or wrap the lines much shorter than limit.

  In general,
  - Break after a comma.

  ```javascript
   // Bad
   var alphabets = [
           a
       ,   b
       ,   c
   ];

   // Good
   var alphabets = [
       a,
       b,
       c
   ];

   // Bad
   var numbers = {
           one: 1
       ,   two: 2
       ,   three: 3
       ,   four: 4
   };

   // Good
   var numbers = {
      one: 1,
      two: 2,
      three: 3,
      four: 4
   };
  ```
  - Align the new line with the beginning of the parent element.

  ```javascript
   // Bad
   myFunction(arg1, arg2, arg3,
      nonAlignedArg4, arg5);

   // Good
   myFunction(arg1, arg2
              arg3, arg4);
   myFunction(arg1,
             myOtherFunction(arg2,
                             arg3),
             arg4);
  ```

  - Break before an operator. This also applies to other "operator-like" symbols like the dot separator (.).

  ```javascript
  // Bad
  mySum = a + b + c +
           d;
  myString = 'Long line split' +
             'split into two parts';
  $('#responses').
     find('.selected').
         highlight().
         end().
     find('.open').
         updateCount();

  // Good
  mySum = a + b + c
          + d;
  myString = 'Long line split'
             + 'split into two parts';
  $('#responses')
     .find('.selected')
         .highlight()
         .end()
     .find('.open')
         .updateCount();
  ```

  - Prefer higher-level breaks to lower-level breaks. In the example below, the first is preferred, since the break occurs outside the parenthesized expression, which is at a higher level.

  ```javascript
  // Bad
  longName1 = longName2 * (longName3 + longName4
              - longName5) + 4 * longName6;

  // Good
  longName1 = longName2 * (longName3 + longName4 - longName5)
              + 4 * longName6;
  ```

  - Here are three acceptable ways to format ternary expressions:
  
  ```javascript
  // Bad
  alpha = (aLongBooleanExpression) ? beta
        : gamma;
  alpha = (aLongBooleanExpression) ? beta
           : gamma;
  alpha = (aLongBooleanExpression)
                              ? beta
                                       : gamma;

  // Good
  alpha = (aLongBooleanExpression) ? beta : gamma;
  alpha = (aLongBooleanExpression) ? beta
                                   : gamma;
  alpha = (aLongBooleanExpression)
        ? beta
        : gamma;
  ```

 Main rule of the thumb: To be consistent with Java coding style

 ## General Rules
- Refer to [airbnb Javascript Style Guide](https://github.com/airbnb/javascript/tree/master/es5)

 ## Additional Reading
1. [Javascript Scoping and Hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html)
2. [Truth Equality and Javascript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108)
3. [Future of Javascript (ES6 - Incoming Features)](https://github.com/lukehoban/es6features)
4. [ES6 Compatibility in Browsers](http://kangax.github.io/compat-table/es6/)
5. [Useful CSS Selectors to know](http://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048)
6. [W3schools CSS Selectors Reference](http://www.w3schools.com/cssref/css_selectors.asp)