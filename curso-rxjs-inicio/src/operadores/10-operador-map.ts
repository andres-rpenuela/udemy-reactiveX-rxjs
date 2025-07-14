// Operador map
import {fromEvent, map, range} from "rxjs";

/**
 * Ejemplo basico de map()
 */
// const range$ = range(1,5);
//
// console.log('Start subcription')
// range$
//     // transformacion
//     .pipe(
//         map<number,string>(val =>( val*10 ).toString() )
//     )
//     .subscribe({
//         next: value => {
//             console.log(value);
//         },
//         error: err => console.error('error: ',err),
//         complete: () => console.log('completed')
//     });
// console.log('End subcription')


/**
 * Ejemplo de map para obtener el code presionado
 */
const keyup$ = fromEvent<KeyboardEvent>(document,'keyup');

// Opcion A
// keyup$
//     // transformacion
//     .pipe(
//         map(val => val.code )
//     )
//     .subscribe({
//         next: value => {
//             console.log(value);
//         },
//         error: err => console.error('error: ',err),
//         complete: () => console.log('completed')
//     });

// Opcion B
const keyCode$ = keyup$
    // transformacion
    .pipe(
        map(val => val.code )
    );

keyCode$.subscribe({
    next: value => {
        console.log(value);
    },
    error: err => console.error('error: ',err),
    complete: () => console.log('completed')
});
console.log('End subcription')
