# 🌟 Camino de Gracia — Centro de Entrenamiento Teológico

**Camino de Gracia** es una plataforma educativa premium, interactiva y de alto impacto visual diseñada para la enseñanza y el aprendizaje dinámico de la **Teología del Nuevo Pacto** y la tipología bíblica (sombras y figuras del Antiguo Testamento cumplidas en Jesucristo).

Inspirada en las mejores mecánicas de gamificación de plataformas modernas como Duolingo, Camino de Gracia ofrece un ecosistema de aprendizaje con transiciones fluidas de **Framer Motion**, base de datos en tiempo real con **Firebase**, persistencia local automatizada y un robusto panel de gestión de contenidos (CMS) de nivel profesional.

---

## 🚀 Características Principales

*   **🎮 Modo Batalla contra la IA (Trivia)**: Desafía tu conocimiento teológico contra un bot inteligente en una trivia de alta velocidad (15 segundos por pregunta) con multiplicadores y bonificaciones de velocidad.
*   **🗺️ Ruta del Pacto (Duolingo-Style)**: Un mapa de aprendizaje guiado y secuencial compuesto por unidades temáticas desbloqueables que evalúan el discernimiento teológico.
*   **⚔️ Torneos en Vivo (Multijugador)**: Crea o únete a arenas competitivas sincronizadas en tiempo real a través de **Firebase Firestore**, permitiendo disputas teológicas grupales y tablas de posiciones instantáneas.
*   **📖 Símbolos y Tipología (Glosario)**: Diccionario teológico que conecta los ritos, sacerdocios y sacrificios históricos (la sombra) con su cumplimiento en el Nuevo Testamento (la realidad).
*   **🛠️ Gestor CMS Administrativo Integrado**: Panel interactivo avanzado para administradores y educadores, que permite modificar, añadir o eliminar unidades, lecciones y preguntas doctrinalmente complejas de forma visual o editando el código JSON de manera directa, con persistencia inmediata en `localStorage` y sincronización en la nube.

---

## 🛠️ Stack Tecnológico

*   **Core**: React 19, TypeScript, Vite
*   **Estilos**: Tailwind CSS, CSS modular premium (Fondo espacial `#0B0F19`, Tarjetas `#161F30`, Bordes `#25354F`)
*   **Animaciones**: Framer Motion (`framer-motion`/`motion/react`)
*   **Base de datos y Autenticación**: Firebase Web SDK v9+ (Firestore, Auth anónimo y Custom Tokens)
*   **Iconografía**: Lucide React

---

## 💻 Configuración Local e Instalación

### Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada) y un gestor de paquetes (`npm` o `yarn`).

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/camino-de-gracia.git
cd camino-de-gracia
```

### 2. Instalar dependencias
Instala las dependencias y paquetes de producción de forma limpia:
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` o `.env.local` en la raíz del proyecto y toma como referencia el archivo de ejemplo [.env.example](.env.example):
```bash
cp .env.example .env.local
```
Edita el archivo `.env.local` y define tu clave de API de Gemini y tu URL de despliegue si utilizas funciones o integraciones de IA avanzada.

### 4. Ejecutar el servidor de desarrollo
Inicia el servidor local de Vite a través de:
```bash
npm run dev
```
Abre tu navegador en `http://localhost:3000` para interactuar con la aplicación.

---

## 🗃️ Configuración de Firebase (Opcional)

Para habilitar la sincronización de salas en vivo en el Torneo Multijugador y publicar contenidos en la nube desde el CMS, configura tu base de datos de Firebase:
1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Habilita **Cloud Firestore** y **Autenticación Anónima**.
3. Registra una aplicación web e inyecta la configuración en tu entorno local.
4. Las colecciones utilizadas por la app para sincronizar son:
    *   **Contenidos y Currículum**: `artifacts/{appId}/public/data/curriculum/main`
    *   **Salas en Vivo (Lobbies)**: `artifacts/{appId}/public/data/lobbies/{lobbyCode}`

---

## ☁️ Despliegue en Vercel

Desplegar Camino de Gracia en **Vercel** es rápido y directo. Sigue estos pasos:

### Opción A: Despliegue con un Clic (Vercel CLI)
1. Instala el CLI de Vercel globalmente si no lo tienes:
   ```bash
   npm install -g vercel
   ```
2. Ejecuta el comando de despliegue desde la raíz del proyecto:
   ```bash
   vercel
   ```
3. Sigue las instrucciones interactivas en pantalla, acepta los valores predeterminados de Vite y, cuando el despliegue de prueba finalice, publícalo en producción con:
   ```bash
   vercel --prod
   ```

### Opción B: Integración con GitHub (Recomendado)
1. Sube tu repositorio a tu cuenta de GitHub.
2. Inicia sesión en [Vercel](https://vercel.com/) y haz clic en **"Add New"** > **"Project"**.
3. Importa tu repositorio de GitHub `camino-de-gracia`.
4. En la configuración de construcción, Vercel detectará automáticamente la configuración de **Vite**:
    *   **Build Command**: `npm run build` o `vite build`
    *   **Output Directory**: `dist`
5. *(Opcional)* Si tu proyecto utiliza variables de entorno, configúralas en la sección **"Environment Variables"** antes de hacer clic en **"Deploy"**.
6. Haz clic en **Deploy**. ¡Tu aplicación estará en línea con HTTPS gratuito en cuestión de segundos!
