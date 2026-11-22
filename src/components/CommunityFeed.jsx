
import { useQuery } from '@tanstack/react-query'
import { obtenerPosts } from '../services/posts'

function CommunityFeed() {

  // Pedimos los datos utilizando TanStack Query
  const {
    data: publicaciones,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ['posts'],
    queryFn: obtenerPosts
  })

  // Estado de carga
  if (isPending) {
    return (
      <section className="community-section">
        <h2>Comunidad gaming</h2>
        <p>Cargando publicaciones...</p>
      </section>
    )
  }

  // Estado de error
  if (isError) {
    return (
      <section className="community-section">
        <h2>Comunidad gaming</h2>
        <p className="error">
          Error al cargar las publicaciones: {error.message}
        </p>
      </section>
    )
  }

  // Datos recibidos correctamente
  return (
    <section className="community-section">

      <h2>Actividad de la comunidad</h2>

      <p>Descubre lo que se está publicando.</p>

      <div className="publication-list">

        {publicaciones.slice(0, 6).map((publicacion) => (

          <article
            className="publication-card"
            key={publicacion.id}
          >
            <h3>{publicacion.title}</h3>

            <p>{publicacion.body}</p>

            <span>Jugador #{publicacion.userId}</span>
          </article>

        ))}

      </div>

    </section>
  )
}

export default CommunityFeed
