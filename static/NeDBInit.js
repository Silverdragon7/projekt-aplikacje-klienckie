/// plik tylko do  stworzenia bazy - odpalany tylko jeżeli nie ma bazy
const Datastore = require('nedb')

// inicjacja pliku .db
const coll1 = new Datastore({
    filename: 'data.db',
    autoload: true
});

// obiekt do zapisania w bazie
const doc = {
    a: "a",
    b: "b"
};

list = [
    { avatar: "Amy", lvl: "1", hp: 100, options: ["Attack", "Spin", "Heal", "Skip"] },
    { avatar: "Bean", lvl: "1", hp: 100, options: ["Attack", "Spin", "Heal", "Skip"] },
    { avatar: "Knuckles", lvl: "1", hp: 100, options: ["Attack", "Spin", "Heal", "Skip"] },
    { avatar: "Sonic", lvl: "1", hp: 100, options: ["Attack", "Spin", "Heal", "Skip"] },
    { avatar: "Tails", lvl: "1", hp: 100, options: ["Attack", "Spin", "Heal", "Skip"] }
]

// for (obj of list) {
//     // console.log(obj)
//     coll1.insert(obj, function (err, newDoc) {
//         console.log("dodano dokument (obiekt):")
//         console.log(obj.avatar)
//         console.log("losowe id dokumentu: " + newDoc._id)
//     });
// }

// właściwa operacja dodania obiektu do bazy
// coll1.insert(doc, function (err, newDoc) {
//     console.log("dodano dokument (obiekt):")
//     console.log(newDoc)
//     console.log("losowe id dokumentu: " + newDoc._id)
// });

// usuwanie całości bazy (jeżeli by się zmieniło coś ważnego odkomentować i odpalić)
// coll1.remove({}, { multi: true }, function (err, numRemoved) {
//     console.log("usunięto wszystkie dokumenty: ",numRemoved)
// });

coll1.find({}, function (err, docs) {
    //zwracam dane w postaci JSON
    console.log("----- tablica obiektów pobrana z bazy: \n")
    console.log(docs)
});
