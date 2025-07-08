import {Observable, Subscriber} from 'rxjs'

// crear un observable
// const obs$= Observable.create();
const obs$ : Observable<string> = new Observable(
    // permite crear subscripcioens esta defincion
    ( subs : Subscriber<string>) => {
        // emite
        subs.next('Hola');
        subs.next('Mundo');

        // completa
        subs.complete();

        // esto ya no lo emite
        subs.next('Hola');
        subs.next('Mundo');

    });

// subcricpion
obs$.subscribe( resp => console.log(resp) );

