import {Observable, Observer, Subject, Subscriber, Subscription} from 'rxjs'

// creaction un elemento Observer para una subcription
const observer:Observer<any> = {
    next: value => {  console.log('siguiente [next]: ',value)},
    error: error => console.error('errror [obs]: ', error ),
    complete: () => console.info('complebatdo [obs]')
}

const interval$ : Observable<number> = new Observable(  (subscriber : Subscriber<number>)  => {
    const intervalId = setInterval(
        () => subscriber.next( Math.random() )
        ,1000);

    return () => {
        clearInterval(intervalId);
        console.log('Intervalo destruido');
    }
});

// Cada valor de la subcripción es diferente
//const subs1 : Subscription = interval$.subscribe( rnd => console.log("subs1: "+ rnd ) );
//const subs2 : Subscription = interval$.subscribe(rnd => console.log("subs2: "+ rnd ) );

// Todos los valores a la subcripcion es la misma, entonces subcribion a un subject enlazado al observable
const subject$ :Subject<number> = new Subject();
// se enlaza al observable
const subjectSubscription = interval$.subscribe( subject$ );
// se subscibre al subject
// const subs3 : Subscription = subject$.subscribe( rnd => console.log("subs3: "+ rnd ) );
// const subs4 : Subscription = subject$.subscribe( rnd => console.log("subs4: "+ rnd ) );
const subs3 : Subscription = subject$.subscribe( observer );
const subs4 : Subscription = subject$.subscribe( observer );


// Cold Observable: La inofrmación es emitida por el observable del mismo
// Hot Observable: La informaicón es emietida fuea del observable (con un observer)
//  de un Observer
setTimeout( () =>{
    // Permite añadir FUERA del observable, este valor para qeu se emita
    subject$.next(10);

    // no se ejeucta el callbak de limpieza del observalbe,
    // para ello se hace un `unsubscribe` del `subject`
    subject$.complete();

    // ejecuta el callback de limpieza
    subjectSubscription.unsubscribe();
},3000);