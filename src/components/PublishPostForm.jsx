
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import { crearPost } from '../services/posts'

// Esquema de validacion
const esquemaPublicacion = z.object({
  title: z.string().min(5, 'El titulo debe tener al menos 5 caracteres'),

  body: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres')
})

function PublishPostForm() {

  // Accedemos al cliente de TanStack Query
  const queryClient = useQueryClient()

  // Configuramos React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(esquemaPublicacion),

    defaultValues: {
      title: '',
      body: ''
    }
  })

  // Configuramos la mutacion POST
  const mutacion = useMutation({
    mutationFn: crearPost,

    onSuccess: () => {
      // Limpiamos el formulario
      reset()

      // Actualizamos la consulta de publicaciones
      queryClient.invalidateQueries({
        queryKey: ['posts']
      })
    }
  })

  // Funcion que se ejecuta al enviar
  function onSubmit(datos) {
    mutacion.mutate(datos)
  }

  return (
    <section className="publish-post-section">

      <h2>Publicar en la comunidad</h2>

      <p>Comparte tus noticias y novedades gaming.</p>

      <form
        className="publish-post-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >

        {/* Titulo */}
        <div className="form-field">

          <label htmlFor="title">
            Titulo de la publicacion
          </label>

          <input
            id="title"
            type="text"
            placeholder="Ej: Buscamos jugadores para nuestro equipo"
            aria-invalid={!!errors.title}
            aria-describedby={
              errors.title ? 'error-title' : undefined
            }
            {...register('title')}
          />

          {errors.title && (
            <p id="error-title" className="error" role="alert">
              {errors.title.message}
            </p>
          )}

        </div>

        {/* Mensaje */}
        <div className="form-field">

          <label htmlFor="body">
            Mensaje
          </label>

          <textarea
            id="body"
            rows="5"
            placeholder="Escribe aqui tu publicacion..."
            aria-invalid={!!errors.body}
            aria-describedby={
              errors.body ? 'error-body' : undefined
            }
            {...register('body')}
          />

          {errors.body && (
            <p id="error-body" className="error" role="alert">
              {errors.body.message}
            </p>
          )}

        </div>

        {/* Boton */}
        <button
          type="submit"
          disabled={mutacion.isPending}
        >
          {mutacion.isPending
            ? 'Publicando...'
            : 'Publicar'}
        </button>

        {/* Resultado */}
        {mutacion.isError && (
          <p className="error" role="alert">
            Error: {mutacion.error.message}
          </p>
        )}

        {mutacion.isSuccess && (
          <p className="success-message" role="status">
            ¡Publicacion enviada correctamente!
            Identificador recibido: {mutacion.data.id}
          </p>
        )}

      </form>

    </section>
  )
}

export default PublishPostForm
