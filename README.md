# a-letter-for-you

Una carta digital moderna, elegante y romántica. Diseñada para expresar sentimientos de forma sincera, respetuosa y madura.

## 🌸 Demo

Abre `index.html` en tu navegador o despliega en GitHub Pages.

## 📁 Estructura

```
a-letter-for-you/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos completos
├── js/
│   ├── main.js         # Lógica (animaciones, acordeones, reproductor, formulario)
│   └── supabase.js     # Preparado para conectar Supabase
├── assets/
│   ├── images/         # Coloca imágenes aquí
│   ├── music/          # Coloca archivos .mp3 aquí
│   └── icons/          # Coloca iconos personalizados aquí
└── README.md
```

## 🚀 Ejecución local

No requiere dependencias ni instalación. Solo abre el archivo:

```bash
open index.html
```

O sirve con un servidor local (recomendado):

```bash
# Con Python
python3 -m http.server 8000

# Con Node.js (npx)
npx serve .
```

Luego visita `http://localhost:8000`.

## 🎵 Agregar música

1. Coloca tu archivo `.mp3` en `assets/music/`
2. Nómbralo `song.mp3`, `music.mp3`, `audio.mp3` o `track.mp3`
3. Abre la página y presiona el botón Play

## 🌍 Despliegue en GitHub Pages

1. Crea un repositorio en GitHub
2. Sube todos los archivos conservando la estructura
3. Ve a **Settings > Pages**
4. En "Source", selecciona `main` y `/ (root)`
5. Guarda. Tu página estará disponible en `https://tu-usuario.github.io/a-letter-for-you/`

## 🗄️ Conectar Supabase (opcional)

Para guardar las respuestas del formulario en la nube:

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. En el SQL Editor, ejecuta:

```sql
CREATE TABLE messages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

3. En `js/supabase.js`, reemplaza los valores de `SUPABASE_URL` y `SUPABASE_ANON_KEY`
4. Descomenta el código real y elimina el bloque de demo/fallback

## ✨ Personalización

- **Contenido de la carta**: Edita el texto dentro de la sección `#carta` en `index.html`
- **Colores**: Modifica las variables CSS al inicio de `css/style.css`
- **Secciones**: Cada sección en `index.html` está comentada para edición rápida

## 📄 Licencia

Libre para uso personal.
