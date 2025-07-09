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
