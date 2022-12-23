var dictionary = 
{
  "+": {
    "comment": ["加"],
    "alternative": ["plus", "\u52a0"],
    "type": "operator",
    "priority": 10,
    "rule": {"2,3": "#1 + #3"}
  },
  "-": {
    "comment": ["减"],
    "alternative": ["minus", "subtracts", "\u51cf"],
    "type": "operator",
    "priority": 10,
    "mustHaveLeftArgument":true,
    "rule": {"2,3": "#1 - #3"}
  },
  "*": {
    "comment": ["乘"],
    "alternative": ["multiply", "\u4e58"],
    "type": "operator",
    "priority": 20,
    "rule": {"2,3": "#1 \\cdot #3"}
  },
  "/": {
    "comment": ["除, 除以"],
    "alternative": ["divides", "divide", "\u9664", "\u9664\u4ee5"],
    "type": "operator",
    "priority": 20,
    "rule": {"2,3": "\\frac{#1}{#3}"},
    "offpair": {"2,3": [1,3]}
  },
  "=": {
    "comment": ["等于"],
    "alternative": ["equal", "\u7b49\u4e8e"],
    "type": "relation",
    "priority": 0,
    "rule": {"2,3": "#1 = #3"}
  },
  "^": {
    "comment": ["到", "终止值", "次方"],
    "alternative": ["to", "\u5230", "\u7ec8\u6b62\u503c", "\u6b21\u65b9"],
    "type": "operator",
    "priority": 30,
    "script":true,
    "rule": {"2,3": "#1^#@3"},
    "offpair": {"2,3": [3]}
  },
  "_": {
    "comment": ["从", "初始值"],
    "alternative": ["from", "\u4ece", "\u521d\u59cb\u503c"],
    "type": "operator",
    "priority": 30,
    "script":true,
    "rule": {"2,3": "#1_#@3"},
    "offpair": {"2,3": [3]},
  },
  "^^": {
    "alternative": [],
    "type": "operator",
    "priority": 30,
    "script":true,
    "rule": {"2,3": "#{}^#@3 #1"},
    "offpair": {"2,3": [3]},
  },
  "__": {
    "alternative": [],
    "type": "operator",
    "priority": 30,
    "script":true,
    "rule": {"2,3": "#{}_#@3 #1"},
    "offpair": {"2,3": [3]},
  },
  "<": {
    "comment": ["小于"],
    "alternative": ["less than", "\u5c0f\u4e8e"],
    "type": "relation",
    "priority": 0,
    "rule": {"2,3": "#1 < #3"}
  },
  ">": {
    "comment": ["大于"],
    "alternative": ["greater than", "\u5927\u4e8e"],
    "type": "relation",
    "priority": 0,
    "rule": {"2,3": "#1 > #3"}
  },
  "\n": {
    "alternative": [""],
    "type": "relation",
    "priority": -10,
    "rule": {"2,3": "#1 \n #3"}
  },
  ",": {
    "alternative": [""],
    "type": "operator",
    "priority": -10,
    "rule": {"2,3": "#1,#3"}
  },
  ";": {
    "alternative": [""],
    "type": "operator",
    "priority": -10,
    "rule": {"2,3": "#1;#3"}
  },
   "|": {
    "alternative": [""],
    "type": "operator",
    "priority": -10,
    "rule": {"2,3": "#1 \\mid #3"}
  },
  "+-": {
    "comment": ["正负", "加减"],
    "alternative": ["plusminus","pm", "\u52a0\u51cf", "\u6b63\u8d1f"],
    "type": "operator",
    "priority": 10,
    "rule": {"2,3": "#1 \\pm #3"}
  },
  "alpha": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\alpha"}
  },
   "beta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\beta"}
  },
  "gamma": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\gamma"}
  },
  "Gamma": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Gamma"}
  },
  "delta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\delta"}
  },
  "Delta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Delta"}
  },
  "epsilon": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\epsilon"}
  },
  "varepsilon": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\varepsilon"}
  },
  "zeta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\zeta"}
  },
  "eta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\eta"}
  },
  "theta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\theta"}
  },
  "Theta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Theta"}
  },
  "vartheta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\vartheta"}
  },
  "iota": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\iota"}
  },
  "kappa": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\kappa"}
  },
  "lambda": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\lambda"}
  },
  "Lamda": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Lamda"}
  },
  "mu": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\mu"}
  },
  "nu": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\nu"}
  },
  "xi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\xi"}
  },
  "Xi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Xi"}
  },
  "pi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\pi"}
  },
  "Pi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Pi"}
  },
  "rho": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\rho"}
  },
  "sigma": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\sigma"}
  },
  "Sigma": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Sigma"}
  },
  "tau": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\tau"}
  },
  "upsilon": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\upsilon"}
  },
  "phi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\phi"}
  },
  "Phi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Phi"}
  },
  "varphi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\varphi"}
  },
  "chi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\chi"}
  },
  "psi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\psi"}
  },
  "Psi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Psi"}
  },
  "omega": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\omega"}
  },
  "Omega": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Omega"}
  },
  "del": {
    "alternative": ["partial"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\partial"}
  },
  "grad": {
    "alternative": ["nabla"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\nabla"}
  },
  "O/": {
    "alternative": ["emptyset"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\emptyset"}
  },
  "inf": {
    "comment": ["无穷大"],
    "alternative": ["infty", "infinity","oo", "\u65e0\u7a77\u5927"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\infty"}
  },
  "aleph": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\aleph"}
  },
  ":.": {
    "comment": ["所以"],
    "alternative": ["therefore", "thus","hence","\u6240\u4ee5"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\therefore"}
  },
  ":'": {
    "comment": ["因为"],
    "alternative": ["because", "since","\u56e0\u4e3a"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\because"}
  },
  "...": {
    "alternative": [""],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "#comma?[\\ldots&\\cdots]"}
  },
  "ldots": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\ldots"}
  },
  "cdots": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\cdots"}
  },
  "vdots": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\vdots"}
  },
  "ddots": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\ddots"}
  },
  "frown": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\frown"}
  },
  "/_\\": {
    "_comment": "special case - will be incorrectly interpreted with left-to-right searching algorithm",
    "alternative": ["triangle"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\triangle"}
  },
  "diamond": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\diamond"}
  },
  "square": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\square"}
  },
  "|__": {
    "alternative": ["lfloor"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\lfloor"}
  },
  "__|": {
    "alternative": ["rfloor"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\rfloor"}
  },
  "|~": {
    "alternative": ["lceling"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\lceiling"}
  },
  "~|": {
    "alternative": ["rceiling"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\rceiling"}
  },
  "CC": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\mathbb{C}"}
  },
  "NN": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\mathbb{N}"}
  },
  "QQ": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\mathbb{Q}"}
  },
  "RR": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\mathbb{R}"}
  },
  "ZZ": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\mathbb{Z}"}
  },
  "sqrt": {
    "alternative": [],
    "type": "function",
    "priority": 55,
    "offpair": {"1,2": [2]},
    "rule": {"1,2": "\\sqrt{#2}"}
  },

  "abs": {
    "alternative": [],
    "type": "function",
    "priority": 55,
    "offpair": {"1,2": [2]},
    "rule": {"1,2": "|#2|"}
  },
   "sin": {
    "alternative": ["sine"],
    "type": "function",
    "priority": 15,
    "rule": {"1,2": "\\sin #2"}
  },
   "cos": {
    "alternative": ["cos"],
    "type": "function",
    "priority": 15,
    "rule": {"1,2": "\\cos #2"}
  },

  "root": {
    "alternative": [],
    "type": "function",
    "priority": 55,
    "extraArgument":1,
    "offpair": {"1,3": [2,3]},
    "rule": {"1,3": "\\sqrt[#2]{#3}", "1,2": "\\sqrt{#2}"}
  },
  "frac": {
    "alternative": [],
    "type": "function",
    "priority": 20,
    "extraArgument":1,
    "offpair": {"1,3": [2,3]},
    "rule": {"1,3": "\\frac{#2}{#3}", "1,2": "\\frac{#2@1}{#2@-1}"}
  },
  "int": {
    "alternative": ["integral"],
    "type": "function",
    "priority": 55,
    "family":["int","oint"],
    "pairedArgument":"d",
    "rule": {"1,3": "\\int #2 \\,d#3","1,2": "\\int #2"}
  },
  "oint": {
    "alternative": [],
    "type": "function",
    "priority": 55,
    "family":["int","oint"],
    "pairedArgument":"d",
    "rule": {"1,3": "\\oint #2 \\,d#3","1,2": "\\oint #2"}
  },
   "cup": {
    "alternative": ["union"],
    "type": "operator",
    "priority": 10,
    "rule": {"2,3": "#1 \\cup #3"}
  },
   "cap": {
    "alternative": ["intersect"],
    "type": "operator",
    "priority": 10,
    "rule": {"2,3": "#1 \\cap #3"}
  },
  "in": {
    "alternative": [],
    "type": "relation",
    "priority": 0,
    "rule": {"2,3": "#1 \\in #3"}
  },
  "notin": {
    "alternative": [],
    "type": "relation",
    "priority": 0,
    "rule": {"2,3": "#1 \\notin #3"}
  },
  "and": {
    "alternative": [],
    "type": "operator",
    "priority": 10,
    "rule": {"2,3": "#1 \\land #3"}
  },
  "or": {
    "alternative": [],
    "type": "operator",
    "priority": 10,
    "rule": {"2,3": "#1 \\lor #3"}
  },
  "forall": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\forall"}
  },
  "exist": {
    "alternative": ["exists"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\exists"}
  },
  "not": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\neg"}
  },
  "perp": {
    "alternative": ["perpendicular","bot"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\bot"}
  },
  "prod": {
    "alternative": ["by","times","cross"],
    "type": "operator",
    "priority": 10,
    "rule": {"2,3": "#1 \\times #3"}
  },
  "isom": {
    "alternative": ["isomorphic"],
    "type": "relation",
    "priority": 0,
    "rule": {"2,3": "#1 \\simeq #3"}
  },

  "cases:": {
    "alternative": [],
    "type": "multiline",
    "lineBreak": true,
    "params":["caseEnvironment"],
    "note": "cases"
  },

  "system:": {
    "alternative": [],
    "type": "multiline",
    "params":["&beforeFirstRelation"],
    "seperateOut":true,
    "absorbEmptyLine": true,
    "emptyLineBeforeIndent": true,
    "note": "align*"
  },

  "linearsystem:": {
    "alternative": [],
    "type": "multiline",
    "seperateOut":true,
    "absorbEmptyLine": true,
    "emptyLineBeforeIndent": true,
    "noBeginEnd":true,
    "changeLineTurn":",",
    "note": "\\systeme"
  },

  "ge": {
    "alternative": [">="],
    "type": "relation",
    "priority": 0,
    "rule": {"2,3": "#1 \\ge #3"}
  },

  "le": {
    "alternative": ["<="],
    "type": "relation",
    "priority": 0,
    "rule": {"2,3": "#1 \\le #3"}
  },

   "hat": {
    "alternative": [],
    "type": "function",
    "priority": 55,
    "offpair": {"1,2": [2]},
    "rule": {"1,2": "\\hat{#2}"}
  },
   "overline": {
    "alternative": ["conj","ocnjugate"],
    "type": "function",
    "priority": 55,
    "offpair": {"1,2": [2]},
    "rule": {"1,2": "\\overline{#2}"}
  },
   "underline": {
    "alternative": [],
    "type": "function",
    "priority": 55,
    "offpair": {"1,2": [2]},
    "rule": {"1,2": "\\underline{#2}"}
  },

   "if": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "#&\\text{if }"}
  },

   "otherwise": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "#&\\text{otherwise}"}
  },

   "when": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "#&\\text{when }"}
  },

  	"sum": {
		"alternative": [],
		"type": "function",
		"priority": 55,
		"offpair": {
			"1,2": [2]
		},
		"rule": {
			"1,2": "\\sum{#2}"
		}
	},
}