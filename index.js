console.log("hello world");

// Variabili e il loro scope

// abbiamo detto che una variabile oggi andrebbe creata SOLO con let o const, MAI con var
// per via dell'ambito di esecuzione che hanno, ovvero var è molto più lasco nel suo utilizzo, subisce HOISTING (sollevamento)
// e molto più prono ad errori

console.log(myBadVar); // undefined invece di un errore, sarebbe meglio riceverne uno
var myBadVar = 10;

// console.log(myGoodVar) // Cannot access 'myGoodVar' before initialization - molto più consono come risultato
let myGoodVar = true;
console.log(myGoodVar); // true - perché l'abbiamo letto a POSTERIORI rispetto la sua inizializzazione

let name = "Stefano";

if (true) {
  // l'ambito delle variabili create con let o const è un ambito di blocco, quindi circoscritto all'interno di un contesto creato con le graffe (quello di un if, for, while, switch, funzione)
  let name = "Giacomo";
  // da qui in poi, fino alla chiusura della graffa il namespace (quindi l'area di memoria associata all'etichetta name) ha sovrascritto il valore con "Giacomo"
  console.log(name); // "Giacomo"
}

console.log(name); // Stefano

// questo processo di utilizzo di variabili è più "NATURALE", è il comportamento che ci aspetteremmo
// ...cosa che non succede quando utilizziamo var, quindi NON UTILIZZIAMOLO!

var role = "teacher";

// if(true) {

//     var role = "student" // questa operazione ha sovrascritto il valore della variabile esterna (molto male!)
// }
// console.log(role); // student

// l'ambito di funzione è l'unico che possa contenere una var
function scopeTest() {
  var role = "student";
}

console.log(role); // teacher

// elementi strutturali: Oggetti, Array

// OGGETTI - serve a rappresentare una qualche entità del mondo reale e non, qualsiasi cosa che ha bisogno di essere descritta in dettaglio
// un oggetto raccoglie le informazioni all'interno di un contesto creato con le GRAFFE e con all'interno coppie CHIAVE-VALORE separate da virgole

const person = {};

if (person) {
  // person contiene oggetto vuoto ed è quindi valutato nel contesto booleano dell'if con un'accezione intrinseca di true (perché {} è truthy)
  // quindi saremmo qui, nel caso true
} else {
  // qui non ci arriviamo
}

const car = {
  brand: "ford",
  color: "silver",
  yearsOnTheRoad: 2,
  owned: true,
  // valutiamo due variabili per usare il loro valore nella creazione sia della proprietà sia del valore
  [role]: person // "teacher" : {}
};

console.log(car);

console.log(car.brand); // "ford" - accediamo alla proprietà brand di car

const property = "color";

console.log(car["color"]); // "silver"
console.log(car[property]); // car["color"] ==> // "silver"
console.log(car.property); // in questo caso NON STIAMO valutando una variabile chiamata property, ma stiamo cercando -letteralmente- una proprietà nell'oggetto chiamata "property" che NON ESISTE! // undefined

const property1 = "years";
const property2 = "On";
const property3 = "The";
const property4 = "Road";

console.log(car[property1 + property2 + property3 + property4]); // questo è il risultato della concatenazione, che si traduce in: car["yearsOnTheRoad"], che si traduce nel valore: 2

const carPropeties = Object.keys(car);

console.log(carPropeties);

console.log(car[carPropeties[0]]);
// prima si valuta la selezione della posizione sull'array keys, poi con quel valore di stringa si cerca una proprietà corrispondente a quella stringa nell'oggetto, che ci ritornerà il valore associato

console.log(car.tintedWindows); // undefined

// CREAZIONE DI NUOVA PROPRIETA'
car.tintedWindows = true; // una chiave non esistente, nel momento in cui le assegnamo un valore, comincia ad esistere!
console.log(car);
/* {
  brand: 'ford',
  color: 'silver',
  yearsOnTheRoad: 2,
  owned: true,
  tintedWindows: true
} */

// ELIMINAZIONE DI PROPRIETA' DI OGGETTO
delete car.owned; // abbiamo eliminato la chiave owned
console.log(car.owned);

// CLONARE OGGETTI

// DA NON FARE:
// const car2 = car // MAI CERCARE DI CLONARE IN QUESTO MODO, non è una primitiva!

// SI PUO' FARE:
const car2 = Object.assign({}, car); // clonazione di primo livello, dei sotto oggetti o array non verrebbero clonati, dovremmo fare un'operazione di clonazione a mano per ognuno di essi
// car2.sottoprop = Object.assign({}, car.sottoprop)
car2.yearsOnTheRoad = 0.5;

// SPREAD OPERATOR (quello dei 3 puntini ...)
const additionalSpecs = {
  brand: "Mercedes",
  numberOfCollisions: 4,
  officialRepairs: 2,
  previousOwners: ["Stefano", "Andrea", "Corinne"]
};

// CLONAZIONE (SHALLOW - superficiale) TRAMITE SPREAD OPERATOR
// const car2b = Object.assign({}, car2, additionalSpecs);
const car2b = { ...car2, ...additionalSpecs };

// CLONAZIONE PROFONDA TRAMITE STRUCTUREDCLONE
console.log(car2b);
const car3 = structuredClone(car); // vengono clonate anche tutte le sotto referenze

car3.yearsOnTheRoad = 5.5;

console.log(car);
console.log(car2);
console.log(car3);

// ARRAY
// liste di elementi _possibilmente_ OMOGENEI
const numbers = [50, 20, 3, 100];
const strings = ["Stefano", "Marco", "Luca", "Giulia", "Andrea"];
const booleans = [true, false, false, true];

// accediamo alla posizione di un array con il suo indice

console.log(strings[1]);

// nella gestione degli array si usa tipicamente un for loop
for (let i = 0; i < strings.length; i++) {
  console.log(strings.length);
  console.log(strings[i]);
}

for (let i = 0; i < numbers.length; i++) {
  console.log(i);
  if (numbers[i] % 2 !== 0) {
    console.log(numbers[i]);
    break;
    // il break può essere utile per fermare il for loop (evitando cicli inutili) dopo aver già trovato quello che cerchiamo
  }
}

// FUNZIONI

// per creare ed utilizzare le funzioni abbiamo due momenti distinti

// 1) la sua DEFINIZIONE (keyword function, oppure =>)

// function esempio1(param1, param2) {
//   console.log("Ciao, il primo parametro è: ", param1, "il secondo parametro è:", param2);
// }

// function esempio1(param1, param2) {
//   console.log("Ciao, il primo parametro è: ", param1, "il secondo parametro è:", param2);
// }

// definizione di funzione come espressione (funzione anonima) inserita in una variabile (evitando il problema dell'hoisting o sollevamento)
// const esempio1 = function (param1, param2) {
//   console.log("Ciao, il primo parametro è: ", param1, "il secondo parametro è:", param2);
// };
// posso usare la variabile coerentemente con il tipo di dato che contiene... se contiene una funzione posso chiamarla come se fosse una funzione!

// definizione di funzione come arrow function

const esempio1 = (param1, param2) => {
  console.log("Ciao, il primo parametro è: ", param1, "il secondo parametro è:", param2);
};

// 2) la sua ESECUZIONE (l'utilizzo di parentesi dopo l'identificativo)
esempio1(10, "test");
esempio1(30, "random");

// le arrow function possono avere una sintassi più concisa se consideriamo una singola riga di codice con un return implicito

const sum = function (n1, n2 = 0) {
  return n1 + n2;
};

console.log("SUM", sum(1));

const sum1 = (n1, n2) => {
  return n1 + n2;
};

// con questa versione il return è implicito (NON CI DEVONO ESSERE LE GRAFFE!!!)
// funziona solo per funzioni molto semplici che hanno una singola riga di codice,
// non si può usare in caso di multiple righe, dovremmo tornare alla versione precedente (sum1)
const sum2 = (n1, n2) => n1 + n2;

console.log(sum2(1, 3));

// REST PARAMETER (DI FUNZIONE)

const dynamicSum = function (n1, n2, ...numbers) {
  console.log(n1);
  console.log(n2);
  console.log(numbers);

  let sum = 0;
  // sommiamo i primi 2
  sum += n1;
  sum += n2;

  // sommiamo tutti gli altri (numero potenzialmente non conosciuto al momento della creazione di questa funzione)
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  // console.log(sum)
  return sum;
};

console.log(dynamicSum(10, 5, 60, 70, 80, 1, 0, 500, 15, 20, 93));

// Default function parameters
const multiply = function (n1, n2 = 1) {
  return n1 * n2;
};

console.log(multiply(3)); // in questo caso n2 valeva 1 e di conseguenza non abbiamo ricevuto NaN ma 3

// DESTRUCTURING

//  DESTRUCTURING di oggetto

console.log(car);
console.log(additionalSpecs);

// const brand = car.brand
// const color = car.color

// stiamo dicendo a JS di estrapolare da un oggetto di rifierimento (che si trova dopo =) alcune o tutte le proprietà trasformandole in variabili che contengono il valore associato
const { brand, color, yearsOnTheRoad, teacher, tintedWindows } = car;

console.log(brand);
console.log(color);
console.log(yearsOnTheRoad);
console.log(teacher);
console.log(tintedWindows);

// const showMeProperties = function (obj) {
//   console.log(obj.brand);
//   console.log(obj.officialRepairs);
//   console.log(obj.numberOfCollisions);
//   console.log(obj.previousOwners);
// };

const showMeProperties = function ({ brand, officialRepairs, numberOfCollisions, previousOwners }) {
  // const {brand, officialRepairs, numberOfCollisions, previousOwners} = obj

  console.log(brand);
  console.log(officialRepairs);
  console.log(numberOfCollisions);
  console.log(previousOwners);
};

showMeProperties(additionalSpecs);
showMeProperties({ brand: "Lamborghini", numberOfCollisions: 0, officialRepairs: 0, previousOwners: [] });

//  DESTRUCTURING di array

const position = [38.9271283, 48.00002];

// const latitude = position[0];
// const longitude = position[1];

const [latitude, longitude] = position;

console.log(latitude);
console.log(longitude);

const letters = ["a", "b", "c", "d", "e", "f"];

const [first, , third, , , sixth] = letters;

console.log(first);
console.log(third);
console.log(sixth);

// Template literals - stringhe con valori dinamici, che possono essere rotte su più righe

console.log("La marca della mai auto è " + car2b.brand + "\n numero di incidenti: " + car2b.numberOfCollisions);

console.log(`La marca della mai auto è ${car2b.brand},
     numero di incidenti: ${car2b.numberOfCollisions}`);

// unione di due array diversi tramite spread operator
const frankenstein = [...position, "blah", "ciao", ...letters];

console.log(frankenstein);

// METODO FOREACH - itera un array e ci permette di effettuare un'operazione tante volte quanti sono gli elementi dell'array
// il .forEach() NON HA UN VALORE DI RITORNO!
console.log(letters);

for (let i = 0; i < letters.length; i++) {
  const letter = letters[i];
  console.log(letter);
}

let union = "";

letters.forEach((letter, index, array) => {
  console.log(letter);
  console.log(index);
  console.log(array);

  union += letter;
});

console.log(union);

// METODO MAP - si usa per trasformare gli elementi di partenza dentro un NUOVO array ritornato con gli elementi modificati
// itera l'array di partenza e chiede di restituirgli dalla funzione l'elemento che vogliamo salvare nel nuovo array
// RITORNA UN NUOVO ARRAY con gli elementi modificati
// MANTIENE SEMPRE LA STESSA LENGTH DELL'ORIGINALE

// letters.map(letter => {
//   return letter.toUpperCase();
// });

// con questa sintassi il return è implicito - stiamo tornando la lettera modificata in maiuscolo che prenderà posto nel nuovo array
const lettersCaps = letters.map(letter => letter.toUpperCase() + "!");

console.log(letters);
console.log(lettersCaps);

const multipliedByThree = numbers.map(num => num * 3);

console.log(numbers);
console.log(multipliedByThree);

// gli array methods sono concatenabili SE e solo SE il metodo usato ritorna un array
numbers
  .map(num => num * 3)
  .forEach(num => {
    console.log(num);
  });

// METODO FILTER - serve a filtrare degli elementi in un array
// RITORNA UN NUOVO ARRAY, potenzialmente con meno elementi dell'originale
// chiede di ritornare dalla nostra funzione true o false in base a qualche condizione che stabiliamo noi
// se il filter riceve true inserirà l'elemento nel nuovo array, altrimenti se riceve false lo salterà.

const underFifty = numbers.filter(num => num < 50);
console.log(underFifty);
const noDandE = letters.filter(letter => letter !== "d" && letter !== "e");
console.log(noDandE);

// concateniamo operazioni di selezione, modifica e visualizzazione del dato in sequenza
letters
  .filter(letter => letter !== "d" && letter !== "e")
  .map(letter => letter.toUpperCase() + "!")
  .forEach(letter => console.log(letter));

// .reduce()
