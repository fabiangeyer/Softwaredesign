let satz: string = prompt('Enter sentence', '');;

let wortArray: string[] = satz.split(" ");

let string_u1: string = reverseWords(wortArray);
console.log(string_u1);

let string_u2: string = reverseSentence(wortArray);
console.log(string_u2);

wortArray = string_u2.split(" ");
let string_u3: string = reverseWords(wortArray);
console.log(string_u3);


function reverseWords(words:string[]) 
{
    let i:number;
    let revWortArray:string[] = new Array(words.length);
    for( i = 0; i<wortArray.length; i++)
        {
            revWortArray[i] = words[i].split("").reverse().join("");
        }
    return revWortArray.join(" ");
}

function reverseSentence(words:string[])
{
    let i:number;
    let revWortArray:string[] = new Array(words.length+1);
    for( i = 0; i<wortArray.length+1; i++)
        {
            revWortArray[i] = words[wortArray.length-i];
        }
    return revWortArray.join(" ");
}  

