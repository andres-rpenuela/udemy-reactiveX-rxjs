import {Observable, of} from 'rxjs';

//const obs$ = of(1,2,3,4,5,6); // Se emite 1, luego 2,...
//const obs$ = of([1,2,3,4,5,6]); // Se emite el array complete como un unico valor
const obs$ : Observable<any> = of( [1,2],{a:1,b:2}, function (){},true,Promise.resolve(true))
// Se observa que el observable es sincrono

console.log("Inicio del obs$");
obs$.subscribe({
    next: value => { console.log('siguiente [next]: ', value) },
    error: error => console.error('errror [obs]: ', error),
    complete: () => console.warn('completado [obs]')
});
console.log("Fin del obs$");