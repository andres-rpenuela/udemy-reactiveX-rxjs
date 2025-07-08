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
