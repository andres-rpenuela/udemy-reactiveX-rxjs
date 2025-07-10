import {asyncScheduler, count, of, range} from 'rxjs';

// Observalbe de elementos secuencnciales
//const src$ = of(1,2,3,4,5); // sincorno

// recomenado: Empieza en el a, y devuelve X elementos
//const src$ = range(1,100);
//const src$ = range(-5,5);
//const src$ = range(10);// empieza en 0 y cuenta 10

const src$ = range(-5,5,asyncScheduler); // Lo convierte en asyncrono
                                    // es decir veremos inicio, fin y leugo los valores

console.log('inicio')
src$.subscribe( console.log );
console.log('fin')
