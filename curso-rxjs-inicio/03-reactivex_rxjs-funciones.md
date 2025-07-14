# Funciones parea crear Observables

## Operador `of()` en RxJS

### 📦 ¿Qué hace?

El operador `of()` es una **función de creación** en RxJS que:

- **Convierte** uno o más valores **en un `Observable`**.
- Emite esos valores de **forma síncrona**, uno tras otro.
- **Finaliza automáticamente** tras emitir el último valor (llama a `complete()`).

---

### 🧠 ¿Por qué es útil?

Ideal para:

- Simular respuestas asincrónicas en pruebas.
- Encapsular valores simples o estructuras complejas como observables.
- Iniciar flujos de datos con un estado conocido.

---

### 🔧 Sintaxis

```ts
import { of } from 'rxjs';

const obs$ = of(1, 2, 3, 4);
```

🔸 Este observable emitirá: `1`, `2`, `3`, `4` (uno a uno) y luego se completará.

---

### 📊 Diagrama de Mármol

```
of(1,2,3,4)
           |
           v
--[1][2][3][4]|-->
```

---

### 💡 Ejemplo comentado

```ts
import { of, Observable } from 'rxjs';

// 🔸 Crea un observable que emite varios tipos de valores (array, objeto, función, booleano, promesa)
const obs$: Observable<any> = of(
  [1, 2],
  { a: 1, b: 2 },
  function () {},
  true,
  Promise.resolve(true)
);

// 🔸 El observable emite sus valores de forma sincrónica
console.log("Inicio del obs$");

obs$.subscribe({
  next: value => console.log('siguiente [next]:', value),      // 👈 cada valor emitido
  error: error => console.error('error [obs]:', error),         // 👈 en caso de error (no aplica aquí)
  complete: () => console.warn('completado [obs]')              // 👈 se llama una vez al final
});

console.log("Fin del obs$");
```

#### 🧪 Resultado

```
Inicio del obs$
siguiente [next]: [1, 2]
siguiente [next]: { a: 1, b: 2 }
siguiente [next]: function () {}
siguiente [next]: true
siguiente [next]: Promise { <resolved>: true }
completado [obs]
Fin del obs$
```

🔸 **Nota**: Aunque se emite una promesa, `of()` no espera a que se resuelva; **solo la emite como valor**.

---

### ⚠️ Diferencias comunes

| Código                             | ¿Qué emite?                                     |
|-----------------------------------|-------------------------------------------------|
| `of(1, 2, 3)`                     | `1`, `2`, `3` (individuales)                    |
| `of([1, 2, 3])`                   | `[1, 2, 3]` (una sola emisión: el array entero) |
| `of(Promise.resolve(true))`      | Una **Promesa**, no su valor resuelto           |

--- 

##  `fromEvent` en RxJS
La función `fromEvent()` de RxJS permite **crear un observable a partir de eventos emitidos por objetos que implementan `EventTarget`**, como `document`, `window`, o cualquier elemento del DOM.

---

### 📌 Sintaxis básica

```ts
fromEvent<T>(target: EventTarget, eventName: string): Observable<T>
```

- `T`: Tipo del evento emitido (por ejemplo: `MouseEvent`, `KeyboardEvent`, `Event`…).
- `target`: Elemento que emitirá el evento (`document`, `button`, `input`, etc.).
- `eventName`: Nombre del evento a escuchar (`'click'`, `'keyup'`, `'input'`, etc.).

---

### ✅ Código completo comentado

```ts
import { fromEvent, Observer } from 'rxjs';

/**
 * Observador para manejar valores emitidos
 */
const observer: Observer<any> = {
    next: value => console.log('siguiente [next]: ', value),
    error: error => console.error('error [obs]:', error),
    complete: () => console.warn('completado [obs]')
};

/**
 * Observable que escucha clicks en el documento
 * Tipado como MouseEvent para acceder a propiedades como x, y, etc.
 */
const src1$ = fromEvent<MouseEvent>(document, 'click');

/**
 * Observable que escucha teclas presionadas en el documento
 * Tipado como KeyboardEvent para acceder a propiedades como key, code, etc.
 */
const src2$ = fromEvent<KeyboardEvent>(document, 'keyup');

/**
 * Subcripción al observable de clics
 * Extrae las coordenadas del evento (x, y) mediante desestructuración
 */
const subscription3 = src1$.subscribe(({ x, y }) =>
    console.log('Click en:', x, y)
);

/**
 * Subcripción al observable de teclado
 * Imprime la tecla presionada
 */
const subscription4 = src2$.subscribe(event =>
    console.log('Tecla presionada:', event.key)
);
```

---

### 🎯 Ventajas de usar `fromEvent()`

- Facilita trabajar con eventos del DOM como observables.
- Se puede aplicar cualquier operador RxJS (`filter`, `debounceTime`, `map`, etc.).
- Tipar el evento permite acceder directamente a sus propiedades con ayuda de TypeScript.

---

### 🔎 Tipos de eventos comunes

| Evento DOM   | Tipo de evento         |
|--------------|------------------------|
| `'click'`    | `MouseEvent`           |
| `'keyup'`    | `KeyboardEvent`        |
| `'scroll'`   | `Event` / `UIEvent`    |
| `'input'`    | `InputEvent` / `Event` |
| `'submit'`   | `SubmitEvent` / `Event`|

---

### 🧠 Nota importante

- El observable `fromEvent()` **no se completa por sí solo**. Debes manejar el `unsubscribe()` si es necesario.
- Muy útil en Angular o React para escuchar eventos de componentes y luego cancelarlos fácilmente.

---
Aquí tienes una versión organizada y comentada de tus apuntes en **Markdown**, con correcciones gramaticales y explicación detallada del código:

---

## Función `range` – RxJS

La función `range` de RxJS genera un **Observable sincrónico** que emite una secuencia de números dentro de un intervalo.

### Sintaxis

```ts
range(inicio?, cantidad, scheduler?)
```

* **inicio**: Número desde donde comenzará la secuencia (por defecto `0` si no se especifica).
* **cantidad**: Número total de elementos a emitir.
* **scheduler (opcional)**: Si se especifica un scheduler (por ejemplo `asyncScheduler`), la emisión se vuelve **asíncrona**.

---

### Características

* Si no se indica el valor inicial, comienza desde `0`.
* Por defecto es **sincrónica**.
* Puede convertirse en **asíncrona** usando un `Scheduler` como `asyncScheduler`.

---

### Diagrama de Mármol (Marble Diagram)

```text
range(1, 5)
Salida: ---[1][2][3][4][5]-|---->
```

---

### Ejemplo en Código

```ts
import { asyncScheduler, range } from 'rxjs';

// Ejemplo 1: Observable sincrónico desde 1, con 5 elementos
// const src$ = range(1, 5);

// Ejemplo 2: Observable desde -5, con 5 elementos
// const src$ = range(-5, 5);

// Ejemplo 3: Solo se indica la cantidad, empieza desde 0
// const src$ = range(10);

// Ejemplo 4: Conversión a asíncrono con asyncScheduler
const src$ = range(-5, 5, asyncScheduler);

// Mostrar flujo de ejecución
console.log('inicio');

// Suscripción al observable
src$.subscribe(console.log);

console.log('fin');
```

---

#### Comentarios sobre el Código

* `console.log('inicio')` y `console.log('fin')` sirven para demostrar **cuándo** se ejecutan las emisiones del Observable.
* Como se usa `asyncScheduler`, la emisión de valores se retrasa hasta el siguiente ciclo del event loop, por eso veremos:

  ```
  inicio
  fin
  -5
  -4
  -3
  -2
  -1
  ```

---
Aquí tienes los apuntes organizados en formato Markdown con explicación, comentarios, ejemplos y buenas prácticas sobre `interval` y `timer` de RxJS:

---

## Funcion RxJS - `interval` y `timer`

En RxJS, `interval` y `timer` son dos funciones para trabajar con **emisiones temporizadas**. Ambos devuelven `Observable<number>` que emiten valores asíncronamente.

---

### `interval(periodo: number)`

- Emite un valor cada **`periodo`** milisegundos, de forma indefinida.
- La emisión comienza tras el tiempo indicado.
- Por defecto, comienza en `0` y sigue con 1, 2, 3...
- No se completa automáticamente (∞).

```ts
import { interval } from 'rxjs';

const interval$ = interval(2000); // cada 2s

interval$.subscribe(console.log);

// Salida esperada:
// 0
// 1
// 2
// 3
````

---

### `timer(demora: number, intervalo?: number)`

#### Modo 1: Temporizador simple

* Emite **solo un valor (0)** después de `demora` milisegundos.
* Luego **se completa automáticamente**.

```ts
import { timer } from 'rxjs';

const timer$ = timer(1500); // una sola emisión tras 1.5s

timer$.subscribe(console.log);

// Salida esperada (tras 1.5s): 0
```

#### Modo 2: Temporizador + intervalo

* El primer valor se emite tras `demora`.
* Luego se comporta como un `interval`, emitiendo cada `intervalo` ms.

```ts
const timer$ = timer(2000, 1000); // espera 2s y emite cada 1s

timer$.subscribe(console.log);

// Salida esperada:
// (después de 2s) 0
// (cada 1s) 1, 2, 3...
```

#### Modo 3: Usar `Date` como fecha futura

```ts
const future = new Date();
future.setSeconds(future.getSeconds() + 5);

const timer$ = timer(future);

timer$.subscribe(console.log);

// Emitirá 0 exactamente dentro de 5s desde "ahora"
```

### Modo 4: Emitir un observable tras un retardo usando `timer` + `switchMap`


```ts
import { of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Creamos un observable simple con 2 frutas
const obs$ = of('Melon', 'Sandia');

// A los 2 segundos, se ejecuta el switchMap y comienza a emitir el obs$
const timer$ = timer(2000).pipe(
    switchMap(() => obs$)
);

console.log('inicio');
timer$.subscribe({
    next: val => console.log('next:', val),
    complete: () => console.warn('completado')
});
console.log('fin');

/*
📝 Salida esperada:
inicio
(fin aparece inmediatamente)
(tras 2 segundos)
next: Melon
next: Sandia
completado
*/
```

### Modo 5: Cancelar una suscripción automáticamente con `takeUntil`

```ts
import { fromEvent, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Escucha clics en el documento
const obs$ = fromEvent(document, 'click');

// Cancela la suscripción automáticamente tras 1 segundo
obs$
    .pipe(
        takeUntil(timer(1000)) // ⏱️ El observable se completa cuando pasa 1 segundo
    )
    .subscribe({
        next: val => console.log('click', val),
        complete: () => console.warn('completado') // Se ejecuta al finalizar
    });

/*
📝 Salida esperada:
(clicks durante el primer segundo serán registrados)
Después de 1 segundo: "completado"
*/
```
---

### Comparación

| Característica      | `interval` | `timer`                 |
| ------------------- | ---------- | ----------------------- |
| Emite múltiples     | ✅ Sí       | 🚫 (por defecto solo 1) |
| Emisión única       | ❌          | ✅                       |
| Se completa solo    | ❌          | ✅                       |
| Puede ser periódica | ✅          | ✅ (modo 2)              |
| Asíncrono           | ✅          | ✅                       |

---

### Código de ejemplo comentado

```ts
import { interval, timer } from "rxjs";

const observer = {
  next: value => console.log('next:', value),
  error: err => console.error('error:', err),
  complete: () => console.warn('completado')
};

// --- Ejemplo 1: Emisión asíncrona con interval y timer ---
const interval$ = interval(2000);
const timer$ = timer(1500);

console.log('inicio');
interval$.subscribe(observer);
timer$.subscribe(observer);
console.log('fin');

// Salida esperada:
// inicio
// fin
// (tras 1.5s): next: 0
// (tras 2s): next: 0
// (tras 4s): next: 1 ...
```

---

### Observaciones

* Ambos operadores son **asíncronos**, por lo que `console.log('fin')` se muestra antes que las emisiones.
* Puedes usar un `Date` en `timer()` para coordinar acciones futuras con precisión.
* `interval` nunca se completa por sí solo. Usa `take`, `takeUntil`, etc., si quieres controlarlo.

---

### Buenas prácticas

✅ Siempre usar un `observer` con `next`, `error` y `complete` para depurar correctamente.
⚠️ Recuerda limpiar las suscripciones si no usas operadores como `take()` o `unsubscribe()` manualmente.

---

📚 Más info en: [RxJS - timer](https://rxjs.dev/api/index/function/timer) | [RxJS - interval](https://rxjs.dev/api/index/function/interval)

---

## Funcion RxJS - `aysncScheduler`


El `asyncScheduler` de RxJS es una herramienta avanzada que **simula el comportamiento de `setTimeout` y `setInterval`**, pero con el poder de RxJS y su sistema de planificación.

> Crea una subcripción (_el resutlado de un .subscribe()_ )

#### 📌 ¿Qué es un Scheduler?

Un `Scheduler` en RxJS gestiona **cuándo** se ejecuta una tarea. `asyncScheduler` utiliza la **cola de tareas del navegador**, como lo haría `setTimeout`.

---

### 🔹 Ejecutar una función con retardo (como `setTimeout`)

```ts
import { asyncScheduler } from 'rxjs';

const saludar = () => console.log('Hola Mundo.');
const saludar2 = nombre => console.log(`Hola ${nombre}`);
const saludar3 = p => console.log(`Hola ${p.name} & ${p.surname}`);
```

#### ✅ Ejecución retrasada:

```ts
asyncScheduler.schedule(saludar2, 2000, 'Andres');
// Salida después de 2 segundos: Hola Andres

asyncScheduler.schedule(saludar3, 2000, { name: 'Andres', surname: 'Ruiz' });
// Salida después de 2 segundos: Hola Andres & Ruiz
```

#### ❌ No permitido:

```ts
// asyncScheduler(saludar3, 2000, 'Andres', 'Ruiz'); ❌
// Solo se permite **un** argumento como estado inicial
```

> El tercer parámetro es el `state` (estado inicial), que puede ser un número, string, objeto, etc.

---

### 🔁 Simular `setInterval` con `asyncScheduler.schedule`

```ts
const subs = asyncScheduler.schedule(function(state) {
  console.log('state:', state);
  this.schedule(state + 1, 1000); // reprograma con nuevo estado
}, 3000, 0);
```

#### 🧠 Explicación:

* A los 3 segundos (delay = 3000) se ejecuta esta función.
* Muestra el `state` actual por consola.
* Se **reprograma a sí misma** (como un `setInterval`) aumentando el `state`.
* Se llama a sí misma cada 1 segundo.

---

### ❌ Cancelar la suscripción (como `clearInterval`)

Hay 2 formas de detener esta repetición:

#### ✅ Opción A: Usar `setTimeout`

```ts
setTimeout(() => {
  subs.unsubscribe(); // Detiene la ejecución
}, 6000);
```

#### ✅ Opción B: Usar `asyncScheduler` para cancelar

```ts
asyncScheduler.schedule(() => subs.unsubscribe(), 6000);
```

> Esta es la forma **reactiva y elegante** de cancelar usando el propio `Scheduler`.

---

### 🧩 Resumen de funciones `asyncScheduler`

| Función                      | Equivalente JS                   | Explicación                                          |
| ---------------------------- | -------------------------------- | ---------------------------------------------------- |
| `schedule(fn, delay, state)` | `setTimeout`                     | Ejecuta `fn` una vez después de `delay` ms           |
| `schedule(...)` recursivo    | `setInterval`                    | Se reprograma a sí mismo usando `this.schedule(...)` |
| `unsubscribe()`              | `clearTimeout` / `clearInterval` | Cancela la ejecución programada                      |

---

### ✅ Conclusión

* `asyncScheduler` permite mayor control sobre la planificación temporal.
* Ideal cuando trabajas con RxJS y necesitas reemplazar `setTimeout` y `setInterval`.
* Requiere funciones puras y controladas (no múltiples argumentos, solo `state`).
* Puedes anidar y cancelar tareas de forma elegante.

---