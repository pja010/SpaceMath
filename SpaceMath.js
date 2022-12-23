/*
The js file for the test interface.

2022.09.27 created

2022.10.17 add global call
2022.10.25 add MathJax support
*/

"use strict";
let leftTextArea = document.getElementById("leftTextArea");
let rightTextArea = document.getElementById("rightTextArea");
let mathJaxArea = document.getElementById("MathJaxArea");

let translateTable = new TranslateTable();

///*
var dictionary;    
fetch("dictionary.json").then(
        function(u){ return u.json();}
      ).then(
        function(json){
          dictionary = json;
        }
      )
      //*/

if (leftTextArea.addEventListener) {
  leftTextArea.addEventListener('input', function() {
      rightTextArea.value = convert(leftTextArea.value,"SpaceMath2LaTeX");
      mathJaxArea.innerHTML = convert(rightTextArea.value,"LaTeX2MathJax");
      MathJax.Hub.Queue(["Typeset",MathJax.Hub,"MathJaxArea"]);
  }, false);
} else if (leftTextArea.attachEvent) {
  leftTextArea.attachEvent('onpropertychange', function() {
      rightTextArea.value = convert(leftTextArea.value,"SpaceMath2LaTeX");
      mathJaxArea.innerHTML = convert(rightTextArea.value,"LaTeX2MathJax");
      MathJax.Hub.Queue(["Typeset",MathJax.Hub,"MathJaxArea"]);
  });
}