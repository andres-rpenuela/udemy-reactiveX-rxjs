// TODO: Hacer un repsaro de operadores y tipos de datos en TypeScript

// # 📝 Ejercicios de Observables con RxJS
// ## 1. Crea tu primer Observable
//
// Crea un Observable que emita los números del 1 al 5 y suscríbete para mostrar cada valor en consola.
/*
console.log("Ejercicio 1: Crea tu primer Observable");
import {Observable, from, fromEvent, interval, of, take, Observer} from 'rxjs';

const invertal$ = interval(1000).pipe(take(5));
const subs:Observer<number>= {
    next: value => console.log('next:', value),
    error: error => console.error('error:', error),
    complete: () => console.log('complete') // al hacer el take(5) se completa, no es necesario el unsubscribe
}

const subscription = invertal$.subscribe(subs);
*/
// ---
//
// ## 2. Observable desde un array
//
// Convierte el array `[10, 20, 30, 40]` en un Observable y muestra cada valor emitido.
console.log("Ejercicio 2: Observable desde un array");
import {from, fromEvent, interval, of, take, Observer, Observable} from 'rxjs';
const array = [10, 20, 30, 40];
const array$:Observable<number> = from(array);

const observer:Observer<number>= {
    next: value => console.log('next:', value),
    error: error => console.error('error:', error),
    complete: () => console.log('complete') // al emitir todos los valores se completa, no es necesario el unsubscribe
}

const subscription2 = array$.subscribe(observer);
// ---
//
// ## 3. Usando operadores de transformación
//
// Crea un Observable que emita los números del 1 al 4 y usa el operador `map` para multiplicar cada valor por 3.
//
// ---
//
// ## 4. Filtrando valores
//
// Crea un Observable que emita los números del 1 al 10 y usa el operador `filter` para emitir solo los pares.
//
// ---
//
// ## 5. Observable de eventos
//
// Crea un Observable que escuche los clics en un botón y muestre un mensaje en consola cada vez que se haga clic.
//
// ---
//
// ## 6. Combinando operadores
//
// Crea un Observable que escuche la entrada de texto en un input, filtre los textos con menos de 3 caracteres y convierta el texto a mayúsculas antes de mostrarlo en consola.
//
// ---
//
// ## 7. Controlando el tiempo
//
// Crea un Observable que emita un valor cada segundo y se detenga después de emitir 5 valores.
//
// ---
//
// ## 8. Manejo de errores
//
// Crea un Observable que emita los valores 1, 2 y luego lance un error. Usa `catchError` para capturar el error y emitir el valor 0.
//
// ---
//
// ## 9. Observable de Promesa
//
// Convierte una promesa que resuelve después de 2 segundos en un Observable y muestra el resultado en consola.
//
// ---
//
// ## 10. Ejercicio de combinación
//
// Crea dos Observables: uno que emita letras (`'A'`, `'B'`, `'C'`) y otro que emita números (`1`, `2`, `3`). Usa el operador `zip` para combinarlos y mostrar pares como `A-1`, `B-2`, etc.
//
// ---