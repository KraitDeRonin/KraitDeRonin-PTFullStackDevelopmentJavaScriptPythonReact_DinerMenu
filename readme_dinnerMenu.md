# 🍽️ Restaurante JavaScript

Sistema interactivo de toma de pedidos por consola del navegador. Muestra el menú correspondiente según la hora del día, permite al usuario elegir platos de cuatro tiempos y genera un ticket de compra al finalizar.

---

## ¿Cómo funciona?

El programa sigue este flujo al ejecutarse:

**1. Solicita la hora actual** — El usuario introduce la hora en formato `HH:MM`. En función de ese valor, el sistema asigna automáticamente el menú correspondiente:

| Franja horaria | Menú asignado |
|---|---|
| 06:00 – 11:59 | Desayuno |
| 12:00 – 19:59 | Almuerzo |
| 20:00 – 05:59 | Cena |

**2. Toma el pedido en cuatro tiempos** — Para cada tiempo (primero, segundo, postre y extras), muestra los platos disponibles con su precio y pide al usuario que elija.

**3. Genera el ticket** — Al completar los cuatro tiempos, muestra un resumen con los platos elegidos, los precios y el total a pagar.

---

## Instrucciones de uso

### Introducir la hora

- El formato debe ser `HH:MM`, con horas y minutos separados por dos puntos.
- Se aceptan tanto `09:00` como `9:00`.
- No se acepta dejar el campo vacío ni pulsar Cancelar.

```
✓ Correcto:   09:00 · 14:30 · 21:45 · 0:00
✗ Incorrecto: 9h · 14.30 · mediodía · (vacío)
```

### Elegir un plato

- **No hace falta escribir el nombre completo.** El sistema busca coincidencia parcial, así que con escribir una palabra clave es suficiente.
- El texto no distingue entre mayúsculas y minúsculas.
- Si no quieres pedir ese tiempo, escribe `ninguno` y el sistema lo omitirá.

```
✓ "entrecot"  →  encuentra "entrecot con patatas"
✓ "Salmon"    →  encuentra "salmon a la plancha"
✓ "ninguno"   →  omite ese tiempo del pedido
```

---

## Menús disponibles

<details>
<summary><strong>🥐 Desayuno</strong></summary>

| Tiempo | Plato | Precio |
|---|---|---|
| Primero | Tostada con tomate | 2,50 € |
| Primero | Croissant | 1,80 € |
| Primero | Tortilla de patata | 3,50 € |
| Segundo | Huevos revueltos | 4,00 € |
| Segundo | Tortitas con caramelo | 4,50 € |
| Segundo | Sandwich mixto | 3,00 € |
| Postre | Macedonia de fruta | 2,50 € |
| Postre | Yogur griego | 2,00 € |
| Postre | Zumo de naranja | 2,20 € |
| Extra | Café | 1,50 € |
| Extra | Té verde | 1,60 € |
| Extra | Extra de bacon | 1,20 € |

</details>

<details>
<summary><strong>🥗 Almuerzo</strong></summary>

| Tiempo | Plato | Precio |
|---|---|---|
| Primero | Ensalada César | 6,50 € |
| Primero | Crema de calabacín | 5,50 € |
| Primero | Gazpacho | 5,00 € |
| Segundo | Entrecot con patatas | 14,50 € |
| Segundo | Salmón a la plancha | 13,00 € |
| Segundo | Lasaña boloñesa | 10,50 € |
| Postre | Tarta de queso | 4,50 € |
| Postre | Flan casero | 3,50 € |
| Postre | Helado de vainilla | 3,00 € |
| Extra | Patatas fritas | 3,00 € |
| Extra | Croquetas | 4,50 € |
| Extra | Nachos con queso | 5,00 € |

</details>

<details>
<summary><strong>🌙 Cena</strong></summary>

| Tiempo | Plato | Precio |
|---|---|---|
| Primero | Sopa de picadillo | 5,00 € |
| Primero | Verduras salteadas | 6,00 € |
| Primero | Provolone fundido | 6,50 € |
| Segundo | Hamburguesa gourmet | 11,50 € |
| Segundo | Tacos de pollo | 9,50 € |
| Segundo | Pizza margarita | 9,00 € |
| Postre | Brownie con helado | 5,00 € |
| Postre | Sorbete de limón | 3,50 € |
| Postre | Fruta del tiempo | 2,00 € |
| Extra | Aros de cebolla | 3,50 € |
| Extra | Pan de ajo | 2,80 € |
| Extra | Boniatos fritos | 3,20 € |

</details>

---

## Tecnologías

- JavaScript vanilla (sin dependencias)
- `prompt()` y `alert()` del navegador para la interacción
- Expresiones regulares para la validación de formato de hora
- Gestión de errores con `try...catch` y bucles `do...while`

---

## Ejecutar el proyecto

Al ser JavaScript puro para navegador, no necesita instalación ni servidor. Basta con:

1. Abrir en cualquier navegador.
2. El programa arranca automáticamente al cargar la página.
3. Seguir las instrucciones de los diálogos emergentes.

> **Nota:** Algunos navegadores bloquean los `prompt()` si el fichero se abre directamente como `file://`. Si no aparecen los diálogos, prueba a servir el proyecto con una extensión como **Live Server** en VS Code.

---

## Estructura del código

```
├── index.html
└── script.js
    ├── MENSAJES_EXITO / MENSAJES_ERROR   — Respuestas aleatorias de feedback
    ├── MENUS                             — Carta completa (desayuno, almuerzo, cena)
    ├── obtenerHoraValida()               — Solicita y valida la hora en formato HH:MM
    ├── pedirPlato()                      — Muestra el menú y valida la elección del usuario
    └── generarFactura()                  — Calcula el total y muestra el ticket final
```
