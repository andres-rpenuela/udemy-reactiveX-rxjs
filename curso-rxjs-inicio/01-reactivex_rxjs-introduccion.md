
# 🌀 ReactiveX - RxJS: De cero hasta los detalles

## 📑 Índice

1. [Introducción](#introducción)
2. [¿Qué es ReactiveX (RxJS)?](#qué-es-reactivex-rxjs)
3. [Principios Fundamentales](#principios-fundamentales)  
   3.1 [Patrón Observer](#patrón-observer)  
   3.2 [Patrón Iterator](#patrón-iterator)  
   3.3 [Programación Funcional](#programación-funcional)
4. [¿Cuándo usar RxJS?](#cuándo-usar-rxjs)
5. [Piezas fundamentales de la programación reactiva](#piezas-fundamentales-de-la-programación-reactiva)  
   5.1 [Observables](#observables)  
   5.2 [Subscriptions](#subscriptions)  
   5.3 [Operadores](#operadores)
6. [Diagramas de Canicas](#diagramas-de-canicas-marble-diagrams)
7. [Ejemplo práctico con operador `scan`](#ejemplo-práctico-con-operador-scan)
8. [Recursos oficiales](#recursos-oficiales)

---

## Introducción

Usar la **programación reactiva** tiene mucho sentido cuando estás trabajando con **datos asincrónicos, eventos, streams o valores que cambian con el tiempo**, especialmente en aplicaciones modernas como Angular, React o Node.js. Con este enfoque, se evitan recargas innecesarias de la página o recreación completa de componentes para actualizar la información.

---

## ¿Qué es ReactiveX (RxJS)?

**RxJS (Reactive Extensions for JavaScript)** es una biblioteca para componer **programación asíncrona y basada en eventos** mediante el uso de **Observables**.

Es parte del ecosistema **ReactiveX**, que existe en múltiples lenguajes (Java, .NET, Python, Swift, etc.).

Su principal beneficio es evitar el temido **"callback hell"** (llamadas dentro de llamadas) y el caos de las promesas anidadas. En lugar de encadenar `.then()`, puedes usar operadores como `map`, `mergeMap`, `switchMap`, etc.

```ts
// Con RxJS:
http.get('/usuarios')
  .pipe(
    switchMap(user => http.get(`/detalle/${user.id}`))
  )
  .subscribe(console.log);
```

RxJS combina tres enfoques clave:

- **Patrón Observer**
- **Patrón Iterator**
- **Programación funcional**

---

## Principios Fundamentales

### Patrón Observer

Permite que un objeto (Observable) notifique a varios objetos (Observers) cuando su estado cambia.

**Ejemplo:**
- Observable: Semáforo
- Observers: Coches que circulan por la vía

### Patrón Iterator

Interfaz que permite acceder secuencialmente a los elementos de una colección. Muy usado en programación orientada a objetos.

### Programación funcional

Se basa en funciones puras, **sin efectos secundarios** y que **no mutan datos**. Favorece el código limpio, predecible y componible.

---

## ¿Cuándo usar RxJS?

- Cuando hay **eventos constantes** en la interfaz del usuario.
- Para **escuchar cambios** entre múltiples objetos relacionados.
- En **comunicaciones por sockets** o WebSockets.
- Al trabajar con **streams de datos** (teclado, sensores, APIs en tiempo real).

---

## Piezas fundamentales de la programación reactiva

### Observables

- Fuente de información que puede emitir **cero, uno o múltiples valores**.
- Puede terminar exitosamente o con un **error**.
- Puede ser **finito o infinito**, **síncrono o asíncrono**.

### Subscriptions

- Un **observer** se suscribe a un observable.
- Puede recibir:
    - Valores emitidos (`next`)
    - Errores (`error`)
    - Finalización (`complete`)
- La suscripción **desconoce cómo se generó** la información: si fue transformada, combinada, etc.

### Operadores

Permiten transformar, filtrar o combinar observables antes de que lleguen a la suscripción.

#### Tipos de operadores:

- **Transformación:** `map`, `scan`, `pluck`
- **Filtrado:** `filter`, `distinct`, `debounceTime`, `skip`
- **Combinación:** `merge`, `concat`, `combineLatest`, `zip`
- **Creación:** `of`, `from`, `interval`, `timer`

---

## Diagramas de Canicas (Marble Diagrams)

Representan visualmente cómo fluyen y se transforman los valores emitidos por un Observable a través del tiempo y operadores.

```
Observable original:
cliks$:   ------[1]----[2]----[3][4]----[5]-----|--->

Operador aplicado (ej: map o scan):
           ------[1]----[2]----[6][10]--X-------->
```

Leyenda:
- `[x]`: valor emitido
- `|`: fin del Observable
- `X`: error
- `------`: paso del tiempo
- `algúnOperador()`: operadoro o transformación

---

## Ejemplo práctico con operador `scan`

```ts
import { interval } from 'rxjs';
import { scan, take } from 'rxjs/operators';

const intervalo$ = interval(1000).pipe(
  take(6), // Emite 6 valores: 0...5
  scan((acc, val) => acc + val, 0)
);

intervalo$.subscribe(console.log);
```

### Salida esperada:

```
0 -> 0
1 -> 1
2 -> 3
3 -> 6
4 -> 10
5 -> 15
```

`scan` actúa como un **acumulador** (similar a `reduce`, pero emite en cada paso).

---

## Recursos oficiales

- 🌐 [rxjs-dev](https://rxjs-dev.firebaseapp.com/api)
- 🌐 [reactivex.io](https://reactivex.io/documentation/observable.html)
