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

