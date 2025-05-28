import { Link } from 'react-router-dom';

function MenuPrincipal() {
  return (
    <nav>
      <Link to="/">Inicio</Link> |{" "}
      <Link to="/inicio-sesion">Iniciar Sesión</Link> |{" "}
      <Link to="/registro">Registrarse</Link>
      <Link to="/favoritos">Ver Favoritos</Link>

    </nav>
  );
}

export default MenuPrincipal;
