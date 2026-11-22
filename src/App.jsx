
import './App.css'

import Header from './components/Header.jsx'
import Welcome from './components/Welcome.jsx'
import RegisterForm from './components/RegisterForm.jsx'
import CommunityFeed from './components/CommunityFeed.jsx'

function App() {
  return (
    <main>

      <Header />

      <Welcome
        title="Bienvenido a Player Hub"
        description="Tu espacio para conectar con otros jugadores, descubrir equipos y crear tu perfil."
      />

      <CommunityFeed />

      <RegisterForm />

    </main>
  )
}

export default App
