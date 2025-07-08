import {Observable, Observer, Subscription} from 'rxjs'

// creaction un elemento Observer para una subcription
const observer:Observer<any> = {
    next: value => {  console.log('siguiente [next]: ',value)},
    error: error => console.error('errror [obs]: ', error ),
    complete: () => console.info('complebatdo [obs]')
}

// observable que emite en un intervalo de 1 segundo
const intervalos$ = new Observable( subscriber => {
    // contendor que se incrementa
    let count = 0;
    const interval = setInterval(() =>{
        count++;
        subscriber.next(count);
        console.log("count:", count)
    },1000);

    // a los tres segundos se completa y no se ejecuta la unsuscribe()
    // por lo que el complete != unsuscribe
    // setTimeout( () => {
    //         subscriber.complete();
    // },2500)

    // evita fuga de información, se invoca cuando
    // se llama al `unsubscribe` o se hace el complete
    return () => {
        // procedimienot que se ejecuta cuando
        // se invoce que el `unsubscribe()
        clearInterval( interval );
        console.log(' Intervalo descturido')
    }
});

// subcription
const subscription1 : Subscription = intervalos$.subscribe( observer );
const subscription2 : Subscription = intervalos$.subscribe( observer );
const subscription3 : Subscription = intervalos$.subscribe( observer );

// Encadenar todas las suscripciones a la primera
// para garantizar la subscription, encadenar todas al raíz
subscription1.add(subscription2);
subscription1.add(subscription3);

// cancela la subcripción, pero no el intervalo y por tanto el observable
// sigue emitidio (fuga de información), por eso es requerido que
// se ponga un `return () => { ... } en el `subcriber`
setTimeout( ()=>{
    // subscription1.unsubscribe();
    // subscription2.unsubscribe();
    // subscription3.unsubscribe();

    // esto debería unsubscribe a todos los subcription encadenados
    // invocado uno
    subscription1.unsubscribe();
    console.log('Subcripciones completadas')
},3000)

