
## 🧠 ¿Qué son los operadores en RxJS?

Los **operadores** son funciones puras que **no modifican el Observable original**, sino que devuelven uno nuevo con el resultado de la transformación.

> En otras plablas, en RxJS, **los operadores** son funciones que te permiten **transformar, filtrar, combinar, controlar y gestionar flujos de datos** de Observables de forma declarativa y poderosa.

> 🔧 Se usan principalmente con el método `.pipe()` del Observable.

---

## 📚 Clasificación de operadores RxJS

Los operadores en RxJS se pueden clasificar en categorías:

### 1. 🔄 **Transformación**

Transforman los valores emitidos por un Observable.

| Operador | Descripción                                           |
| -------- | ----------------------------------------------------- |
| `map`    | Aplica una función a cada valor emitido.              |
| `pluck`  | Extrae una propiedad específica de un objeto emitido. |
| `mapTo`  | Reemplaza cada valor por un valor fijo.               |
| `scan`   | Acumula valores como un `reduce`.                     |

```ts
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3).pipe(
        map(x => x * 10)
).subscribe(console.log); // 10, 20, 30
```

#### Cando usar `mapTo`

Se recomienda usar mapTo:
* Cuando no necesitas el valor original: Si el valor emitido por el observable no es relevante para tu lógica y solo necesitas emitir un valor fijo.
* Para simplificar transformaciones: Si siempre deseas emitir el mismo valor en respuesta a cualquier emisión, mapTo es más conciso que usar map con una función.
* En combinación con otros operadores: Es común usarlo en flujos donde solo necesitas emitir un valor constante como parte de una secuencia más compleja.

---

### 2. ⚡ **Filtrado**

Permiten dejar pasar ciertos valores y descartar otros.

| Operador                           | Descripción                                        |
| ---------------------------------- | -------------------------------------------------- |
| `filter`                           | Filtra los valores según condición.                |
| `take(n)`                          | Toma solo los primeros `n` valores.                |
| `first`, `last`                    | Toman el primer o último valor.                    |
| `skip(n)`                          | Omite los primeros `n` valores.                    |
| `distinct`, `distinctUntilChanged` | Evita valores duplicados o repetidos consecutivos. |

---

### 3. 🔀 **Combinación**

Permiten combinar varios Observables.

| Operador         | Descripción                                            |
| ---------------- | ------------------------------------------------------ |
| `merge`          | Combina múltiples Observables (intercalados).          |
| `concat`         | Emite Observables en orden, uno tras otro.             |
| `combineLatest`  | Emite valores combinados cuando **todos** han emitido. |
| `withLatestFrom` | Combina con el último valor de otro observable.        |
| `zip`            | Une los valores por posición (como un zip).            |

---

### 4. 🕹️ **Creación**

Operadores para crear nuevos Observables.

| Operador            | Descripción                                |
| ------------------- | ------------------------------------------ |
| `of`                | Crea un observable a partir de argumentos. |
| `from`              | Crea desde array, promesa, iterable.       |
| `interval`, `timer` | Crea observables temporales.               |
| `range`             | Emite una secuencia numérica.              |
| `generate`          | Como un bucle for reactivo.                |

---

### 5. 🧵 **Control de flujo (time)**

Controlan la emisión temporalmente.

| Operador           | Descripción                          |
| ------------------ | ------------------------------------ |
| `debounceTime(ms)` | Espera a que termine el flujo.       |
| `throttleTime(ms)` | Limita la frecuencia de emisiones.   |
| `delay(ms)`        | Retrasa cada emisión.                |
| `timeout(ms)`      | Error si no emite dentro del tiempo. |

---

### 6. 🔄 **Reintentos y errores**

Manejo de errores y reintentos.

| Operador     | Descripción                                     |
| ------------ | ----------------------------------------------- |
| `catchError` | Captura errores y continúa con otro Observable. |
| `retry(n)`   | Reintenta n veces si hay error.                 |
| `retryWhen`  | Reintenta según lógica personalizada.           |

---

### 7. 🧭 **Alta Orden / Observables de Observables**

Operan sobre Observables que emiten otros Observables.

| Operador               | Descripción                                             |
| ---------------------- | ------------------------------------------------------- |
| `mergeMap` / `flatMap` | Mapea y aplana al mismo tiempo (como `Promise.all`).    |
| `switchMap`            | Cancela el observable anterior y se queda con el nuevo. |
| `concatMap`            | Cola cada uno en orden.                                 |
| `exhaustMap`           | Ignora nuevos si uno ya está activo.                    |

---

## 📌 Ejemplo Real con varios operadores

```ts
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime } from 'rxjs/operators';

const input = document.querySelector('input');

fromEvent(input, 'input').pipe(
        map(event => event.target.value),
        filter(text => text.length > 2),
        debounceTime(300)
).subscribe(console.log);
```

✅ Este código:

* Lee la entrada del usuario.
* La transforma en el valor del campo.
* Filtra textos con más de 2 caracteres.
* Espera 300ms sin cambios antes de emitir.

---

## ✅ Conclusión

* Los **operadores son el corazón de RxJS**.
* Te permiten manejar flujos de eventos complejos de forma declarativa.
* `.pipe()` te permite **encadenar operadores** para construir flujos potentes.

---
