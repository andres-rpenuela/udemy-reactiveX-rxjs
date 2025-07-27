// operador filter

import {filter, fromEvent, map, tap} from "rxjs";



// operadores en cadena
const keyup$ = fromEvent<KeyboardEvent>( document, 'keyup')
    .pipe(
        tap( console.log ),
        map( event => event.code ),
        //tap( console.log ),
        filter( code => code === 'Enter')
    )


console.log("start subscription")
keyup$.subscribe( console.log );
console.log("end subscription")
