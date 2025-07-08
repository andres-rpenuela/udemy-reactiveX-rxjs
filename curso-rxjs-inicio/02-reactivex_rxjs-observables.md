# Observables

## 🔄 Observable que emite cadenas de texto

### 📈 Diagrama de flujo

```
Observable:        ----[Hola]-------[Mundo]----------------|----[Hola]-------->
                         |             |                                    
                             pipe() (algunaOperacion opcional)             
                         |             |     
                        \ /           \ /     (subcriber.next[..])               
Suscripción:       ----[Hola]-------[Mundo]----------------|------------------>
                                                 subscriber.complete()
```

### 💻 Código en TypeScript

```ts
import { Observable, Subscriber } from 'rxjs';

// Crear un observable de tipo string
const obs$: Observable<string> = new Observable(
  (subs: Subscriber<string>) => {
    // Emitiendo valores manualmente
    subs.next('Hola');
    subs.next('Mundo');

    // Marcamos como completado el observable
    subs.complete();

    // Estos valores ya no serán emitidos (ignorados)
    subs.next('Esto no se mostrará');
  }
);

// Suscripción al observable
obs$.subscribe({
  next: valor => console.log('Valor recibido:', valor),
  complete: () => console.log('Observable completado')
});
```

---

### 🧠 Qué sucede:

- `subs.next('Hola')`: el observable emite el valor `"Hola"`.
- `subs.next('Mundo')`: luego emite `"Mundo"`.
- `subs.complete()`: indica que el observable ha finalizado su emisión.
- Cualquier `next` posterior al `complete()` **no será emitido ni recibido** por los subscribers.

---

## 🧾 Subscriber y Observer

### 👤 ¿Qué es un Subscriber?

En RxJS, un **Subscriber** es el mecanismo que recibe los valores emitidos por un **Observable**.

```ts
obs$.subscribe(resp => console.log(resp));
```

- El **Observable** contiene internamente un `subscriber` que emite los datos usando `subscriber.next(...)`.
- Puedes **suscribirte** al observable usando `.subscribe()`.
- El contendio del `.subcribe()`, es un un observer y el valor devuelto al `.subcribe()`, es una  subcripción (`subcription`).

```ts
// Suscripción al observable
obs$.subscribe(console.log);

// Equivalente a:
obs$.subscribe(resp => console.log(resp));
```

### ✅ Estructura de una Suscripción

Un `subscribe()` puede (opcionalmente) recibir **tres funciones** como argumentos:

```ts
obs$.subscribe(
  value => console.log('next:', value),     // Emitido por next()
  error => console.log('error:', error),    // Emitido por error()
  ()    => console.log('complete')          // Emitido al completarse
);
```

---

### 🔍 ¿Qué es un Observer?

Un **Observer** es una **interfaz** que define los métodos que una suscripción puede manejar:
- `next`
- `error`
- `complete`

Puede pasarse directamente como argumento al `subscribe()`:

```ts
import { Observer } from 'rxjs';

const observer: Observer<any> = {
  next:    value => console.log('siguiente [next]:', value),
  error:   err   => console.error('error [obs]:', err),
  complete:      () => console.info('completado [obs]')
};

obs$.subscribe(observer);
```

Esto permite **mayor claridad y reutilización** del código, especialmente útil en contextos complejos.
