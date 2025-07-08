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


---

## 🔗 Subscription y Unsubscribe en RxJS

### 📌 ¿Qué es una Subscription?

Cuando llamas a `.subscribe()` sobre un `Observable`, se devuelve un objeto `Subscription`. Este objeto representa la **conexión activa** con el Observable y permite **cancelar (desuscribirse)** de esa conexión.

```ts
const sub = observable$.subscribe(observer);
```

---

### ❌ ¿Por qué es importante llamar a `unsubscribe()`?

Un `Observable` puede emitir valores indefinidamente (como un intervalo o un socket). Si no cancelas la suscripción:

- **El observable seguirá activo**, consumiendo memoria.
- **Puede provocar fugas de memoria**.
- **Seguirá ejecutando lógica innecesaria** aunque ya no necesites los datos.

> Por eso, cuando creas Observables manualmente, debes devolver una función de limpieza (`return () => { ... }`) para que RxJS sepa cómo liberar los recursos correctamente.

---

### ✅ Buenas prácticas

- **Siempre desuscribirse** cuando ya no necesitas escuchar al observable.
- **Agrupar múltiples suscripciones** si se necesita desuscribir varias a la vez.
- Usar operadores como `takeUntil`, `first`, `take`, `unsubscribe()` o `Subscription.add()`.

---

### 🧪 Ejemplo práctico comentado

```ts
import { Observable, Observer, Subscription } from 'rxjs'

// 1. Crear un Observer que define cómo manejar los eventos
const observer: Observer<any> = {
  next: value => console.log('siguiente [next]: ', value),
  error: err => console.error('error [obs]: ', err),
  complete: () => console.info('completado [obs]')
}

// 2. Crear un Observable que emite un número cada segundo
const intervalos$ = new Observable(subscriber => {
  let count = 0;

  // Emite un valor cada 1000ms (1 segundo)
  const interval = setInterval(() => {
    count++;
    subscriber.next(count);
    console.log('count:', count);
  }, 1000);

  // 3. Función de limpieza: se ejecuta al llamar a `unsubscribe()`
  return () => {
    clearInterval(interval); // Detiene el setInterval
    console.log('Intervalo destruido');
  };
});

// 4. Crear 3 suscripciones independientes
const subscription1: Subscription = intervalos$.subscribe(observer);
const subscription2: Subscription = intervalos$.subscribe(observer);
const subscription3: Subscription = intervalos$.subscribe(observer);

// 5. Cancelar (desuscribir) todas las suscripciones después de 3 segundos
setTimeout(() => {
  subscription1.unsubscribe();
  subscription2.unsubscribe();
  subscription3.unsubscribe();
  console.log('Suscripciones canceladas');
}, 3000);
```
--- 
### 📝 Conclusión

- **`subscribe()`** inicia la ejecución del observable.
- **`unsubscribe()`** detiene la emisión y ejecuta la limpieza si está definida.
- Siempre incluye una función de limpieza (`return () => { ... }`) en `Observable` personalizados que utilizan recursos externos como `setInterval`, eventos DOM, sockets, etc.

--- 

### 🔗 Encadenar y gestionar múltiples suscripciones con add()
Cuando tienes múltiples suscripciones a distintos observables o al mismo observable, puedes agruparlas para simplificar la limpieza usando el método .add() que ofrece la clase Subscription.

#### ✅ Ventajas de encadenar suscripciones
Evita tener que llamar a unsubscribe() en cada suscripción por separado.

Al llamar a unsubscribe() en la principal, todas las encadenadas se cancelan también.

Mantiene el código más limpio y menos propenso a errores de fugas de memoria.

#### Ejemplo
```typescript
import { Observable, Observer, Subscription } from 'rxjs';

// Observer común
const observer: Observer<any> = {
  next: val => console.log('next:', val),
  error: err => console.error('error:', err),
  complete: () => console.log('completado')
};

// Observable que emite valores cada segundo
const intervalos$ = new Observable(subscriber => {
  let count = 0;

  const interval = setInterval(() => {
    count++;
    subscriber.next(count);
  }, 1000);

  // Limpieza cuando se hace unsubscribe
  return () => {
    clearInterval(interval);
    console.log('Intervalo destruido');
  };
});

// 3 suscripciones independientes
const subscription1: Subscription = intervalos$.subscribe(observer);
const subscription2: Subscription = intervalos$.subscribe(observer);
const subscription3: Subscription = intervalos$.subscribe(observer);

// Encadenar todas las suscripciones a la primera
subscription1.add(subscription2)
subscription1.add(subscription3);

// Al hacer unsubscribe de subscription1, todas se cancelan
setTimeout(() => {
  subscription1.unsubscribe(); // Esto cancela las tres
  console.log('Suscripciones completadas');
}, 2000);

```
--- 
#### 📝 Notas clave
* subscription.add(otraSuscripcion) vincula ambas.
* Al ejecutar unsubscribe() sobre la suscripción principal, todas las encadenadas se desactivan y ejecutan su lógica de limpieza.
* Útil para evitar múltiples llamadas manuales a unsubscribe().
* La línea:
```ts
subscription1.add(subscription2.add(subscription3));
```
> ✅ Funciona, pero no garantiza que subscription3 se limpie si subscription2 ya ha sido desuscripta antes.
> 
> ✅ Mejor práctica: encadenar todas al mismo Subscription raíz.
---

### 🔍 Diferencia entre complete() y unsubscribe()

#### 🔁 .complete():
* Es una notificación interna del observable que indica que ya no emitirá más valores.
* Es emitida por el propio observable (desde su lógica interna).
* Llama a los complete() de los observers suscritos.
* No necesariamente detiene tareas internas (como setInterval) si no se limpian manualmente.
* Puede ser escuchada con el tercer argumento en .subscribe(...) o desde un Observer.

```ts
const obs$ = new Observable(subs => {
subs.next('valor');
subs.complete(); // Se notifica el "fin" del observable
});
```
### ❌ .unsubscribe():
*Es una acción externa, ejecutada por el consumidor para cancelar la suscripción al observable.
*Puede hacerse en cualquier momento, independientemente de si el observable ha terminado o no.
*Llama a la función de limpieza (return () => {...}) si fue definida.
*No se llama al método complete() automáticamente (a menos que lo hagas tú).
*Detiene la emisión y limpia recursos.

```ts
const sub = obs$.subscribe(...);
sub.unsubscribe(); // Cancela la suscripción
```
--- 

#### 📋 Comparativa rápida

| Aspecto                              | `.complete()`               | `.unsubscribe()`                      |
| ------------------------------------ | --------------------------- | ------------------------------------- |
| Quién lo llama                       | El Observable               | El consumidor del observable          |
| ¿Se detienen emisiones?              | Sí, desde el observable     | Sí, desde la suscripción              |
| ¿Ejecuta función de limpieza?        | No automáticamente          | Sí                                    |
| ¿Notifica a `observer.complete()`?   | Sí                          | No                                    |
| ¿Limpia recursos como `setInterval`? | No, a menos que tú lo hagas | Sí, si hay `return () => {}` definido |

----

#### 🧪 Ejemplo práctico

```ts
const obs$ = new Observable(subs => {
  const interval = setInterval(() => subs.next('ping'), 1000);

  setTimeout(() => {
    subs.complete(); // Solo notifica que terminó
    // El setInterval sigue corriendo si no se limpia
  }, 3000);

  return () => {
    clearInterval(interval); // Solo se ejecuta si haces `unsubscribe`
    console.log('Limpieza ejecutada');
  };
});

const sub = obs$.subscribe({
  next: val => console.log(val),
  complete: () => console.log('Observable completado')
});

setTimeout(() => {
  sub.unsubscribe(); // Aquí sí se limpia el setInterval
}, 5000);
```