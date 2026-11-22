# Player Hub

## Comunidad gaming M4: Full Contact Forms

Player Hub es una aplicación web dedicada a la comunidad gaming. Permite validar registros de jugadores y publicar mensajes para compartir noticias y novedades con otros usuarios. Está desarrollada con React y utiliza React Hook Form, Zod y TanStack Query para gestionar formularios y peticiones HTTP.

## Uso de IA

He utilizado ChatGPT como principal herramienta de apoyo durante prácticamente todo el desarrollo del proyecto.

La IA me ha ayudado a organizar el trabajo por fases, generar y explicar código, configurar las librerías utilizadas y solucionar errores que han ido apareciendo durante el desarrollo.

Algunos prompts reales que he utilizado son:

"Explicame ahora lo q pide m4 en lenguaje humano, explicando pa q sirve react, zods etc".

"Q hace tanstack query".

He ido incorporando los cambios en Visual Studio Code y comprobando su funcionamiento durante el desarrollo. También he ejecutado npm run lint y npm run build para revisar el código y comprobar que el proyecto compila correctamente.

La mayor parte del código se ha desarrollado con ayuda de IA, intentando comprender qué hace cada parte y cómo se relaciona con la teoría de clase.

## Autopsia

1. Separar las peticiones HTTP de los componentes

He decidido crear una carpeta services y guardar en ella las funciones que se comunican con la API, como obtenerPosts() y crearPost().

He elegido esta organización para que los componentes React se encarguen principalmente de mostrar la información y gestionar la interfaz, mientras que los servicios se ocupan de las peticiones HTTP.

La alternativa que descarté fue escribir directamente las llamadas fetch dentro de los componentes. Aunque habría funcionado, habría mezclado la lógica de comunicación con la presentación y habría dificultado el mantenimiento del proyecto.

2. Utilizar Zod junto con React Hook Form

He decidido utilizar Zod como sistema de validación conectado a React Hook Form mediante zodResolver.

De esta manera, las reglas de validación se encuentran centralizadas en un esquema y React Hook Form se encarga de gestionar los campos y el envío del formulario.

La alternativa que descarté fue controlar cada campo manualmente mediante useState y escribir las comprobaciones dentro del propio componente. Esta opción habría generado más código y duplicación de validaciones.