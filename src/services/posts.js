
import { z } from 'zod'

// Esquema de una publicacion
const esquemaPost = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string()
})

// Esquema de una lista de publicaciones
const esquemaListaPosts = z.array(esquemaPost)

// GET: obtener publicaciones
export async function obtenerPosts() {
  const respuesta = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  )

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`)
  }

  const publicaciones = await respuesta.json()

  const resultado = esquemaListaPosts.safeParse(publicaciones)

  if (!resultado.success) {
    throw new Error(
      'El servidor ha devuelto publicaciones con formato incorrecto'
    )
  }

  return resultado.data
}

// POST: crear una publicacion
export async function crearPost(datos) {
  const respuesta = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...datos,
        userId: 1
      })
    }
  )

  if (!respuesta.ok) {
    throw new Error(`Error al crear la publicacion: ${respuesta.status}`)
  }

  const publicacion = await respuesta.json()

  // Comprobamos tambien la respuesta del POST
  return esquemaPost.parse(publicacion)
}
