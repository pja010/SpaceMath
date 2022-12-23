function convert(str) {
  return trimSpaces(str);
  let splitedLine = str.split('\n');
  let newLineStr = "";
  for (let sl of splitedLine){
    let splited = sl.split(' ');
    let newstring = "";
    for (let s of splited){
      newstring += plusminus(s);
    }
    newLineStr += newstring + "\n";
  }

  return newLineStr;
}
function trimSpaces(str){
    return str.replace(/\s\s+/g, ' ');
}
function plusminus(str){
  for (let sym of ['+','-']){
    if (str.includes(sym)){
      let splited = str.split(sym);
      let newstring = plusminus(splited[0]) + sym + plusminus(splited[1]);
      return newstring;
    }
  }
  return multidivision(str);
}

function multidivision(str){
  if (str.includes("*")){
    let splited = str.split("*");
    let newstring = multidivision(splited[0])+" \\cdot "+multidivision(splited[1]);
    return newstring;
  }
  if (str.includes("/") && str.split("/")){
    let splited = str.split("/");
    let newstring = "\\frac{"+multidivision(splited[0])+"}{"+multidivision(splited[1])+"}";
    return newstring;
  }
  return script(str);
}

function script(str){
  for (let sym of ['^','_']){
    if (str.includes(sym)){
      let splited = str.split(sym);
      let newstring = "";
      for (let i = 0; i < splited.length; i++){
        let s = splited[i];
        let t = script(s);
        if (i > 0 && t.length > 1){
          t = "{"+t+"}"
        }
        newstring += t;
        if (i < splited.length - 1){
          newstring += sym;
        }
      }
      return newstring;
    }
  }
  return map1(str);
}

function map1(str){
  const map = new Map();
  map.set("sin", "\\sin ");
  map.set("cos", "\\cos ");
  let iterator = map.keys();
  let temp;
  temp = iterator.next().value;
  let newstring = "";
  while (temp){
    if (str.includes(temp)){
      let splited = str.split(temp);
      for (let i = 0; i < splited.length; i++){
        let s = splited[i];
        let t = map1(s);
        newstring += t;
        if (i < splited.length - 1){
          newstring += map.get(temp);
        }
      }
    }
    temp = iterator.next().value;
    //iterator.next();
  }
  if (newstring == ""){
    return map2(str);
  } else {
    return map2(newstring);
  }
}

function map2(str){
  const map = new Map();
  map.set("le", "\\le");
  map.set('ge', "\\ge");

  if (map.has(str)){
    return " " + map.get(str) + " ";
  } else {
    return str;
  }
}
