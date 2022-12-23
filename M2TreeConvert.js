
/*
Input: a string of math text
Output: the corresponding parsed tree
Description: A function to parse math text to a tree

2022.10.12 created, only works for simple equation with operators at this stage.
2022.10.14 modify: replace id into position, add parenthese recursive parsing, refine structures
2022.10.21 modify: improve search: do not split keyword if it ends with letter and directly followed by letter
2022.10.25 modify: improve case that no-space and spaced operators are mixed (like 1 / 3+3 - 3)
2022.10.31 modify: supports functions with extra argument (root, frac)
2022.11.02 modify: supports pair up function (improve the hard coded part latter), improve script treatment
2022.11.04 modify: supports params for better supoort of sentence structures.
*/
function M2TreeConvert(str,params){
    let tree = new Tree(0,str);
    let exParam = "";
    let currentNode = tree.root;
    let inLoop = true;
    let stackedTreeNode = undefined;
    let extraArgument = []; //number of extra requirement of stack push that need to be fulfilled (see root)
    let response = {}; //response to the params
    while (inLoop){
        let fullStr = currentNode.value;
        let startKey = 0; // denote start of keyword
        let startCounter = 0; //start of string which may contain keyword
        let counter = 0;
        let key = undefined;
        let keyType = undefined;
        while (fullStr.length > counter){
            let char = fullStr[counter];
            let endSearch = false;
            let breakSearch = false;
            for (let quote of [["\"","\""],["\'","\'"]]){
                if (char == quote[0]){
                    let rpos = findPositionOfRightPair(fullStr,counter,quote[0],quote[1],[[quote[0]]]);
                    if (rpos != -1){ 
                        let children = [fullStr.substring(0,counter), fullStr.substring(counter+1,rpos), fullStr.substring(rpos+1)];
                        currentNode.value = "";
                        let qNode = new TreeNode(0,"\\text{"+children[1]+"}");
                        qNode = combinePrev(children[0],qNode); // there are something before the pair, consider multiplication/compositio
                        stackedTreeNode = stackNode(stackedTreeNode, qNode); // put the symbol node on the stack

                        if (extraArgument.length > 0){ // treat space differently if we run into extra argument case
                            stackedTreeNode.key = extraArgument[0][0].children[0].key;
                            let lastNode = extraArgument[0][0].children.pop();
                            extraArgument[0][0].insertNode(stackedTreeNode);
                            extraArgument[0][0].insertNode(lastNode);
                            extraArgument[0][1]--;
                            if (extraArgument[0][1] == 0){
                                extraArgument.shift();
                            }
                            stackedTreeNode = undefined;
                        }
                        
                        fullStr = fullStr.substring(rpos+1);
                        funcStr = ""; 
                        counter = 0;
                        startCounter = 0;
                        key = undefined;
                        keyType = undefined; //reset states;
                        endSearch = true;
                    }
                }
            }

            if (isLeftPair(char)){
                let rpos = findPositionOfRightParenthese(fullStr,counter);
                if (rpos != -1){ 
                    let children = [fullStr.substring(0,counter), fullStr.substring(counter+1,rpos), fullStr.substring(rpos+1)];
                    currentNode.value = "";
                    let pNode = M2TreeConvert(children[1].trim(),params)[0].root;
                    pNode.pair.push([char,fullStr[rpos]]);
                    pNode = combinePrev(children[0],pNode); // there are something before the pair, consider multiplication
                    stackedTreeNode = stackNode(stackedTreeNode, pNode); // put the symbol node on the stack

                    if (extraArgument.length > 0){ // treat space differently if we run into extra argument case
                        stackedTreeNode.key = extraArgument[0][0].children[0].key;
                        let lastNode = extraArgument[0][0].children.pop();
                        extraArgument[0][0].insertNode(stackedTreeNode);
                        extraArgument[0][0].insertNode(lastNode);
                        extraArgument[0][1]--;
                        if (extraArgument[0][1] == 0){
                            extraArgument.shift();
                        }
                        stackedTreeNode = undefined;
                    }
                        
                    fullStr = fullStr.substring(rpos+1);
                    funcStr = ""; 
                    counter = 0;
                    startCounter = 0;
                    key = undefined;
                    keyType = undefined; //reset states;
                    endSearch = true;
                }
            }

            if (char == "<" && fullStr[counter+1] != " "){
                let rpos = findPositionOfRightAngle(fullStr,counter);
                if (rpos != -1){ 
                    let children = [fullStr.substring(0,counter), fullStr.substring(counter+1,rpos), fullStr.substring(rpos+1)];
                    currentNode.value = "";
                    let pNode = M2TreeConvert(children[1].trim(),params)[0].root;
                    pNode.pair.push(["\\langle ","\\rangle "]);
                    pNode = combinePrev(children[0],pNode); // there are something before the pair, consider multiplication
                    stackedTreeNode = stackNode(stackedTreeNode, pNode); // put the symbol node on the stack

                    if (extraArgument.length > 0){ // treat space differently if we run into extra argument case
                        stackedTreeNode.key = extraArgument[0][0].children[0].key;
                        let lastNode = extraArgument[0][0].children.pop();
                        extraArgument[0][0].insertNode(stackedTreeNode);
                        extraArgument[0][0].insertNode(lastNode);
                        extraArgument[0][1]--;
                        if (extraArgument[0][1] == 0){
                            extraArgument.shift();
                        }
                        stackedTreeNode = undefined;
                    }
                        
                    fullStr = fullStr.substring(rpos+1);
                    funcStr = ""; 
                    counter = 0;
                    startCounter = 0;
                    key = undefined;
                    keyType = undefined; //reset states;
                    endSearch = true;
                }
            }

            let j = startCounter;
            for (let j = startCounter; j <= counter; j++){
                if (fullStr[counter+1] && fullStr[counter].match(/[A-Za-z]/g) && fullStr[counter+1].match(/[A-Za-z]/g)){
                    continue; //we do not split keyword if it ends with letter and directly followed by letter
                }
                let subStr = fullStr.substring(j,counter+1);
                let type = getType(fullStr,subStr,counter,stackedTreeNode);
                if (type){
                    key = subStr;
                    startKey = j;
                    keyType = type;
                    breakSearch = true;
                    break;
                }
                if (subStr == " " && (counter >= 1 || (currentNode.parent && currentNode.parent.children.length == 2 && currentNode.position == 1) || stackedTreeNode) && !containOperatorOrRelationPure(findNextWord(fullStr,counter))){
                    key = subStr;
                    startKey = j;
                    keyType = "space";
                    breakSearch = true;
                    break;
                }
            }
            if (breakSearch){
                break;
            }
            if (!endSearch){
                counter++;
                if (char.match(/[\s\d]/g)){ //we won't have number/space in keyword, so we can eliminate the possibility of happen a keyword on the left.
                    startCounter = counter;
                }
            }
        }
        if (key){ // found a key in the value of the currentNode;
            if (!dictionary[key] && key != " " && key !=""){
                key = translateTable.getItem(key)// translate the key if it is not directly in the dictionary;
            }
            
            let splitStr;
            let leftNode;
            let keyNode;
            let rightNode;
            switch (keyType){
                case "space":
                case "operator": //operators
                case "relation": //relations
                    splitStr = [fullStr.substring(0,startKey), key, fullStr.substring(counter+1)];
                    if (keyType == "relation" && params.includes("&beforeFirstRelation") && !response["&beforeFirstRelation"]){
                        response["&beforeFirstRelation"] = true;
                        splitStr[2] = "&" + splitStr[2];
                    }
                    leftNode = new TreeNode(0,splitStr[0],key);
                    keyNode = new TreeNode(0,splitStr[1],key);
                    rightNode = new TreeNode(0,splitStr[2],key);
                    if (stackedTreeNode){ // we have a stackedTreeNode 
                        stackedTreeNode = combineAfter(leftNode.value,stackedTreeNode); // there are something before the pair, consider multiplication
                        leftNode = stackedTreeNode;
                        leftNode.key = key;
                        stackedTreeNode = undefined;
                    }

                    if (keyType == "space" && extraArgument.length > 0){ // treat space differently if we run into extra argument case
                        currentNode.value = splitStr[0];
                        rightNode.key = extraArgument[0][0].children[0].key;
                        extraArgument[0][0].insertNode(rightNode);
                        currentNode = extraArgument[0][0].children[extraArgument[0][0].children.length - 1];
                        extraArgument[0][1]--;
                        if (extraArgument[0][1] == 0){
                            extraArgument.shift();
                        }
                        break;
                    }

                    let validPriority = true;
                    if ((isRelationPure(key) || isOperatorPure(key)) && ((keyType != "space" && splitStr[0].length == 0) || fullStr[startKey - 1]) && fullStr[counter + 1] && fullStr[startKey - 1] != " " && fullStr[counter + 1] != " "){
                        validPriority = false;
                    }
                    let keyPriority = getPriority(key);
                    let hasSpace = false; // record the spacing in script case
                    if (keyType != "space"){
                        if (dictionary[key].script){
                            keyPriority -= 0.1;
                            if (validPriority){
                                hasSpace = true;
                                leftNode.exPriority = true;
                                keyNode.exPriority = true;
                                rightNode.exPriority = true;
                            }
                            if (!validPriority){ // && isScriptPure(currentNode.key)
                                validPriority = true; // treat no space specially with multi scripts
                            }
                            if (checkScriptSimilarity(currentNode,key)){
                                validPriority = false;
                            }
                        }
                    }

                    let exPriority = 0;
                    if (currentNode.exPriority && !hasSpace){
                        exPriority += 0.2;
                    }
                    if (validPriority && (currentNode.noPriority || keyPriority + exPriority < getPriority(currentNode.key))){ // the new key has a higher priority, need to split string
                        let solved = false;
                        currentNode.value = leftNode.value;
                        currentNode.children = leftNode.children;
                        currentNode.pair = leftNode.pair;
                        currentNode.exPriority = leftNode.exPriority;
                        currentNode.noPriority = leftNode.noPriority;
                        while (currentNode.parent){
                            let lastNodePos = currentNode.position;
                            currentNode = currentNode.parent;
                            exPriority = 0;
                            if (!hasSpace){
                                for (let c of currentNode.children){
                                    if (c.exPriority){
                                        exPriority += 0.2;
                                        break;
                                    }
                                }
                            }
                            if (!currentNode.children[0].noPriority && keyPriority + exPriority >= getPriority(currentNode.children[0].key)){
                                let lastNode = currentNode.children[lastNodePos];
                                let newNode = new TreeNode(lastNodePos,null,currentNode.children[0].key);
                                newNode.noPriority = currentNode.children[lastNodePos].noPriority;
                                newNode.exPriority = currentNode.children[lastNodePos].exPriority;
                                currentNode.children[lastNodePos] = newNode;
                                newNode.parent = currentNode;
                                newNode.insertNode(lastNode);
                                lastNode.key = key;
                                lastNode.noPriority = keyNode.noPriority; // set them with same no priority
                                lastNode.exPriority = keyNode.exPriority; // set them with same ex priority
                                
                                //newNode.insertNode(leftNode);
                                newNode.insertNode(keyNode);
                                newNode.insertNode(rightNode);

                                currentNode = newNode.children[2];
                                solved = true;
                                break;
                            }
                        }
                        if (!solved){ //this mean we should reach the root level
                            let newroot = new TreeNode(0,"");
                            tree.root.key = key;
                            newroot.insertNode(tree.root);
                            newroot.insertNode(keyNode);
                            newroot.insertNode(rightNode);
                            tree.root = newroot;
                            currentNode = tree.root.children[2];
                        }   
                    } else {
                        if (!validPriority){
                            leftNode.noPriority = true;
                            keyNode.noPriority = true;
                            rightNode.noPriority = true;
                        }
                        currentNode.value = "";
                        currentNode.insertNode(leftNode);
                        currentNode.insertNode(keyNode);
                        currentNode.insertNode(rightNode);
                        currentNode = currentNode.children[2];
                    }
                    break; //break case

                case "function": //functions
                    splitStr = [fullStr.substring(0,startKey), key, fullStr.substring(counter+1)];
                    if (splitStr[2][0] == " "){
                        splitStr[2] = splitStr[2].substring(1)
                    }
                    leftNode = new TreeNode(0,splitStr[0],key);
                    keyNode = new TreeNode(0,splitStr[1],key);
                    rightNode = new TreeNode(0,splitStr[2],key);
                    if (stackedTreeNode){ // we have a stackedTreeNode 
                        stackedTreeNode = combinePrev(leftNode.value,stackedTreeNode); // there are something before the pair, consider multiplication
                        leftNode = stackedTreeNode;
                        leftNode.key = key;
                        stackedTreeNode = undefined;
                    }
                    
                    let funcNode = new TreeNode;
                    funcNode.value = "";
                    funcNode.insert(key,key);
                    rightNode.key = key;
                    if (dictionary[key].pairedArgument){
                        let rpos = findPositionOfRightPair(fullStr,startKey,key,dictionary[key].pairedArgument,dictionary[key].family);
                        if (rpos != -1){ 
                            let splitR = [fullStr.substring(counter+1,rpos), fullStr.substring(rpos+1)];
                            let rightNode1 = M2TreeConvert(splitR[0].trim(),params)[0].root;
                            let rightNode2 = new TreeNode(0,splitR[1],key);
                            funcNode.insertNode(rightNode1);
                            funcNode.insertNode(rightNode2);
                        } else {
                            funcNode.insertNode(rightNode);
                        }
                    } else {
                        funcNode.insertNode(rightNode);
                    }
                    
                    let cNode = currentNode;
                    currentNode = funcNode.children[funcNode.children.length - 1];
                    if (leftNode.value.length > 0){
                        funcNode = combinePrevNode(leftNode,funcNode); // there are something before the pair, consider multiplication
                    }
                    
                    funcNode.value = "";
                    if (cNode.parent){
                        funcNode.key = cNode.parent.children[cNode.position].key;
                        funcNode.position = cNode.position;
                        funcNode.parent = cNode.parent;
                        cNode.parent.children[cNode.position] = funcNode;
                    } else {
                        tree.root = funcNode;
                        //it is the root
                    }

                    if (dictionary[key] && dictionary[key].extraArgument){
                        extraArgument.push([funcNode,dictionary[key].extraArgument]); //note if we need extra nodes than ordinary
                    }

                    break;
                case "symbol": //symbols
                    splitStr = [fullStr.substring(0,startKey), key, fullStr.substring(counter+1)];
                    let symbolNode = new TreeNode;
                    symbolNode.value = "";
                    symbolNode.insert(key,key);
                    symbolNode = combinePrev(splitStr[0],symbolNode); // there are something before the pair, consider multiplication
                    stackedTreeNode = stackNode(stackedTreeNode, symbolNode); // put the symbol node on the stack

                    if (extraArgument.length > 0){ // treat space differently if we run into extra argument case
                        stackedTreeNode.key = extraArgument[0][0].children[0].key;
                        let lastNode = extraArgument[0][0].children.pop();
                        extraArgument[0][0].insertNode(stackedTreeNode);
                        extraArgument[0][0].insertNode(lastNode);
                        extraArgument[0][1]--;
                        if (extraArgument[0][1] == 0){
                            extraArgument.shift();
                        }
                        stackedTreeNode = undefined;
                    }

                    currentNode.value = splitStr[2];
                    break;
                 case "multiline":
                    splitStr = [fullStr.substring(0,startKey), key, fullStr.substring(counter+1)];
                    let mNode = new TreeNode(0,splitStr[0]);
                    stackedTreeNode = stackNode(stackedTreeNode, mNode); // put the symbol node on the stack
                    currentNode.value = splitStr[2];
                    exParam = key;
                    break;
            }
        } else {
            if (stackedTreeNode){ //left with some undealt pair
                if (fullStr.trim()!=""){
                    let tempNode = new TreeNode;
                    stackedTreeNode.key = "";
                    tempNode.insertNode(stackedTreeNode);
                    tempNode.insert("","");
                    tempNode.insert(fullStr,"");
                    stackedTreeNode = tempNode;
                }
                //stackedTreeNode = combineAfter(fullStr,stackedTreeNode); // there are something before the pair, consider multiplication
                let cpos = currentNode.position;
                stackedTreeNode.position = cpos;
                stackedTreeNode.key = currentNode.key;
                if (currentNode.parent){
                    stackedTreeNode.parent = currentNode.parent;
                    currentNode.parent.children[cpos] = stackedTreeNode;
                } else {
                    tree.root = stackedTreeNode;
                }
            }
            inLoop = false;
            break;
        }
    }
    return [tree,exParam,response];
}

/*
Description: put a node on the stack. If we already have something on stack then multiply them.
Arguments: the current stackedTreeNode and the node to be put on the stack.
return: the new stackedTreeNode
2022.10.26 created;
*/
function stackNode(stackedTreeNode, pNode){
    if (stackedTreeNode){ //already exists a node in stack, so they should be multiplied/composited
        let tempNode = new TreeNode;
        stackedTreeNode.key = "";
        tempNode.insertNode(stackedTreeNode);
        tempNode.insert("","");
        pNode.key = "";
        tempNode.insertNode(pNode);
        stackedTreeNode = tempNode;
    } else {
        stackedTreeNode = pNode;
    }
    return stackedTreeNode;
}

/*
Description: do multiplication for leftover previous info
Arguments: the previous info and the current holding node
return: the adjusted holding node
2022.10.26 created;
*/

function combinePrev(preVal,pNode){
    if (preVal.trim()!=""){ // there are something before the pair, consider multiplication
        let tempNode = new TreeNode;
        pNode.key = "";
        tempNode.insert(preVal,"");
        tempNode.insert("","");
        tempNode.insertNode(pNode);
        pNode = tempNode;
    }
    return pNode;
}

/*
Description: do multiplication for leftover previous info
Arguments: the previous info and the current holding node
return: the adjusted holding node
2022.10.26 created;
*/

function combinePrevNode(preNode,pNode){
    preNode.insert("","");
    preNode.insertNode(pNode);
    return preNode;
}


/*
Description: do multiplication for leftover after info
Arguments: the previous info and the current holding node
return: the adjusted holding node
2022.10.26 created;
*/

function combineAfter(followingVal,pNode){
    if (followingVal.trim()!=""){ // there are something before the pair, consider multiplication
        let tempNode = new TreeNode;
        pNode.key = "";
        tempNode.insertNode(pNode);
        tempNode.insert("","");
        tempNode.insert(followingVal,"");
        pNode = tempNode;
    }
    return pNode;
}

/*
Description: function to detect if we have a keyword and returns its type
Arguments: the whole string, the current word, and the position of the end of the word
return: the type of the keyword, or undefined if it is not a keyword
2022.10.12 created, 
2022.10.17 abstractized
2022.10.19 modified to check if in a longer keyword
2022.10.26 combined into one function
2022.11.14 add parameter such that some operators are only detected if it have a nonempty left argument (i.e. tell difference between minus and negative sign-)
*/
function getType(str,key,pos,stackedTreeNode){
    let keyword = getKeyword(key);

    if (keyword && !containedInKeyword(str,key,pos)){
        if (keyword["mustHaveLeftArgument"] && pos == 0 && !stackedTreeNode){
            return undefined;
        }
        return keyword.type;
    } else {
        return undefined;
    }
}

/*
Description: function to get keyword
2022.10.19 created, 
*/
function getKeyword(key){
    if (dictionary[key]){
        return dictionary[key];
    } else {
        key = translateTable.getItem(key);
        if (key == -1){
            return undefined;
        } else {
            return dictionary[key];
        }
    }
    
}

/*
Description: function to detect left parenthese
2022.10.14 created, 
*/
function isLeftPair(key){
    return ["(","[","{"].includes(key);
}

/*
Description: function to tell the corresponding right parenthese based on the left one
2022.10.14 created, 
*/

function getRightPair(key){
    switch (key){
        case "(":
            return ")";
        case "[":
            return "]";
        case "{":
            return "}";
    }
}

/*
Description: function to detect operators
2022.10.19 created, 
*/
function isOperatorPure(key){
    let keyWord = getKeyword(key);
    return keyWord && keyWord.type == "operator";
}

/*
Description: function to detect sup/subscripts
2022.11.02 created, 
*/
function isScriptPure(key){
    let keyWord = getKeyword(key);
    return keyWord && keyWord.script;
}

/*
Description: function to detect operators containment
2022.10.20 created, 
2022.11.04 modified.
*/
function containOperatorOrRelationPure(key){
     for (let j = 1; j <= key.length; j++){
        let subStr = key.substring(0,j);
        if (isOperatorPure(subStr) || isRelationPure(subStr)){
            return true;
        }
     }
     return false;
}


/*
Description: function to detect relations
2022.10.19 created, 
*/
function isRelationPure(key){
    let keyWord = getKeyword(key);
    return keyWord && keyWord.type == "relation";
}

/*
Description: function to detect operators or spaces
2022.10.19 created,
*/
function isOperatorRelationPure(key){
    return isOperatorPure(key) || isRelationPure(key);
}


/*
Description: function to detect operators or spaces
2022.10.12 created, 
2022.10.19 modified to match with changes.
*/
function isOperatorRelationOrSpace(key){
    return isOperatorPure(key) || isRelationPure(key) || [" ",""].includes(key);
}

/*
Description: function to tell the priority of operators/symbols
2022.10.12 created, 
2022.10.17 abstractized
*/

function getPriority(key){
    let keyWord = getKeyword(key);
    switch (key){
        case " ":
        case "":
            return 19;
        default:
            if (keyWord){
                return keyWord.priority;
            } else {
                return 999;
            }
    }
}

/*
Description: given a string, a position of the left parenthese, find the position of the paired up right parenthese (regardless of type).
2022.10.19 created, 
2022.11.1 be the function to detect paired parentheses
*/

function findPositionOfRightParenthese(str, pos) {
  if (!["(","[","{"].includes(str[pos])) {
    throw new Error("No" + lp + " at index " + pos);
  }
  let depth = 1;
  for (let i = pos + 1; i < str.length; i++) {
    switch (str[i]) {
    case "(":
    case "[":
    case "{":
      depth++;
      break;
    case ")":
    case "]":
    case "}":
      if (--depth == 0) {
        return i;
      }
      break;
    }
  }
  return -1;    // No matching closing parenthesis
}

/*
Description: given a string, a position of a <, find the position of the paired up >.
2022.11.9 created, 
*/

function findPositionOfRightAngle(str, pos) {
  if (!["<"].includes(str[pos] || [" "].includes(str[pos+1]))) {
    throw new Error("No" + lp + " at index " + pos);
  }
  let depth = 1;
  for (let i = pos + 1; i < str.length; i++) {
    if (str[i] == "<" && str[i+1]!=" "){
        depth++;
    }
    if (str[i] == ">" && str[i-1]!=" "){
      if (--depth == 0) {
        return i;
      }
    }
  }
  return -1;    // No matching closing parenthesis
}


/*
Description: given a string, a position of the left func and its family (who uses the same right pair), find the position of the paired up right pair (regardless of type).
2022.11.1 modified to this state
*/
function findPositionOfRightPair(str, pos, lp, rp, family) {
  if (str.substring(pos,pos+lp.length) != lp) {
    throw new Error("No " + lp + " at index " + pos + " of " + str);
  }
  let depth = 1;
  for (let i = pos + 1; i < str.length; i++) {
    if (str.substring(i,i+rp.length) == rp) {
      if (--depth == 0) {
        return i;
      }
    }
    for (let s of family){
      if (str.substring(i,i+s.length) == s && str[i-1].match(/[\s\d]/g)) {
         depth++;
      }
    }
  }
  return -1;    // No matching closing pair
}

/*
Description: given a string, a position of the space, get all the contents till the next space (or end of string)).
2022.10.19 created, 
*/

function findNextWord(str, pos) {
  let content = "";
  for (let i = pos + 1; i < str.length; i++) {
    switch (str[i]) {
    case "\n":
    case " ":
      break;
    default:
        content += str[i];
    }
  }
  return content;
}

/*
Description: given a string, the current keyword, the position of the end of the keyword, check if we can find a longer keyword).
2022.10.19 created, 
*/

function containedInKeyword(str, key, pos) {
  let content = "";
  for (let i = pos + 1; i < str.length; i++) {
      if (str[i].match(/[\s\d]/g)){
        break;
      } else {
         key += str[i];
        if (getKeyword(key)){
            return true;
        }
      }
  }
  return false;    // No matching longer keyword
}

/*
Description: given a node and key, check if there are same key in the approachable nodes of the currentNode (not touching parentheses).
Return true is a key in approachable path with same name is detected.
2022.11.2 created, 
*/

function checkScriptSimilarity(node, key) {
  if (node.pair.length > 0){
      return false;
  }
  if (node.parent && node.parent.exPriority){
      return false;
  }
  let tempNode = node;
  while (tempNode.parent){
     tempNode = tempNode.parent;
     if (tempNode.pair.length > 0){
         break;
     }
     if (node.parent && node.parent.exPriority){
        break;
     }
     if (tempNode.key == key){
         return true;
     }

  }
  tempNode = node.parent;
  while (tempNode && tempNode.children[0]){
     tempNode = tempNode.children[0];
     if (tempNode.pair.length > 0){
         break;
     }
     if (node.parent && node.parent.exPriority){
        break;
     }
     if (tempNode.key == key){
         return true;
     }
  }
  return false;    // No matching keyword found
}