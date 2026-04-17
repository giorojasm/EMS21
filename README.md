# 🎓 EMS.21 - Colegio Venecia I.E.D.
## Animaciones y Mejoras de Experiencia Visual

### 📁 Archivos Incluidos

```
/colegio/
├── styles.css          # CSS con todas las animaciones + modo oscuro
├── animations.js       # JavaScript para efectos interactivos + theme toggle
├── index.html          # Página principal mejorada
├── Contacto.html       # Formulario con animaciones
├── Galeria.html        # Galería con lightbox mejorado
├── ingles.html         # Cultura Anglófona con flip cards
└── CYP.html            # Comunicación y Procesos
```

---

## 📱 MENÚ HAMBURGUESA MÓVIL (NUEVO)

### Características:
- ✅ **Botón animado** - 3 líneas que se transforman en X
- ✅ **Slide-in suave** - Menú desliza desde la derecha
- ✅ **Overlay con blur** - Fondo oscurecido con desenfoque
- ✅ **Items escalonados** - Cada link aparece con delay
- ✅ **Cierre automático** - Al hacer click en link o overlay
- ✅ **Accesibilidad** - Soporte para teclado (Escape)
- ✅ **Responsive** - Se activa solo en pantallas < 769px

### Breakpoints:
| Pantalla | Comportamiento |
|----------|----------------|
| > 768px | Menú horizontal normal |
| ≤ 768px | Menú hamburguesa activo |
| ≤ 400px | Logo solo con imagen |

---

## 🌙 MODO OSCURO

### Características:
- ✅ **Toggle flotante** con iconos animados (☀️/🌙)
- ✅ **Persistencia** - Recuerda la preferencia del usuario
- ✅ **Auto-detección** - Respeta la configuración del sistema
- ✅ **Sin flash** - No hay parpadeo al cargar la página
- ✅ **Transiciones suaves** - Cambio de colores animado (0.4s)

### Colores del Modo Oscuro:
| Elemento | Modo Claro | Modo Oscuro |
|----------|------------|-------------|
| Fondo | #f5f8fa | #0f172a |
| Cards | #ffffff | #1e293b |
| Texto | #1f2937 | #f3f4f6 |
| Primary | #1a73e8 | #60a5fa |
| Accent | #ff6b35 | #f97316 |

---

## ✨ Animaciones Implementadas

### 🏠 **Página Principal (index.html)**
| Efecto | Descripción |
|--------|-------------|
| **Preloader** | Spinner de carga inicial |
| **Header Slide** | Navegación aparece desde arriba |
| **Hero Parallax** | Efecto de profundidad al hacer scroll |
| **Gradient Pulse** | Animación sutil en el fondo del hero |
| **Cards Reveal** | Tarjetas aparecen al hacer scroll |
| **Stagger Animation** | Entrada escalonada de elementos |
| **Nav Underline** | Línea animada bajo links activos |

### 📸 **Galería (Galeria.html)**
| Efecto | Descripción |
|--------|-------------|
| **Folder Bounce** | Rebote en carpetas al hover |
| **Album Slide** | Álbumes se despliegan suavemente |
| **Image Zoom** | Imágenes se amplían al hover |
| **Lightbox Fade** | Modal con transición elegante |
| **Keyboard Navigation** | Flechas para navegar imágenes |

### 📝 **Contacto (Contacto.html)**
| Efecto | Descripción |
|--------|-------------|
| **Input Focus Glow** | Resplandor azul en campos activos |
| **Shake on Error** | Sacudida cuando hay errores |
| **Success Checkmark** | Animación de éxito al enviar |
| **Confetti** | Celebración con confetti colorido |
| **Button Ripple** | Efecto ondulante en botones |

### 🎴 **Flip Cards (ingles.html)**
| Efecto | Descripción |
|--------|-------------|
| **3D Flip** | Volteo realista al hover |
| **Shadow Animation** | Sombras dinámicas |
| **Icon Scale** | Iconos crecen al pasar mouse |
| **Gradient Back** | Reverso con degradado animado |

---

## 🛠️ Instrucciones de Uso

### 1. **Copiar Archivos**
Copia estos archivos a tu carpeta del proyecto:
- `styles.css` (reemplaza tu archivo actual)
- `animations.js` (archivo nuevo)

### 2. **Agregar Script Anti-Flash**
En cada archivo HTML, agrega en el `<head>` (ANTES del CSS):
```html
<script>
  (function() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
</script>
```

### 3. **Agregar Script Principal**
Agrega antes de `</body>`:
```html
<script src="animations.js"></script>
```

---

## 🎨 Personalización de Colores

Edita las variables CSS al inicio de `styles.css`:

```css
/* Modo Claro */
:root {
  --primary: #1a73e8;       /* Color principal */
  --primary-dark: #0c47a1;  /* Color oscuro */
  --accent: #ff6b35;        /* Color de acento */
}

/* Modo Oscuro */
[data-theme="dark"] {
  --primary: #60a5fa;       /* Azul más claro para contraste */
  --bg-main: #0f172a;       /* Fondo oscuro */
}
```

---

## 📱 Responsive

Todas las animaciones están optimizadas para:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (hasta 767px)

El botón de tema se ajusta automáticamente en móvil.

---

## ⚡ Características Adicionales

1. **Back to Top Button** - Aparece automáticamente al scrollear
2. **Smooth Scroll** - Navegación suave entre secciones
3. **Header Hide/Show** - Se oculta al bajar, aparece al subir
4. **Lazy Loading** - Imágenes cargan al llegar a la vista
5. **Keyboard Accessibility** - Focus visible para navegación por teclado
6. **Theme Toggle** - Botón flotante para cambiar tema
7. **Menú Hamburguesa** - Navegación móvil animada

---

## 🌓 Cómo Funciona el Modo Oscuro

1. **Detección inicial**: Al cargar, verifica:
   - Si hay preferencia guardada en localStorage
   - Si no, usa la preferencia del sistema operativo

2. **Persistencia**: Guarda la preferencia en localStorage

3. **Sin flash**: Un script inline en el `<head>` aplica el tema antes de que se renderice el CSS

4. **Transiciones**: Todos los colores cambian con transición de 0.4s para suavidad

---

**© 2025 Educación Media Para El Siglo XXI EMS**
