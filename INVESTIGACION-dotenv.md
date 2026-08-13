# Investigación: dotenv

## ¿Qué es dotenv?
`dotenv` es un paquete de Node.js que permite cargar variables de entorno desde un archivo `.env` 
hacia `process.env`. Esto sirve para no escribir datos sensibles (contraseñas, usuarios de base de 
datos, puertos, etc.) directamente en el código ("hardcodeados"), separando la configuración del 
código fuente.

## ¿Cómo se instala?
Se instala como cualquier paquete de npm, desde la terminal en la raíz del proyecto:

```bash
npm install dotenv
```

## ¿Cómo se configura?
1. Se crea un archivo llamado `.env` en la raíz del proyecto, con las variables en formato 
   `NOMBRE=valor`, por ejemplo:

DB_NAME=tasks_users_db
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost

2. Se agrega `.env` al archivo `.gitignore`, para que nunca se suba al repositorio (contiene datos 
   sensibles).
3. Se crea un archivo `.env.example` con los mismos nombres de variables pero sin valores, para que 
   otras personas sepan qué variables necesita el proyecto sin exponer los datos reales.

## ¿Cómo se accede a las variables desde el código?
Primero se importa el paquete y se ejecuta `dotenv.config()`, que carga el contenido de `.env` 
dentro de `process.env`. A partir de ahí, cualquier variable se puede usar como `process.env.NOMBRE`.

## Ejemplo aplicado en este proyecto
En `src/config/database.js`:

```javascript
import { Sequelize } from "sequelize"; 
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

export default sequelize;
```

Antes, esos datos estaban escritos directo en el código (`'tasks_users_db'`, `'root'`, `''`, 
`'localhost'`). Ahora se leen desde el archivo `.env`, que no se sube al repositorio, mejorando la 
seguridad y permitiendo que cada persona que clone el proyecto use sus propios datos de conexión sin 
tocar el código.