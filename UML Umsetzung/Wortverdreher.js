"use strict";
let satz = prompt('Enter sentence', '');
;
let wortArray = satz.split(" ");
let string_u1 = reverseWords(wortArray);
console.log(string_u1);
let string_u2 = reverseSentence(wortArray);
console.log(string_u2);
wortArray = string_u2.split(" ");
let string_u3 = reverseWords(wortArray);
console.log(string_u3);
function reverseWords(words) {
    let i;
    let revWortArray = new Array(words.length);
    for (i = 0; i < wortArray.length; i++) {
        revWortArray[i] = words[i].split("").reverse().join("");
    }
    return revWortArray.join(" ");
}
function reverseSentence(words) {
    let i;
    let revWortArray = new Array(words.length + 1);
    for (i = 0; i < wortArray.length + 1; i++) {
        revWortArray[i] = words[wortArray.length - i];
    }
    return revWortArray.join(" ");
}
//# sourceMappingURL=Wortverdreher.js.map