// mas ejemplos con from y of

/**
 * of = tomar argumentos y genera una secuencia
 * form = array, promesa, iterable, observable,... (casi cualquier cosa)
 */
import { from, of, Observer } from "rxjs";

const observer:Observer<any> = {
    next: (value) => console.log('next: ',value),
    error: (err) => console.error(err),
    complete: () => console.warn('Observable completed')
};

/**
 * Comportamiento con un array
 */
//const source_from$ = from([1,2,3,4,5]);
//source_from$.subscribe(observer);
//
//const source_of$ = of([1,2,3,4,5]);
//source_of$.subscribe(observer);
//
//// comportamiento como from
//const source_of_as_from$ = of(...[1,2,3,4,5]);
//source_of_as_from$.subscribe(observer);

/**
 * Comportamiento con un string
 */
// const source_from$ = from('Andres');
// source_from$.subscribe(observer);//next A, next n, ...
//
// const source_of$ = of('Andres');
// source_of$.subscribe(observer);//next Andres
//
// // comportamiento como from
// const source_of_as_from$ = of(...'Andres');
// source_of_as_from$.subscribe(observer);//next A, next n, ...

// source_from$.subscribe(observer);//.
/**
 * Comportamiento con una promesa
 * fetch permite hacer una peticion http a algún sitio
 */
const source_from$ = from( fetch('https://api.github.com/users/klerith') );

// Opcion A
// source_from$.subscribe( async (resp) =>{
//     console.log( resp );
//     console.log( resp.ok );
//
//     // es otra pomresa
//     const dataResp = await resp.json();
//     console.log(dataResp);
// });

// Emite uno de estos valores cada vez que llame
const miGenerador = function* (){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}
const miIterable = miGenerador();

// tradicional
for( let id of miIterable ){
    console.log(id);
}

// con observabe
from( miIterable ).subscribe( observer )