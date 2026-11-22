
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Esquema de validacion con Zod
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

  // Configuracion de React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
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

  // Funcion que se ejecuta cuando los datos son validos
  async function onSubmit(datos) {

    // Simulamos una espera del servidor
    await new Promise((resolve) => setTimeout(resolve, 600))

    console.log('Registro recibido:', {
      nombre: datos.nombre,
      email: datos.email
    })
  }

  return (
    <section className="register-section">

      <h2>Unete a Player Hub</h2>
      <p>Crea tu cuenta de jugador</p>

      <form
        className="register-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >

        {/* Nombre de jugador */}
        <div className="form-field">
          <label htmlFor="nombre">Nombre de jugador</label>

          <input
            id="nombre"
            type="text"
            placeholder="Tu nombre gaming"
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
            placeholder="nombre@ejemplo.com"
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
            placeholder="Minimo 8 caracteres"
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
            placeholder="Repite tu contrasena"
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

        {/* Aceptar terminos */}
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

        {/* Boton de envio */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Crear cuenta'}
        </button>

      </form>
    </section>
  )
}

export default RegisterForm
