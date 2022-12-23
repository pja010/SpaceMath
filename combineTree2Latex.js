/*
Input: a translated tree
Output: corresponding Latex
Description: A function to call combine method in tree root to get the latex string

2022.10.12 created, only works for simple equation with operators at this stage.
*/
function combineTree2Latex(tree,params){
	tree.root.combine(params);
	let latexString = tree.root.value;
	//while (latexString.includes("#end?")){
	//	latexString = latexString.replace(/#end\?\[(((?!#)\S)*)\&(((?!#)\S)*)\](.+?)/, "$3$5");
	//	latexString = latexString.replace(/#end\?\[(((?!#)\S)*)\&(((?!#)\S)*)\]$/, "$1");
	//}
	return latexString;
}