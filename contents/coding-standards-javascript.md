# Javascript Style Guide

## Table of Contents
- [Specific Rules](#specific-rules)
- [General Rules](#general-rules)
- [Additional Reading](#additional-reading)

## Specific Rules<a name="specific-rules"></a>
1. Line break limit at 110 char, not 80 char
2. 4 spaces indentation, not 2 spaces, not tabs
3. Constants named in screaming snake case

  ```javascript
    // bad
    var feedbackresponserecipient = 'responserecipient';

    // badAsWell
    var feedbackResponseRecipient = 'responserecipient';

    // b_a_d
    var feedback_response_recipient = 'responserecipient';

    // G_O_O_D
    var FEEDBACK_RESPONSE_RECIPIENT = 'responserecipient';
    ```

4. Line wrapping rules for improving readability [follow TEAMMATES Java Style Guide files rule 3](https://docs.google.com/document/pub?id=1iAESIXM0zSxEa5OY7dFURam_SgLiSMhPQtU0drQagrs&embedded=true):

  When wrapping lines, the main objective is to improve readability. Feel free to break rules if it improves readability. Do not accept the auto-formatting suggested by the IDE as Eclipse’s JavaScript auto-formatting is very different from that suggested by TEAMMATES.

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
  myString = ‘Long line split’ +
             ‘split into two parts’;
  $('#responses').
     find('.selected').
         highlight().
         end().
     find('.open').
         updateCount();

  // Good
  mySum = a + b + c
          + d;
  myString = ‘Long line split’
             + ‘split into two parts’;
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

Main rule of the thumb: To be consistent with Java coding style in TEAMMATES

## General Rules<a name="general-rules"></a>
- Refer to [airbnb Javascript Style Guide](https://github.com/airbnb/javascript/tree/master/es5)

## Additional Reading<a name="additional-reading"></a>
1. [Javascript Scoping and Hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html)
2. [Truth Equality and Javascript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108)
3. [Future of Javascript (ES6 - Incoming Features)](https://github.com/lukehoban/es6features)
4. [ES6 Compatibility in Browsers](http://kangax.github.io/compat-table/es6/)
5. [Useful CSS Selectors to know](http://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048)
6. [W3schools CSS Selectors Reference](http://www.w3schools.com/cssref/css_selectors.asp)