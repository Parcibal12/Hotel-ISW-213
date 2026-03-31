# HOTEL ISW-213 (MVP)

Prototipo funcional de un sistema de reservas para un hotel pequeño, desarrollado como proyecto académico para la materia de Taller de Diseño de Software 1.

Este sistema sistematiza la operación básica de hospedaje, permitiendo registrar huéspedes, gestionar reservas, controlar la ocupación y realizar el check-in, resolviendo la necesidad de control manual desordenado.

## Arquitectura del sistema

El proyecto está construido bajo el patrón arquitectónico **MVC (Modelo-Vista-Controlador)**, dividiendo claramente las responsabilidades:

* **Frontend (Presentación):** Desarrollado en **Vanilla JS**, HTML5 y CSS3, utilizando la plantilla corporativa PlainAdmin y SweetAlert2 para interacciones controladas. Se comunica con el backend mediante `fetch` API.
* **Backend (Control, Servicios, Repositorio):** API RESTful desarrollada en **Node.js** con **Express**. Implementa los patrones de diseño *Repository* (para abstracción de base de datos) y *Service* (para lógica de negocio y validaciones).
* **Base de datos (Modelos y Persistencia):** Base de datos relacional alojada en la nube mediante **Supabase (PostgreSQL)**, conectada a través de la librería `pg` con manejo de pool de conexiones tolerante a fallos.

## Modelo de base de datos

La persistencia de datos está estructurada en las siguientes tablas relacionales principales:

* `huesped`: Almacena la información de los clientes (nnmbre, documento, teléfono, correo).
* `tipo_habitacion`: Catálogo base con la descripción, capacidad máxima y precio referencial.
* `habitacion`: Instancias físicas de los cuartos, relacionadas a un tipo específico.
* `reserva`: Tabla transaccional central. Relaciona un huésped, una habitación, un rango de fechas, la cantidad de personas y el estado actual (`Pendiente`, `EnCurso`, `Cancelada`, `Finalizada`).
* `checkin`: Registro histórico de la llegada física del huésped al hotel, vinculada a una reserva.
* `servicio_hotel`: Directorio de contactos internos (Dato precargado de solo lectura).

*Nota: Las capacidades de habitaciones y contactos de servicios son datos precargados para acotar el alcance del prototipo.*

## Estructura del proyecto

El código fuente está ordenado respetando la separación de capas:

\`\`\`text
/Hotel
│
├── /backend                 # API RESTful en Node.js
│   ├── /config              # Conexión a Supabase (PostgreSQL)
│   ├── /controllers         # Controladores (manejo de requests/responses)
│   ├── /services            # Lógica de negocio (reglas, validaciones)
│   ├── /repositories        # Consultas SQL puras
│   ├── /routes              # Definición de endpoints REST
│   └── app.js               # Archivo principal del servidor
│
├── /js                      # Lógica del Frontend (Vanilla JS)
│   ├── /api                 # Funciones fetch para consumir el Backend
│   ├── /controllers         # Controladores del DOM e interacciones
│   ├── /views               # Template literals HTML (vistas)
│   ├── app.js               # Enrutador principal del Frontend
│   └── config.js            # Variables de entorno del cliente
│
├── /assets                  # Estilos (CSS, PlainAdmin), imágenes, fuentes
└── index.html               # Punto de entrada de la aplicación web
\`\`\`

## Funcionalidades implementadas

El prototipo cubre el 100% de las historias de usuario (HU) base y la asignación individual requerida:

**HU-01:** Registrar huésped (con validación de campos y prevención de duplicados).
**HU-02:** Crear reserva de habitación (con control de fechas lógicas, prevención de solapamiento de cuartos y límite de capacidad).
**HU-03:** Consultar reservas activas y futuras (listado ordenado cronológicamente).
**HU-04:** Registrar check-in (previniendo acción sobre reservas canceladas/finalizadas y evitando doble check-in).
**HU-05:** Gestionar variación de tipo de habitación en la reserva (despliegue de características dinámicas al seleccionar).
**HU-06:** Visualizar contactos de servicios del hotel (directorio de solo lectura).
**HU-10 (asignación individual):** Consultar información de un huésped (modal de detalles con comportamiento controlado ante errores/IDs inexistentes).

## Instrucciones de ejecución

Seguir los siguientes pasos para levantar el proyecto localmente:

### Requisitos previos
* Tener instalado [Node.js](https://nodejs.org/) (v16 o superior).
* Tener instalado Git.

### Paso 1: Configurar el Backend
1. Abrir una terminal y navegar a la carpeta del backend:
   \`cd backend\`
2. Instalar las dependencias de Node:
   \`npm install\`
3. Crear un archivo llamado \`.env\` en la carpeta \`backend\` y agregar la cadena de conexión a Supabase:
   \`\`\`env
   SUPABASE_URL=postgresql://[usuario]:[password]@[host]:5432/[database]
   \`\`\`
4. Iniciar el servidor:
   \`node app.js\`
   *(Se debería ver en consola: "Servidor corriendo en el puerto 3000" y "Conexión a Supabase exitosa").*

### Paso 2: Ejecutar el Frontend
1. Abrir una nueva terminal en la carpeta raíz del proyecto (\`Hotel/\`).
2. Abrir el archivo \`index.html\` directamente en el navegador web.
3. *Opcional (Recomendado):* Utilizar la extensión **Live Server** de VS Code para una mejor experiencia de desarrollo y enrutamiento. Hacer clic derecho sobre \`index.html\` y seleccionar "Open with Live Server".
