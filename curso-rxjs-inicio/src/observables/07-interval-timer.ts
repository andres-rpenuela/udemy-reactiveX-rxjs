import {fromEvent, takeUntil, timer} from "rxjs";

const obsever = {
    next: value => console.log('next,',value),
    error: err => console.error(err),
    complete: () => console.warn('completado')
}

// Ejemplo para ver como interval no deja de emitir y timer emite un unico valor
// Ejemplo para ver como interval y timer es asincono
// El primer valor es cero

//const interval$ = interval(2000);
//const timer$ = timer(1500);
//
//console.log('inicio')
//interval$.subscribe( obsever );
//timer$.subscribe( obsever );
//console.log('fin')

// Ejemplo para ver las configuraioens especiales de timer
// lo ejeucta instantneamente
//const timer$ = timer();
//const timer$ = timer(0);

// hace que se comporter como un interval, empiza a las 2000ms y a partir de ese momento, emite cada 1000ms
//const timer$ = timer(2000, 1000)

// Emite a los 5 segundos del momento que se ejecuta la app
//const hoyEn5 = new Date();
//hoyEn5.setSeconds( hoyEn5.getSeconds() + 5 );

//const timer$ = timer(hoyEn5);

// Permite emitir otro observable
//const obs$ = of('Melon','Sandia')
//
//const timer$ = timer(2000).pipe(
//    switchMap( () => obs$ )
//)

//console.log('inicio')
//timer$.subscribe( obsever );
//console.log('fin')

// Permite cerrar la subscripcion
const obs$ = fromEvent(document, 'click');

obs$
    .pipe(
        takeUntil(timer(1000))
    )
    .subscribe({
        next: val => console.log('click', val),
        complete: () => console.warn('completado')
    });