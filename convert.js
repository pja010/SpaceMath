/*
Input: the user input, type of conversion: Latex, MathJax
Output: the corresponding Latex string of the user input
Description: the major abstract function which takes the user input and return the supposed output

2022.10.07 created
2022.10.25 refined to support MathJax
2022.10.26 add type to support both cases
*/
function convert(str,type) {
  str = str.replaceAll('\\$', '%24%'); //replacement on all special characters, Using HTML UTF conversion here (see https://www.w3schools.com/tags/ref_urlencode.ASP)
  str = trimSpaces(str); //trim down all multiple spaces into one space
  if (type == "LaTeX2MathJax"){
       str = convertLaTeX2MathJax(str,0);
  } else {
      str = convert2(str,0); // use BNF grammar to split text and math, then combine them
  }
  
  str = str.replaceAll('%24%', '\\$'); //put the special characters back
  return str;
}

/*
Input: 
str: user input after spaces are trimmed
p: an integer indicating which deliminator should be check next

Output: the corresponding Latex string of the user input
Description: use BNF grammar to split user input into text and math part, call M2LConvert to transform the math part, then combine them and return the final string.

2022.10.07 created
            currently based on symmetry of deliminators
            rule1 : isolated deliminators will be ignored
            rule2 : deliminators with lower priority inside ones with higher priority will be ignored
2022.10.26 modified to support none-symmetry shape.
2022.10.28 modified to support case when user types one half of deliminator
*/
function convert2(str,p) {
  let splitStr = [];
  let newStr = "";
  let deliminators = [["\\[","\\]"],["$$","$$"],["\\(","\\)"],["$","$"]]; //all tokens that will be seen as math mode, in priority (left to right)
  if (p >= deliminators.length){
    return str; // if we already checked all deliminators, just return the original string
  }
  let d = deliminators[p];

  let counter = 0;
  while (str.substring(counter,counter + d[0].length) != d[0] && str.length > counter + d[0].length){
      counter++;
  }
  if (str.substring(counter,counter + d[0].length) != d[0]){
      p += 1;
      return convert2(str,p);
  } else {
      let right = findPositionOfRightPairConvert(str, counter, d[0],d[1]);
      if (right > 0){
          let convertedStr = str.substring(counter+d[0].length,right); // the part that need to be converted (math)
          for (let j = p; j < deliminators.length; j++){
            convertedStr = convertedStr.replaceAll(deliminators[j][0], ''); 
            convertedStr = convertedStr.replaceAll(deliminators[j][1], ''); // removed all lower priority deliminators
          }
          convertedStr = M2LConvert(convertedStr,d[0],d[1]);
          convertedStr = d[0] + convertedStr + d[1];
          convertedStr = convertedStr.replaceAll(d[0]+d[1],"");
          return convert2(str.substring(0,counter),p+1) + convertedStr + convert2(str.substring(right+d[1].length),p);
      } else {
          p += 1;
          return convert2(str,p);
      }
      
  }
}

/*
Input: 
str: a Latex string
p: an integer indicating which deliminator should be check next

Output: the corresponding MathJax output
Description: use BNF grammar to split user input into text and math part, call M2LConvert to transform the math part, then combine them and return the final string.

2022.10.07 created
            currently based on symmetry of deliminators
            rule1 : isolated deliminators will be ignored
            rule2 : deliminators with lower priority inside ones with higher priority will be ignored
*/
function convertLaTeX2MathJax(str,p) {
  let splitStr = [];
  let newStr = "";
  let deliminators = [["\\[","\\]"],["$$","$$"],["\\(","\\)"],["$","$"]]; //all tokens that will be replaced, in priority (left to right)
  let newdeliminators = [["\\[","\\]"],["\\[","\\]"],["\\(","\\)"],["\\(","\\)"]]; //all tokens that will be replaced, in priority (left to right)
  if (p >= deliminators.length){
    return str.replaceAll("\n","<br>"); // if we already checked all deliminators, just return the original string with lineswitch replacement
  }
  let d = deliminators[p];
  let nd = newdeliminators[p];

  let counter = 0;
  while (str.substring(counter,counter + d[0].length) != d[0] && str.length > counter + d[0].length){
      counter++;
  }
  if (str.substring(counter,counter + d[0].length) != d[0]){
      p += 1;
      return convertLaTeX2MathJax(str,p);
  } else {
      let right = findPositionOfRightPairConvert(str, counter, d[0],d[1]);
      if (right > 0){
          let innerStr = str.substring(counter+d[0].length,right); // the part that need to be converted (math)
          innerStr = nd[0] + innerStr + nd[1];
          return convertLaTeX2MathJax(str.substring(0,counter),p+1).replaceAll("\n","<br>") + innerStr.replaceAll("\\\\\n","\\\\").replaceAll("\n","\\\\") + convertLaTeX2MathJax(str.substring(right+d[1].length),p);
      } else {
          p += 1;
          return convertLaTeX2MathJax(str,p);
      }
      
  }
}

/*
Input: a string of user input
Output: the string with multiple spaces trimmed into one
Description: trim multiple spaces in a string into one.

2022.10.07 created
*/
function trimSpaces(str){
    return str.replace(/  +/g, ' ');
}

/*
cited:https://codereview.stackexchange.com/questions/179471/find-the-corresponding-closing-parenthesis
Description: given a string, a position of the left parenthese, the left and right parenthese, find the position of the paired up right parenthese.
2022.10.14 created, 
2022.10.26 support multi digit search, moved to convert
*/

function findPositionOfRightPairConvert(str, pos, lp, rp) {
  if (str.substring(pos,pos+lp.length) != lp) {
    throw new Error("No" + lp + " at index " + pos);
  }
  for (let i = pos + 1; i < str.length; i++) {
    switch (str.substring(i,i+rp.length)) {
    case rp:
      return i;
      break;
    }
  }
  return -1;    // No matching closing parenthesis
}