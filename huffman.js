var codes = {}
function frequency(str){
	var freqs={ }
	for(var ch=0; ch<str.length; ch++){
		if (str[ch] in freqs)
			freqs[str[ch]] += 1;
		else
			freqs[str[ch]]=1;
	}

return freqs
}
function forSort(a,b){
	return a[0]-b[0];
}
function sortfreq(freqs)
{
	var letters  = Object.keys(freqs);
	tuples=[];
	
	for(var let=0; let<letters.length; let++){
		tuples.push([freqs[letters[let]],letters[let]]);
	}
	tuples.sort(forSort);
	return tuples;
}
//var f_freq = frequency("HEEEEEOOOOOOLLO");
//console.log(f_freq);
//var f_sortFreq=sortFreq(f_freq);
//console.log(f_sortFreq);
function buildTree(tuples){
	while(tuples.length>1){
		var leastTwo = tuples.slice(0,2);
		var theRest  = tuples.slice(2,tuples.length);
		var combFreq = leastTwo[0][0] + leastTwo[1][0]
		tuples=theRest;
		var temp = [combFreq,leastTwo];
		tuples.push(temp);
		console.log(tuples);
		tuples.sort(forSort);
		console.log(tuples)
	}
	return tuples[0];
}
//f_buildTree=buildTree(f_sortFreq);
//console.log(f_buildTree);
function trimTree(tree)
{
	var p = tree[1];
	if (typeof p===typeof '')
		return p;
	else
		return (Array(trimTree(p[0]),trimTree(p[1])));
}
//f_trimTree = trimTree(f_buildTree);
//console.log(f_trimTree);

function assignCodes(node,pat){
    //pat=pat || '';
    if (typeof node ==typeof '')
	codes[node]=pat;
    else{
	assignCodes(node[0],pat+'0');
	assignCodes(node[1],pat+'1');
    }
    return codes;

}
//f_aCode=assignCode(f_trimTree,'')
//console.log(f_aCode);

function encode(str){
    output= '';
    for(ch in str){
	output +=codes[str[ch]];
    }
    return output;
}
//f_encode=encode(str);
//console.log(f_encode);

function decode(tree,str){
    output='';
    var p=tree;
    for(bit in str){
	if(str[bit]=='0')
		p=p[0];
	else
		p=p[1];
	if(typeof p== typeof ''){
		output +=p;
		p=tree;
	}
    }
    return output;

}
//f_decode=decode(f_trimTree,f_encode);
//console.log(f_decode);

var freqs = frequency("aaabccdeeeeeffg");
console.log(freqs);

var sorts=sortfreq(freqs);
console.log(sorts);

var tree=buildTree(sorts);
console.log(tree);

var trim=trimTree(tree);
console.log(trim);

var codes=assignCodes(trim,'');
console.log(codes);

var compression=encode('aaabccdeeeeeffg');
console.log(compression);

var extraction=decode(trim,compression);
console.log(extraction)
