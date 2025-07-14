
// Con asyncShcuelder, tenemos estas dos funciones
// setTimeout( () => { },3000);
// setInterval( () => { },3000);

import {asyncScheduler} from "rxjs";

const saludar =  () => console.log('Hola Mundo.')
const saludar2 = nombre  => console.log(`Hola ${ nombre }`)
const salduar3 =  p  => console.log(`Hola ${ p.name } & ${ p.surname }`)
// A los 2s envia saludar
// asyncScheduler( saludar ,2000 );

// A los 2 segundos envia saluar2, y se le pasa los parametros con el argumento `stage`, y puede ser privmitvo u objeto
asyncScheduler.schedule( saludar2 ,2000, 'Andres' );
asyncScheduler.schedule( salduar3 ,2000, {name:'Andres', surname:'Ruiz'} );
// asyncScheduler( saludar3 ,2000, 'Andres','Ruiz' ); // no permitido

// Simulaicon e un setTimeout + setInterval con subscripcion
// funcon a reliazar, cuando se lanza, estado
const subs = asyncScheduler.schedule( function (state){
    console.log('state', state);
    // cada segundo se envia (como si fuera un setInterval dentro de un setTimeout
    this.schedule(state + 1, 1000);
},3000, 0 );

// Se elimina la unbsuscrption
// Opción A
// setTimeout( () => {
//     subs.unsubscribe();
// },6000)

// Opbionc B
asyncScheduler.schedule( ()=> subs.unsubscribe(),6000 );