# Dragon Ball Game 2.0

Juego local para dos jugadores con selección de personajes, barras de vida, ki y energía, y técnicas específicas por personaje.

## Jugar

La versión compilada está incluida. Desde esta carpeta ejecuta:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Abre http://127.0.0.1:8080, introduce los nombres, elige un personaje por jugador y pulsa **JUGAR** en ambas columnas.

## Controles

- **Cargar ki:** recupera 10 de ki y 15 de energía, hasta 100.
- **Ataque básico:** causa 10 de daño; consume 10 de ki y 5 de energía. El nombre de técnica depende del personaje seleccionado.
- **Ataque especial:** causa 25 de daño; consume 20 de ki y 15 de energía. El nombre de técnica depende del personaje seleccionado.
- **Semilla:** restaura vida, ki y energía; dos por jugador.

Los ataques se desactivan cuando faltan recursos. Al atacar se muestra una ventana temporal con la técnica y el retrato del personaje. El combate termina cuando un jugador se queda sin vida. Recarga la página para empezar otra partida.

## Archivos principales

- `index.html`: estructura de la interfaz y controles de los dos jugadores.
- `src/index.js`: selección, preparación de jugadores, recursos, daño y fin de combate.
- `src/Acciones.js` y `src/Personaje.js`: reglas de estadísticas y acciones de combate.
- `src/evolucion.js`: nombres de técnicas por personaje, cambios de sprite y ventana temporal del ataque.
- `src/style.css`: presentación adaptable a escritorio y móvil.
- `public/img/DB/`: sprites base y sprites por acción de cada personaje.
- `bundle.js` y `public/bundle.js`: JavaScript compilado que permite abrir la versión incluida.

Para revisar los cambios, empieza por `index.html`, `src/index.js`, `src/evolucion.js` y `src/style.css`.

## Desarrollo

```bash
npm ci
npm run build
```

El código fuente está en `src/` y los recursos en `public/`. La compilación actualiza `public/bundle.js` y `bundle.js`.
