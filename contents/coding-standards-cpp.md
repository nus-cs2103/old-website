# Coding Standards for C++ (Extract)

![Dennis Ritchie Creator of C](https://lh3.googleusercontent.com/ptmL-lnkZidSpuMFYN0TyfEShMk3o4T9QA1BdYoHWZ9v7qF-jVA6NTWJsYWzKXWsSvFf7VYAaPwFZNtRI9X8Y1YEJ64dSbB7CdmDM81Hfkh1dJhXFkQ7lJleIQRgpJI1)
Dennis Ritchie, Creator of C

## Naming Conventions
- Use meaningful names.
- Use single-character variables only for counters (i, j) or for coordinates (x,y,z).

<table>
    <tr>
        <th>Identifier</th>
        <th>Casing</th>
        <th>Naming Structure</th>
        <th>Example</th>
    </tr>
    <tr>
        <td><b>Class</b></td>
        <td>PascalCasing</td>
        <td>Noun</td>
        <td><pre lang="cpp">
class ComplexNumber {...};
class CodeExample {...};
class StringList {...};
</pre></td>
    </tr>
    <tr>
        <td><b>Enumeration</b></td>
        <td>PascalCasing</td>
        <td>Noun</td>
        <td><pre lang="cpp">enum Type {...};</pre></td>
    </tr>
    <td><b>Function, Method</b></td>
    <td>camelCasing</td>
    <td>Verb or Verb-Noun</td>
    <td><pre>
void print()
void processItem()
</pre></td>
    <tr>
        <td><b>Interface</b></td>
        <td>PascalCasing ‘I’ prefix</td>
        <td>Noun</td>
        <td><pre lang="cpp">
class IDictionary {...};
</pre></td>
    </tr>
    <tr>
        <td><b>Structure</b></td>
        <td>All capital, separate words with ‘&#95;’</td>
        <td>Noun</td>
        <td><pre>
struct FORM_STREAM_HEADER
</pre></td>
    </tr>
    <tr>
        <td><b>Macro, Constant</b></td>
        <td>All capital, separate words with ‘&#95;’</td>
        <td></td>
        <td><pre lang="cpp">
#define BEGIN_MACRO_TABLE(name) ...
#define MACRO_TABLE_ENTRY(a, b, c) ...
#define END_MACRO_TABLE() ...
constint BLACK = 3;
</pre></td>
    </tr>
    <tr>
        <td><b>Parameter, Variable</b></td>
        <td>camelCasing</td>
        <td>Noun</td>
        <td><code>exampleText</code>, <code>dwCount</code></td>
    </tr>
    <tr>
        <td><b>Template parameter</b></td>
        <td>PascalCasing ‘T’ prefix</td>
        <td>Noun</td>
        <td><code>T</code>, <code>TItem</code>, <code>TPolicy</code></td>
    </tr>
</table>

A note about __test function names__: Underscores may be used for test method names if your test method names are long and very descriptive. However, if this style is adopted for test methods, the whole team should follow it consistently. 
e.g. `testLogic_addTask_nullParameters_errorMessageExpected()`

## Indentation Rules
1. Avoid __lines longer than 80__ characters including preceding spaces and __functions longer than than 100 lines__ of code. [Hint: try [this plugin](https://www.google.com/url?q=http://visualstudiogallery.msdn.microsoft.com/0fbf2878-e678-4577-9fdb-9030389b338c/&sa=D&usg=AFQjCNG9m6paUexPqIQqQ0kbhkeBhwxNoA)]

2. Default __indentation__ is one tab. One space is added before and after each operator or assignment symbol.

  ```cpp
  void printMessage() {                   void printMessage() {
      cout << "Welcome\n"; /*good*/               cout<<"Welcome\n"; /*bad*/
      cout << "Oh yeah\n";                    cout<<"Oh year\n";
  }                                       }
  ```

3. Use __blank lines__ to separate groups of related statements.  Omit extra blank lines that do not make the code easier to read.

  Good:
  ```cpp
  void sortAndPrint(int *data, int size) {
      //sorting
      for (int i = size - 2; i >= 0; i--) {
          for (int j = 0; j <= i; j++) {
              if (data[j] > data[j + 1]) {
                  int temp = data[j];
                  data[j] = data[j + 1];
                  data[j + 1] = temp;
              }
          }
      }

      //printing
      for (int i = 0; i < size; i++) {
          cout << data[i] << " ";
      }
      cout << "\n";
  }
  ```

  Bad:
  ```cpp
  void sortAndPrint(int *data, int size) {
      //sorting
      for (int i = size - 2; i >= 0; i--) {
          for (int j = 0; j <= i; j++) {
              if (data[j] > data[j + 1]) {
                  int temp = data[j];
                  data[j] = data[j + 1];
                  data[j + 1] = temp;
              }
          }
      }
      //printing
      for (int i = 0; i < size; i++) {
          cout << data[i] << " ";
      }
      cout << "\n";
  }
  ```

3. Put the __opening braces in the same line__, not in a new line.

  ```cpp
  /* this is good */                       /* this is bad */ 
  void printMessage() {                    void printMessage()
      if (isCorrect) {                     {
          cout << "Welcome\n";                 if (isCorrect)
          cout << "Oh yeah\n";                 {
      } else {                                     cout << "Welcome\n";
          cout << "Wrong\n";                       cout << "Oh year\n";
      }                                        }
  }                                            else
                                               {
                                                   cout << "Wrong\n";
                                               }
                                            }
  ```

4. __Indent comments__ at the same level as the code.

  Good:
  ```cpp
  // Components must be initialized before they are used.
  initializeComponent();
  ```

  Bad:
  ```cpp
      // Components must be initialized before they are used.
  initializeComponent();
  ```

## Comments
1. Use `//` for all code __comments__ (even for multiple line comments; the main reason being that if you ever need to comment out a large chunk of codes for testing, debugging or whatever, you could easily use the pair `/*` and `*/` had you been using `//` for all comments, whereas you couldn’t do that had you used `/*` and `*/` for your code comments.

  Good:
  ```cpp
  // The following code runs best when the values in
  // array x and those in y are highly correlated.
  // The performance is extremely poor when they are not.
  ```
  
  Bad:
  ```cpp
  /*
      The following code runs best when the values in
      array x and those in y are highly correlated.
      The performance is extremely poor when they are not.
  */
  ```

2. Provide relevant comments for __important functions__.

  Good:
  ```cpp
  // This function garbage collects objects created
  // through the factory. Use it with caution, as it
  // may cause performance hiccups.
  ```
  Bad: (useless comment for not important functions, which are often self-explanatory)
  ```cpp
  // This function increments the value of x by 1
  void inc() {
      x++;
  }
  ```

3. Write comment for __every class definition__ to describe what it is for, and how it should be used.

  Good:
  ```cpp
  // Iterates over the contents of a GargantuanTable.  Sample usage:
  //    GargantuanTableIterator* iter = table->NewIterator();
  //    for (iter->Seek("foo"); !iter->done(); iter->Next()) {
  //        process(iter->key(), iter->value());
  //    }
  //    delete iter;
  class GargantuanTableIterator {
      ...
  };
  ```

4. Write comment for __every function declaration__ to describe what the function does, and how it should be used. These comments do not describe how the task is been carried out; that should be left to the comments inside the function definition content.

  The following are the types of things to mention in the function declaration:
  - Function parameters and return value
  - For class member functions: whether the object remembers reference arguments beyond the duration of the method call, and whether it will free them or not.
  - If the function allocates memory that the caller must free.
  - Whether any of the arguments can be NULL.
  - If there are any performance implications of how a function is used.

  Good:
  ```cpp
  // Returns an iterator for this table.  It is the client's
  // responsibility to delete the iterator when it is done with it,
  // and it must not use the iterator once the GargantuanTable object
  // on which the iterator was created has been deleted.
  //
  // The iterator is initially positioned at the beginning of the table.
  //
  // This method is equivalent to:
  //    Iterator* iter = table->NewIterator();
  //    iter->Seek("");
  //    return iter;
  // If you are going to immediately seek to another place in the
  // returned iterator, it will be faster to use NewIterator()
  // and avoid the extra seek.
  Iterator* getIterator() const;
  ```

  Bad:
  ```cpp
  // Returns true if the table cannot hold any more entries.
  bool isTableFull();
  ```

  [Hint: If you are looking for a way to auto-generate online HTML documentation based on the comments written in code, try [Doxygen](https://www.google.com/url?q=http://www.stack.nl/~dimitri/doxygen/&sa=D&usg=AFQjCNG8GqcHJMXJpA5H1ggz5r7Q4OISgw). The comment standard used is similar to Javadoc]

## Look & Feel
1. Do not declare __multiple variables__ in a single line. Initialize variables whenever possible.

  ```cpp
  /* this is good */             /* this is bad */
  int i = 0;                     int i, j, k;
  int j = 0;
  int k = 0;
  ```
 
2. If there are too many parameters to put in one line, or if you want to comment on the parameters, put __one parameter per line__, each indented a tab away from the left margin.
 
  Good:
  ```cpp
  bool receive(
      Channel c,                 //comment....
      Request r,                 //comment....
      int &size,                 //comment....
      int &congestion_window,    //comment....
      char *buf);                //comment....
  ```

  Bad:
  ```cpp
  bool receive(int &size, Channel c, Request r, int &congestion_window, char *buf);
  ```

3. When creating a series of methods that accept the same parameters, do use a __consistent order__ across the functions.

  Good:
  ```cpp
  void format(Text text, Style style);
  void align(Text text, Style style);
  ```

  Bad:
  ```cpp
  void format(Text text, Style style);
  void align(Style style, Text text);  // not consistent
  ```

4. The body of the conditional should be wrapped by curly brackets irrespective of how many statements are in it to avoid error prone code.

  ```cpp
  /* this is good */                      /* this is bad */
  if (isRightCondition(a, b)) {           if (isRightCondition(a, b))
      printResult();                           printResult();
  }
  ```

5. Do not put more than one statement on a single line.

  ```cpp
  /* this is good */                      /* this is bad */
  a = 1;                                  a = 1; b = 2;
  b = 2;                                  if (isRight(a, b)) printResult();
  if (isRightCondition(a, b)) {
      printResult();
  }
  ```

## Miscellaneous
1. __Use an `enum`__ over `static` constants or `#define` values, for the sake of readability.

  Good:
  ```cpp
  typedef enum{black, white, red, green} Colour;
  ...
  Colour myColour = red;
  ...
  ```

  Bad:
  ```cpp
  #define black 0;
  const int white = 1;
  #define red 2;
  #define green 3;
  ...
  int myColour = red;
  ...
  ```

2. Do not reference __unnecessary libraries__, include unnecessary header files, or reference unnecessary assemblies.

3. Use named constants as `const` values, instead of `#define` values. This forces the compiler to do type checking, and also add the variable into symbol table for easy debugging.

  ```cpp
  /* this is good */                       /* this is bad */
  const int BLACK = 3;                     #define BLACK 3
  ```

4. Use `sizeof(var)` instead of `sizeof(TYPE)`

  ```cpp
  /* this is good */                       /* this is bad */
  MY_STRUCT s;                             MY_STRUCT s;
  ZeroMemory(&s, sizeof(s));               ZeroMemory(&s, sizeof(MY_STRUCT));
  ```
 
5. Do __not declare `public` data members__.  Use __`inline` accessor__ functions for performance.

  ```cpp
  /* this is good */                                /* this is bad */
  private:                                          public:
      int _size;                                        int _size;
  public:
      inline int getSize() { return _size; }
  ```

6. Initialize member variables in the same order that they were defined in the class declaration

  Good:
  ```cpp
  class SampleCode {
  public:
      SampleCode(int size, string text);
      ~SampleCode();
  private:
     string _text;
     int _size;
  };
  SampleCode ::SampleCode (int size, string text) :
      _text(text),
      _size(size) {
  }
  ```

  Bad:
  ```cpp
  class SampleCode {
  public:
      SampleCode(int size, string text);
      ~SampleCode();
  private:
      string _text;
      int _size;
  };
  SampleCode ::SampleCode (int size, string text) :
      _size(size),  // The order is wrong
      _text(text) {
  }
  ```
 
7. Do __minimal work__ in the constructor
 
8. Do use a __destructor__ to centralize the resource cleanup of a class that is freed via delete
 
9. Do not use __virtual methods__ unless you really should because virtual functions have overhead of calling through the vtable.
 
10. Do ensure that all __allocated memory is freed__ using the same mechanisms. Objects allocated using ‘new’ should be freed with ‘delete’.
 
11. Do throw exceptions __by value__ and catch exceptions __by reference__.

  Good:
  ```cpp
  void processItem(const Item& item) {
      try {
          if (/* some test failed */) {
              throw Exception(“blah blah blah”);
          }
      }
      catch (Exception &excp) {
          // Process excp
          //
      }
  }
  ```

  Bad:
  ```cpp
  void processItem(const Item& item) {
      try {
          if (/* some test failed */) {
              throw Exception();
          }
      }
      catch (Exception excp) {
          // Process excp
          //
      }
  }
  ```

12. Do not allow exceptions to be thrown out of destructors
 
13. Do not use `catch(Exception e)`. General exceptions should not be caught. You should catch a more specific exception, or re-throw the general exception as the last statement in the catch block.
 
14. Header files are included in the following order in a __Header File__
  1. System files
  2. Library files
  3. Application-specific files
  4. Local files

  ```cpp
  #include <stdio.h>
  #include <string.h>
  #include <appSpecific.h>
  #include “localFiles.h”
  ```
 
15. Header files are included in the following order in a __Source File__
  1. System files
  2. Library files
  3. Application-specific files
  4. Local files
  5. Header file for the class

## References:
- http://google-styleguide.googlecode.com/svn/trunk/cppguide.xml
- http://www.literateprogramming.com/nrad.pdf
- http://pst.web.cern.ch/PST/HandBookWorkBook/Handbook/Programming/CodingStandard/c++standard.pdf
- http://1code.codeplex.com/releases/view/84683

__Contributions by:__ Veerabadran Chandrasekaran, Li Mengran, Loke Yan Hao, Vaarnan Drolia, Zhang Zhongwei
