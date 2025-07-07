   ![login inicio de session](https://imgur.com/a/VZu239v)


# 🛒 Mi Tienda - React + Vite + TailwindCSS

Este es un proyecto de tienda virtual desarrollado con **React**, **Vite** y **TailwindCSS**. Cuenta con autenticación de usuarios, carrito de compras, y un panel de administración para usuarios con privilegios especiales.

## 🚀 Tecnologías utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- Context API para manejo de autenticación y carrito

## 🔐 Funcionalidades principales

### Usuarios normales
- Iniciar sesión
- Visualizar productos
- Agregar productos al carrito
- Ver y gestionar su carrito
- Cerrar sesión

### Administrador (`admin`)
- Iniciar sesión como **admin**
- Acceder a `/admin` y visualizar el **Panel de Administración**
- Navegar a:
  - `/admin/products`: Gestión de productos (por implementar)
  - `/admin/categories`: Gestión de categorías (por implementar)
  - Ver tarjeta de "Pedidos" (futura funcionalidad)
- Cerrar sesión

## 🧪 Credenciales de prueba

```bash
Usuario normal:
  username: user
  password: 1234

Administrador:
  username: admin
  password: clave123



## 🚀 Clonar y ejecutar el proyecto

```bash
# 1. Clona el repositorio
git clone https://github.com/jhongonzalezs/mitienda-frondend.git
cd mitienda-frondend

# 2. Instala dependencias
npm install

# 3. Corre la aplicación en modo desarrollo
npm run dev
