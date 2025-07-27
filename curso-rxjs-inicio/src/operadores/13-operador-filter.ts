// operador filter

import {filter, from, Observable, of} from "rxjs";

// filtrar numberos impores
// const range$ = range(1,20);
//
// console.log("start subscription")
// range$.pipe(
//     filter(value =>  value%2 === 1 )
// ).subscribe(
//     value => console.log(`impar: ${value}`)
// );
// console.log("end subscription")

interface personaje{
    tipo:string,
    nombre:string
}

// filtrar heroes
const personajes = [
    {
        tipo: 'heroe',
        nombre: 'Batman'
    },
    {
        tipo: 'heroe',
        nombre: 'Robin'
    },
    {
        tipo: 'villano',
        nombre: 'Joker'
    }
];


//const heroes$ : Observable<{tipo:string,nombre:string}>= of(...personajes)
const heroes$ : Observable<personaje> = from(personajes) // Mejor opción si personajes es un array
    .pipe(
        filter( (person) => person?.tipo === 'heroe')
    );

console.log("start subscription")
heroes$.subscribe(
    value => console.log( value )
);
console.log("end subscription")
