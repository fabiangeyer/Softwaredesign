"use strict";
let subjects = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
let verbs = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
let objects = ["Zaubertränke", "den Grimm", "Lupin", "Hogwards", "die Karte des Rumtreibers", "Dementoren"];
let slength = subjects.length;
let i = 0;
for (i; i < slength; i++) {
    console.log(getVerse(subjects, verbs, objects));
}
function getVerse(subjects, verbs, objects) {
    let rndS = getRandomN(subjects.length);
    let rndV = getRandomN(verbs.length);
    let rndO = getRandomN(objects.length);
    let verse = subjects[rndS] + " " + verbs[rndV] + " " + objects[rndO];
    subjects.splice(rndS, 1);
    verbs.splice(rndV, 1);
    objects.splice(rndO, 1);
    return verse;
}
function getRandomN(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
//# sourceMappingURL=zufallsgedicht.js.map