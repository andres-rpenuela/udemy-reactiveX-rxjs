// Operador pluck
import {fromEvent, map, Observer, pluck} from "rxjs";

const observer: Observer<any> = {
    next: value => {
        console.log( value );
    },
    error: err => console.error('error: ',err),
    complete: () => console.log('completed')
};
/**
 * Ejemplo de PLUCK para obtener el code presionado
 */
const keyup$ = fromEvent<KeyboardEvent>(document,'keyup');

const keyCode$ = keyup$
    // transformacion
    .pipe(
        //map(val => val.code )
        pluck( "code")
    );

const keyTargetBaseUri$ = keyup$
    // transformacion
    .pipe(
        pluck( "target",'baseURI')
    );

keyup$.subscribe( observer );
keyCode$.subscribe( observer );
keyTargetBaseUri$.subscribe( observer);
console.log('End subcription')