import { useFavoritos } from '../hooks/useFavoritos';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Favoritos.css';

function Favoritos() {
  const { favoritos, eliminarFavorito } = useFavoritos();
  const [generoSeleccionado, setGeneroSeleccionado] = useState('');
  const [confirmandoEliminar, setConfirmandoEliminar] = useState(null);

  const manejarCambioGenero = (e) => {
    setGeneroSeleccionado(e.target.value);
  };

  const confirmarEliminacion = (serieId) => {
    setConfirmandoEliminar(serieId);
  };

  const cancelarEliminacion = () => {
    setConfirmandoEliminar(null);
  };

  const ejecutarEliminacion = (serieId) => {
    eliminarFavorito(serieId);
    setConfirmandoEliminar(null);
  };

  const favoritosFiltrados = generoSeleccionado
    ? favoritos.filter((serie) =>
        serie.generos?.includes(generoSeleccionado)
      )
    : favoritos;

  return (
    <div className="favoritos-container">
      <div className="favoritos-header">
        <div className="header-content">
          <h1 className="favoritos-title">
            Mis Series <span className="highlight">Favoritas</span>
          </h1>
          <p className="favoritos-subtitle">
            Tu colección personal de series increíbles
          </p>
          <div className="favoritos-stats">
            <div className="stat-item">
              <span className="stat-number">{favoritos.length}</span>
              <span className="stat-label">Series guardadas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{favoritosFiltrados.length}</span>
              <span className="stat-label">Mostrando</span>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="filter-section">
          <div className="filter-container">
            <label htmlFor="filtro-genero" className="filter-label">
              <span className="filter-icon">🎭</span>
              Filtrar por género:
            </label>
            <select
              id="filtro-genero"
              value={generoSeleccionado}
              onChange={manejarCambioGenero}
              className="filter-select"
            >
              <option value="">Todos los géneros</option>
              <option value="Drama">🎪 Drama</option>
              <option value="Comedy">😄 Comedy</option>
              <option value="Science-Fiction">🚀 Science-Fiction</option>
              <option value="Thriller">😱 Thriller</option>
              <option value="Action">💥 Action</option>
              <option value="Horror">👻 Horror</option>
            </select>
          </div>
        </div>

        {favoritosFiltrados.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💫</div>
            <h3 className="empty-title">
              {favoritos.length === 0 
                ? "Aún no tienes favoritos" 
                : "No hay series en este género"}
            </h3>
            <p className="empty-message">
              {favoritos.length === 0 
                ? "Explora series y añade tus favoritas para verlas aquí" 
                : "Prueba con otro filtro o añade más series a favoritos"}
            </p>
            {favoritos.length === 0 && (
              <Link to="/" className="explore-button">
                Explorar Series
              </Link>
            )}
          </div>
        ) : (
          <div className="series-grid">
            {favoritosFiltrados.map((serie) => (
              <div key={serie.serie_id} className="serie-card">
                <div className="card-image-container">
                  <Link to={`/serie/${serie.serie_id}`} className="image-link">
                    <img
                      src={serie.imagen_url}
                      alt={serie.nombre}
                      className="serie-image"
                      loading="lazy"
                    />
                    <div className="image-overlay">
                      <span className="view-details">Ver detalles</span>
                    </div>
                  </Link>
                  <div className="favorite-badge">
                    ❤️
                  </div>
                </div>
                
                <div className="card-content">
                  <Link to={`/serie/${serie.serie_id}`} className="title-link">
                    <h3 className="serie-title">{serie.nombre}</h3>
                  </Link>
                  
                  {serie.generos && serie.generos.length > 0 && (
                    <div className="generos-tags">
                      {serie.generos.slice(0, 2).map((genero, index) => (
                        <span key={index} className="genero-tag">
                          {genero}
                        </span>
                      ))}
                      {serie.generos.length > 2 && (
                        <span className="more-genres">+{serie.generos.length - 2}</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  {confirmandoEliminar === serie.serie_id ? (
                    <div className="confirm-delete">
                      <p className="confirm-text">¿Eliminar de favoritos?</p>
                      <div className="confirm-buttons">
                        <button 
                          onClick={() => ejecutarEliminacion(serie.serie_id)}
                          className="confirm-yes"
                        >
                          Sí
                        </button>
                        <button 
                          onClick={cancelarEliminacion}
                          className="confirm-no"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => confirmarEliminacion(serie.serie_id)}
                      className="remove-button"
                      title="Eliminar de favoritos"
                    >
                      <span className="remove-icon">🗑️</span>
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favoritos;