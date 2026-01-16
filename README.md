# Task Manager MERN Stack

Un aplicativo web de gestión de tareas completo construido con el stack MERN (MongoDB, Express, React, Node.js). Permite a los usuarios crear, leer, actualizar y eliminar tareas con autenticación segura mediante JWT y bcrypt.

## 🚀 Características

- ✅ **Autenticación segura** - Registro e inicio de sesión con JWT y bcrypt
- ✅ **Gestión de tareas** - CRUD completo (Crear, Leer, Actualizar, Eliminar)
- ✅ **Rutas protegidas** - Solo usuarios autenticados pueden acceder
- ✅ **Prioridades** - Tareas con niveles de prioridad (baja, media, alta)
- ✅ **Marcar completadas** - Marcar tareas como completadas
- ✅ **TypeScript** - Backend en TypeScript para mayor seguridad de tipos
- ✅ **Responsive Design** - Diseño adaptable para móvil y desktop

## 📋 Requisitos Previos

- Node.js >= 18
- npm o yarn
- MongoDB Atlas cuenta (gratuita)
- Git

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/carturitos/task-manager-mern.git
cd task-manager-mern
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
cat > .env << EOF
PORT=5000
MONGO_URI=tu_conexion_mongodb_aqui
JWT_SECRET=tu_clave_secreta_muy_larga_aqui
EOF

# Iniciar servidor
npm run dev
```

### 3. Configurar Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install

# Iniciar cliente
npm run dev
```

## 🌍 URLs de Acceso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **MongoDB**: Conectado a Atlas

## 📁 Estructura del Proyecto

```
task-manager-mern/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts           # Conexión a MongoDB
│   │   ├── controllers/
│   │   │   ├── userController.ts
│   │   │   └── taskController.ts
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   └── Task.ts
│   │   ├── routes/
│   │   │   ├── userRoutes.ts
│   │   │   └── taskRoutes.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Tasks.jsx
│   │   ├── services/
│   │   │   └── api.js          # Configuración de Axios
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   └── Tasks.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔌 API Endpoints

### Autenticación (Usuario)

| Método | Endpoint              | Descripción                | Autenticación |
| ------ | --------------------- | -------------------------- | ------------- |
| POST   | `/api/users/register` | Registrar nuevo usuario    | No            |
| POST   | `/api/users/login`    | Iniciar sesión             | No            |
| GET    | `/api/users/profile`  | Obtener perfil del usuario | ✅ JWT        |

### Tareas

| Método | Endpoint         | Descripción              | Autenticación |
| ------ | ---------------- | ------------------------ | ------------- |
| POST   | `/api/tasks`     | Crear nueva tarea        | ✅ JWT        |
| GET    | `/api/tasks`     | Obtener todas las tareas | ✅ JWT        |
| GET    | `/api/tasks/:id` | Obtener tarea por ID     | ✅ JWT        |
| PUT    | `/api/tasks/:id` | Actualizar tarea         | ✅ JWT        |
| DELETE | `/api/tasks/:id` | Eliminar tarea           | ✅ JWT        |

## 💻 Tecnologías Utilizadas

### Backend

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **TypeScript** - Lenguaje tipado
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - JSON Web Tokens para autenticación
- **bcryptjs** - Hash de contraseñas
- **CORS** - Control de acceso

### Frontend

- **React 18** - Librería de UI
- **Vite** - Bundler rápido
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Context API** - Gestión de estado

## 🚀 Scripts Disponibles

### Backend

```bash
# Modo desarrollo (con TypeScript en tiempo real)
npm run dev

# Compilar TypeScript a JavaScript
npm run build

# Ejecutar versión de producción
npm start
```

### Frontend

```bash
# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🔐 Autenticación

### Flujo de Autenticación

1. **Registro**: El usuario se registra con nombre, email y contraseña
2. **Hash de Contraseña**: bcryptjs encripta la contraseña antes de guardarla
3. **Generación de JWT**: Al login, el servidor genera un token JWT que expira en 7 días
4. **Almacenamiento**: El token se guarda en localStorage
5. **Protección**: Cada petición a rutas protegidas incluye el token en el header
6. **Validación**: El middleware `authMiddleware` verifica la validez del token

### Headers Requeridos

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📝 Ejemplo de Uso

### 1. Registrarse

```bash
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "password123"
}
```

**Respuesta:**

```json
{
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "67a123...",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com"
  }
}
```

### 2. Crear Tarea

```bash
POST http://localhost:5000/api/tasks
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "titulo": "Comprar groceries",
  "descripcion": "Leche, pan, huevos",
  "prioridad": "media"
}
```

### 3. Obtener Tareas

```bash
GET http://localhost:5000/api/tasks
Authorization: Bearer <TOKEN>
```

## 🐛 Solución de Problemas

### Problema: CORS Error

**Solución**: Verifica que el frontend y backend estén corriendo en puertos diferentes (5173 y 5000).

### Problema: MongoDB Connection Error

**Solución**:

1. Verifica tu `MONGO_URI` en `.env`
2. Asegúrate de agregar tu IP a MongoDB Atlas (Network Access)
3. Verifica que el usuario y contraseña sean correctos

### Problema: JWT Expired

**Solución**: El token expira cada 7 días. Haz login nuevamente para obtener un nuevo token.

## 📚 Recursos Útiles

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev)
- [JWT Introduction](https://jwt.io/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 👨‍💻 Autor

**carturitos** - [GitHub](https://github.com/carturitos)

---

**Creado**: Enero 2026  
**Última actualización**: Enero 2026
