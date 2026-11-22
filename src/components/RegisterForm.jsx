
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Esquema de validacion
const esquemaRegistro = z
  .object({
    nombre: z.string().min(2, 'El nombre es demasiado corto'),
    email: z.email('Email no valido'),
    password: z.string().min(8, 'Minimo 8 caracteres'),
    repetir: z.string(),
    aceptaTerminos: z.literal(true, {
      error: 'Debes aceptar los terminos'
    })
  })
  .refine((datos) => datos.password === datos.repetir, {
    error: 'Las contrasenas no coinciden',
    path: ['repetir']
  })

function RegisterForm() {

  const {
    register,
    handleSubmit,
    setFocus,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful
    }
  } = useForm({
    resolver: zodResolver(esquemaRegistro),

    defaultValues: {
      nombre: '',
      email: '',
      password: '',
      repetir: '',
      aceptaTerminos: false
    }
  })

  // Envio simulado
  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 600))
  }

  // Llevar el foco al primer campo incorrecto
  function onInvalid(errores) {
    if (errores.nombre) {
      setFocus('nombre')
    } else if (errores.email) {
      setFocus('email')
    } else if (errores.password) {
      setFocus('password')
    } else if (errores.repetir) {
      setFocus('repetir')
    } else if (errores.aceptaTerminos) {
      setFocus('aceptaTerminos')
    }
  }

  return (
    <section className="register-section">

      <h2>Unete a Player Hub</h2>
      <p>Crea tu cuenta de jugador</p>

      <form
        className="register-form"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
      >

        {/* Nombre */}
        <div className="form-field">
          <label htmlFor="nombre">Nombre de jugador</label>

          <input
            id="nombre"
            type="text"
            autoComplete="nickname"
            aria-invalid={!!errors.nombre}
            aria-describedby={
              errors.nombre ? 'error-nombre' : undefined
            }
            {...register('nombre')}
          />

          {errors.nombre && (
            <p id="error-nombre" role="alert" className="error">
              {errors.nombre.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="form-field">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={
              errors.email ? 'error-email' : undefined
            }
            {...register('email')}
          />

          {errors.email && (
            <p id="error-email" role="alert" className="error">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Contrasena */}
        <div className="form-field">
          <label htmlFor="password">Contrasena</label>

          <input
            id="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            aria-describedby={
              errors.password ? 'error-password' : undefined
            }
            {...register('password')}
          />

          {errors.password && (
            <p id="error-password" role="alert" className="error">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Repetir contrasena */}
        <div className="form-field">
          <label htmlFor="repetir">Repetir contrasena</label>

          <input
            id="repetir"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.repetir}
            aria-describedby={
              errors.repetir ? 'error-repetir' : undefined
            }
            {...register('repetir')}
          />

          {errors.repetir && (
            <p id="error-repetir" role="alert" className="error">
              {errors.repetir.message}
            </p>
          )}
        </div>

        {/* Terminos */}
        <div className="terms">
          <input
            id="aceptaTerminos"
            type="checkbox"
            aria-invalid={!!errors.aceptaTerminos}
            aria-describedby={
              errors.aceptaTerminos ? 'error-terminos' : undefined
            }
            {...register('aceptaTerminos')}
          />

          <label htmlFor="aceptaTerminos">
            Acepto los terminos y condiciones
          </label>

          {errors.aceptaTerminos && (
            <p id="error-terminos" role="alert" className="error">
              {errors.aceptaTerminos.message}
            </p>
          )}
        </div>

        {/* Boton */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Crear cuenta'}
        </button>

        {/* Mensaje de exito */}
        {isSubmitSuccessful && (
          <p className="success-message" role="status">
            ¡Formulario validado correctamente!
            El registro todavia no esta conectado a un servidor.
          </p>
        )}

      </form>
    </section>
  )
}

export default RegisterForm
