import {Observable, Observer, Subscriber} from 'rxjs'

// crear un observable
// const obs$= Observable.create();
const obs$ : Observable<string> = new Observable(
    // permite crear subscripcioens esta defincion
    ( subs : Subscriber<string>) => {
        // emite
        subs.next('Hola');
        subs.next('Mundo');

        // Forzar un error
        // const a:any = undefined;
        // a.name = 1;

        // completa
        subs.complete();

        // esto ya no lo emite
        subs.next('Hola');
        subs.next('Mundo');

    });

// subcricpion
// manejado la respuesta
obs$.subscribe( resp => console.log(resp) );

// manejando todos los argumentos de una subcription
obs$.subscribe(
    value => console.log('next: '+value), // se ejecuta en cada subs.next(..)
    error => console.error('error '+error),  // se rpoduce un error
    ()  => console.error('complete')        // se enevia con el complete
);

// manejando todos los argumentos de una subcription con un Observer
const observer:Observer<any> = {
        next: value => {  console.log('siguiente [next]: ',value)},
        error: error => console.error('errror [obs]: ', error ),
        complete: () => console.info('complebatdo [obs]')
}

obs$.subscribe( observer );