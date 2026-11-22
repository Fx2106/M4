
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

  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(esquemaPublicacion),

    defaultValues: {
      title: '',
      body: ''
    }
  })

  // Configuracion del POST
  const mutacion = useMutation({
    mutationFn: crearPost,

    onSuccess: () => {
      reset()

      queryClient.invalidateQueries({
        queryKey: ['posts']
      })
    }
  })

  // Enviar publicacion
  function onSubmit(datos) {
    mutacion.reset()
    mutacion.mutate(datos)
  }

  // Enfocar el primer campo con error
  function onInvalid(errores) {
    if (errores.title) {
      setFocus('title')
    } else if (errores.body) {
      setFocus('body')
    }
  }

  return (
    <section className="publish-post-section">

      <h2>Publicar en la comunidad</h2>

      <p>Comparte tus noticias y novedades gaming.</p>

      <form
        className="publish-post-form"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
      >

        <div className="form-field">
          <label htmlFor="title">
            Titulo de la publicacion
          </label>

          <input
            id="title"
            type="text"
            aria-invalid={!!errors.title}
            aria-describedby={
              errors.title ? 'error-title' : undefined
            }
            {...register('title')}
          />

          {errors.title && (
            <p id="error-title" role="alert" className="error">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="body">
            Mensaje
          </label>

          <textarea
            id="body"
            rows="5"
            aria-invalid={!!errors.body}
            aria-describedby={
              errors.body ? 'error-body' : undefined
            }
            {...register('body')}
          />

          {errors.body && (
            <p id="error-body" role="alert" className="error">
              {errors.body.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutacion.isPending}
        >
          {mutacion.isPending ? 'Publicando...' : 'Publicar'}
        </button>

        {mutacion.isPending && (
          <p role="status">
            Enviando tu publicacion al servidor...
          </p>
        )}

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
