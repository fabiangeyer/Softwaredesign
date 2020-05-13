let subjects: string[] = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
let verbs: string[] = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
let objects: string[] = ["Zaubertränke", "den Grimm", "Lupin", "Hogwards", "die Karte des Rumtreibers", "Dementoren"];

let slength : number = subjects.length; //Namen erklären sich zwar aus dem Kontext, sind allerdings etwas uneindeutig und könnte in größeren Projekten für Verwirrung sorgen
let i:number = 0;
for(i; i<slength; i++)
{
    console.log(getVerse(subjects, verbs, objects))
}


function getVerse (subjects:string[], verbs:string[], objects:string[])
{
    
    let rndS:number=getRandomN(subjects.length); //ebenfalls Namen nicht eindeutig (rndS, rndV,rndO, getRandomN)
    let rndV:number=getRandomN(verbs.length); 
    let rndO:number=getRandomN(objects.length); 
    
    let verse:string = subjects[rndS] + " " + verbs[rndV] + " " + objects[rndO];

    subjects.splice(rndS,1);
    verbs.splice(rndV,1);
    objects.splice(rndO,1);

    return verse;
}

function getRandomN(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

//Ansonsten sehr hübscher Code :)
