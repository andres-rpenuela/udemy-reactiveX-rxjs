import {Observable, Observer, Subscriber} from 'rxjs'

// creaction un elemento Observer para una subcription
const observer:Observer<any> = {
        next: value => {  console.log('siguiente [next]: ',value)},
        error: error => console.error('errror [obs]: ', error ),
        complete: () => console.info('complebatdo [obs]')
}
