// Operador mapTo
import {fromEvent, mapTo, Observer} from "rxjs";

const observer: Observer<any> = {
    next: value => {
        console.log( value );
    },
    error: err => console.error('error: ',err),
    complete: () => console.log('completed')
};
/**
 * Ejemplo de mapTo para reemplazar la entrada por la slaida
 */
const keyup$ = fromEvent<KeyboardEvent>(document,'keyup');

const keyUpMapTo$ = keyup$
    // transformacion
    .pipe(
        mapTo( 'tecla presionada' )
    );


keyup$.subscribe( observer );
keyUpMapTo$.subscribe( observer );

console.log('End subcription')