/*
Input: a string of math text
Output: the corresponding Latex string of that math text
Description: A helper function which generalize several steps to take the original Spacemath input into corresponding Latex output.

2022.10.07 created, only trivial return of test need is done at this stage.
2022.10.12 test method for M2Tree;
2022.11.02 deal with sentence structure & indent
2022.11.04 compatibility with sentence structure: add in new arguments lp,rp for the left/right pair of delimiters.
2022.11.14 add a preprocessing to transfer inline structures to multiline form
*/
function M2LConvert(str,lp,rp){
    //preprocessing for inline structure
    for (let key of translateTable.getAllMultiLine()) { // iterate through dictionary
        let index = str.indexOf(key.slice(0, -1)+"(");
        while (index != -1){
            let rpos = findPositionOfRightPairConvert(str,index + key.length - 1, "(",")");
            if (rpos != -1){
                let splitStr = [str.substring(0,index),str.substring(index + key.length,rpos),str.substring(rpos+1)];
                newMiddleStr = key + "\n ";
                if (dictionary[key]["emptyLineBeforeIndent"]){
                    newMiddleStr += splitStr[1].replaceAll(";","\n\n ");
                    newMiddleStr += "\n";
                } else {
                    newMiddleStr += splitStr[1].replaceAll(";","\n ");
                }
                
                str = splitStr[0] + newMiddleStr + splitStr[2];
                index = str.indexOf(key.slice(0, -1)+"(");
            } else {
                continue;
            }
        }
    }

    //remove backslash and space derivatives
    //this may pollutes some of the keyword containing \\, maybe we should save them before the transformation
    str = str.replaceAll("\\,","");
    str = str.replaceAll("\\:","");
    str = str.replaceAll("\\;","");
    str = str.replaceAll("\\!","");
    str = str.replaceAll("\\","");

    let splitStr = str.split("\n");
    let latexStr = "";
    let paramStack = [];
    let lastLine = "";
    while (splitStr.length > 0){
        let params = [];
        if (paramStack[0] && dictionary[paramStack[0]].params){
            params = dictionary[paramStack[0]].params;
        }
        let temp = M2TreeConvert(splitStr[0],params);
        let tree = temp[0];
        let exParam = temp[1];
        let response = temp[2];
        let latexLine = combineTree2Latex(tree,params);
        if (splitStr.length > 0 && exParam.length == 0){
            if (paramStack.length > 0 && ((!dictionary[paramStack[0]].absorbEmptyLine) || splitStr[0].trim().length > 0)){
                if ((dictionary[paramStack[0]].absorbEmptyLine && splitStr.length > 1 && splitStr[1].trim().length > 0) || (splitStr.length == 2 && splitStr[1].trim().length == 0) || splitStr.length == 1){
                    // do nothing
                } else{
                    if (dictionary[paramStack[0]].changeLineTurn){
                        latexLine += dictionary[paramStack[0]].changeLineTurn + "\n";
                    } else {
                        latexLine += "\\\\\n";
                    }
                }
                
                // treating cases where response show some requirements are not fulfilled
                if (dictionary[paramStack[0]].params && dictionary[paramStack[0]].params.includes("&beforeFirstRelation") && !response["&beforeFirstRelation"] && lastLine.trim().length == 0){
                    latexLine = "& \\;" + latexLine;
                }
            } else {
                if (splitStr.length > 1){
                    if (dictionary[paramStack[0]] && dictionary[paramStack[0]].absorbEmptyLine && splitStr[0].trim().length == 0){

                    } else {
                        latexLine += "\n";
                    }
                }
            }
        }
        lastLine = splitStr[0];
        splitStr.shift();
        if (dictionary[exParam]){
            if (dictionary[exParam].seperateOut){
                latexLine += rp;
            }
            if (dictionary[exParam].noBeginEnd){
                latexLine += dictionary[exParam].note+"{";
            } else {
                latexLine += "\\begin{"+dictionary[exParam].note+"}";
            }
            
            paramStack.push(exParam);
        }

        if (paramStack.length > 0 && splitStr[0] && splitStr[0][0] != " "){
            if (!dictionary[paramStack[0]].emptyLineBeforeIndent || (lastLine.trim().length == 0)){
                if (dictionary[paramStack[0]].noBeginEnd){
                    latexLine += "}";
                } else {
                    latexLine += "\\end{"+dictionary[paramStack[0]].note+"}";
                }
                
                if (dictionary[paramStack[0]].lineBreak){
                    latexLine += "\n";
                }
                if (dictionary[paramStack[0]].seperateOut){
                    latexLine += lp;
                }
                paramStack.shift();
            }
        } //no indent
        latexStr += latexLine;

    }
    while (paramStack.length > 0){
        if (dictionary[paramStack[0]].noBeginEnd){
            latexStr += "}";
        } else {
            latexStr += "\\end{"+dictionary[paramStack[0]].note+"}";
        }
        if (dictionary[paramStack[0]].seperateOut){
            latexStr += lp;
        }
        paramStack.shift();
    } //no indent
    return trimSpaces(latexStr);
}