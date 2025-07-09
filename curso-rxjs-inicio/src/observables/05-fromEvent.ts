import {fromEvent, Observer} from 'rxjs';

/**
 * Eventos del DOM
 */

// creaction un elemento Observer para una subcription
const observer:Observer<any> = {
    next: value => {  console.log('siguiente [next]: ',value)},
    error: error => console.error('errror [obs]: ', error ),
    complete: () => console.warn('completado [obs]')
}

// const src1$ = fromEvent(document, 'click');
// const src2$ = fromEvent(document, 'keyup');
//
// const subscription1 = src1$.subscribe( observer );
// const subscription2 = src2$.subscribe( observer);

const src1$ = fromEvent<MouseEvent>(document, 'click');
const src2$ = fromEvent<KeyboardEvent>(document, 'keyup');

// desectructuracion MouseEvent(x,y,...)
const subscription3 = src1$.subscribe( ({x,y}) => console.log(x,y) );
const subscription4 = src2$.subscribe( evt => evt.key );
