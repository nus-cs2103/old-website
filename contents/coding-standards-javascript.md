# Javascript Style Guide
 
 - <a href="#specific-rules">Specific Rules</a>
 - <a href="#general-rules">General Rules</a>
 - <a href="#additional-reading">Additional Reading</a>
 
 ## Specific Rules
 - __Line Break Limit__ 
 	
	Limits are at 110 characters instead of 80 characters
	 
 - __Indentation__
   
   Indentation should be 4 spaces for javascript files.
   4 spaces should be used instead of 2 spaces or `tab`.
   
 - __Constants__ 
  
  Constant should use screaming snake case
   
   <table>
     <tr>
       <th align="center">Good</th>
       <th align="center">Bad</th>
     </tr>
     <tr>
       <td>
         <pre lang="javascript">
   // G_O_O_D
   var FOO_BAR_DESCRIPTION = 'helloworld';
   		</pre>
       </td>
       <td>
         <pre lang="javascript">
   // bad
   var foobardescription = 'helloworld';
   		</pre>
       </td>
     </tr>
	 <tr>
	 	<td>
		</td>
		<td>
			<pre lang="javascript">
   // badAsWell
   var fooBarDescription = 'helloworld';
			</pre>
		</td>
	 </tr>
	 <tr>
	 	<td>
		</td>
		<td>
			<pre lang="javascript">
   // b_a_d
   var foo_bar_description = 'helloworld';
			</pre>
		</td>
	 </tr>
	 <tr>
	 	<td>
		</td>
		<td>
			<pre lang="javascript">
   // bad
   var foobardescription = 'helloworld';
			</pre>
		</td>
	 </tr>
   </table>
	
 - __Line wrapping rules__ 
 
  Line wrapping rules for improving readability <a href="https://cdn.rawgit.com/nus-cs2103/website/master/contents/coding-standards-java.html">[follow Java Style Guide files rule 3]</a>

  When wrapping lines, the main objective is to improve readability. Feel free to break rules if it improves readability.
  It is OK to exceed the limit slightly or wrap the lines much shorter than limit.

  In general,
  - Break after a comma.
   
   <table>
     <tr>
       <th align="center">Good</th>
       <th align="center">Bad</th>
     </tr>
     <tr>
       <td>
         <pre lang="javascript">
   // Good
   var alphabets = [
           a,
           b,
           c
   ];
   		</pre>
       </td>
       <td>
         <pre lang="javascript">
   // Bad
   var alphabets = [
               a
           ,   b
           ,   c
   ];
   		</pre>
       </td>
     </tr>
	 <tr>
	 	<td>
			<pre lang="javascript">
  // Good
  var numbers = {
         one: 1,
         two: 2,
         three: 3,
         four: 4
   };	
			</pre>
		</td>
		<td>
			<pre lang="javascript">
   // Bad
   var numbers = {
               one: 1
           ,   two: 2
           ,   three: 3
           ,   four: 4
   };
			</pre>
		</td>
	 </tr>
   </table>
 
  - Align the new line with the beginning of the parent element.
   
   <table>
     <tr>
       <th align="center">Good</th>
       <th align="center">Bad</th>
     </tr>
     <tr>
       <td>
         <pre lang="javascript">
   // Good
   myFunction(arg1, arg2
                   arg3, arg4);
       myFunction(arg1,
                   myOtherFunction(arg2,
                                  arg3),
                   arg4);
   		</pre>
       </td>
       <td>
         <pre lang="javascript">
   // Bad
   myFunction(arg1, arg2, arg3,
          nonAlignedArg4, arg5);
   		</pre>
       </td>
     </tr>
   </table>

  - Break before an operator. This also applies to other "operator-like" symbols like the dot separator (.).

   <table>
     <tr>
       <th align="center">Good</th>
       <th align="center">Bad</th>
     </tr>
     <tr>
       <td>
         <pre lang="javascript">
  // Good
  mySum = a  b  c
               d;
  myString = 'Long line split'
                  'split into two parts';
  $('#responses')
         .find('.selected')
             .highlight()
             .end()
        .find('.open')
             .updateCount();
   		</pre>
       </td>
       <td>
         <pre lang="javascript">
   // Bad
  mySum = a  b  c 
               d;
  myString = 'Long line split' 
                 'split into two parts';
  $('#responses').
         find('.selected').
             highlight().
             end().
         find('.open').
             updateCount();
   		</pre>
       </td>
     </tr>
   </table>

  - Prefer higher-level breaks to lower-level breaks. In the example below, the first is preferred, since the break occurs outside the parenthesized expression, which is at a higher level.

   <table>
     <tr>
       <th align="center">Good</th>
       <th align="center">Bad</th>
     </tr>
     <tr>
       <td>
         <pre lang="javascript">
   // Good
  longName1 = longName2 * (longName3  longName4 - longName5)
                   4 * longName6;
   		</pre>
       </td>
       <td>
         <pre lang="javascript">
   // Bad
  longName1 = longName2 * (longName3  longName4
                  - longName5)  4 * longName6;
   		</pre>
       </td>
     </tr>
   </table>
  
  - Here are three acceptable ways to format ternary expressions:
  
   <table>
     <tr>
       <th align="center">Good</th>
       <th align="center">Bad</th>
     </tr>
     <tr>
       <td>
         <pre lang="javascript">
   // Good
  alpha = (aLongBooleanExpression) ? beta : gamma;
  alpha = (aLongBooleanExpression) ? beta
                                       : gamma;
  alpha = (aLongBooleanExpression)
            ? beta
            : gamma;
   		</pre>
       </td>
       <td>
         <pre lang="javascript">
   // Bad
  alpha = (aLongBooleanExpression) ? beta
            : gamma;
  alpha = (aLongBooleanExpression) ? beta
               : gamma;
  alpha = (aLongBooleanExpression)
                                  ? beta
                                           : gamma;
   		</pre>
       </td>
     </tr>
   </table>

 Main rule of the thumb: To be consistent with Java coding style

 ## General Rules
- Refer to [airbnb Javascript Style Guide](https://github.com/airbnb/javascript/tree/master/es5)

 ## Additional Reading
1. [Javascript Scoping and Hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html)
2. [Truth Equality and Javascript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108)
3. [Future of Javascript (ES6 - Incoming Features)](https://github.com/lukehoban/es6features)
4. [ES6 Compatibility in Browsers](http://kangax.github.io/compat-table/es6/)