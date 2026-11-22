const API_URL = 'https://jsonplaceholder.typicode.com/posts'

// Obtener publicaciones del servidor
export async function obtenerPosts() {
  const respuesta = await fetch(API_URL)

  // Comprobamos si la peticion ha salido bien
  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`)
  }

  // Convertimos la respuesta a JSON
  const publicaciones = await respuesta.json()

  return publicaciones
}
