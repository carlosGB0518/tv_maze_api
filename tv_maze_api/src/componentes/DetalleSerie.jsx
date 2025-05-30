import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { obtenerSeriePorId } from '../servicios/apiTvMaze';
import { useFavoritos } from '../hooks/useFavoritos';
import { FaFacebook, FaTwitter, FaWhatsapp, FaArrowLeft, FaHeart, FaPlay, FaCalendar, FaGlobe, FaStar } from 'react-icons/fa';
import './DetalleSerie.css';

function DetalleSerie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serie, setSerie] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    agregarFavorito,
    eliminarFavorito,
    esFavorito,
  } = useFavoritos();

  useEffect(() => {
    async function cargarSerie() {
      try {
        setCargando(true);
        const datos = await obtenerSeriePorId(id);
        setSerie(datos);
      } catch (error) {
        console.error('Error al cargar la serie:', error);
        toast.error('Error al cargar la serie');
      } finally {
        setCargando(false);
      }
    }

    cargarSerie();
  }, [id]);

  if (cargando) {
    return (
      <div className="detalle-container">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p className="loading-text">Cargando serie...</p>
        </div>
      </div>
    );
  }

  if (!serie) {
    return (
      <div className="detalle-container">
        <div className="error-container">
          <div className="error-icon">😕</div>
          <h2 className="error-title">Serie no encontrada</h2>
          <p className="error-message">No pudimos encontrar la serie que buscas</p>
          <button onClick={() => navigate('/')} className="back-home-button">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const favorito = esFavorito(serie.id);

  const manejarFavorito = () => {
    const infoSerie = {
      serie_id: serie.id,
      nombre: serie.name,
      imagen_url: serie.image?.medium || '',
      generos: serie.genres || [],
    };

    if (favorito) {
      eliminarFavorito(serie.id);
      toast.info('Serie eliminada de favoritos', {
        icon: '💔'
      });
    } else {
      agregarFavorito(infoSerie);
      toast.success('Serie agregada a favoritos', {
        icon: '❤️'
      });
    }
  };

  const compartirRedSocial = (red) => {
    const url = window.location.href;
    const texto = encodeURIComponent(`¡Mira "${serie.name}" en mi app de series!`);

    let link = '';
    switch (red) {
      case 'facebook':
        link = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        link = `https://twitter.com/intent/tweet?text=${texto}&url=${url}`;
        break;
      case 'whatsapp':
        link = `https://api.whatsapp.com/send?text=${texto}%20${url}`;
        break;
      default:
        return;
    }

    window.open(link, '_blank');
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return 'No disponible';
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const obtenerEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'running': return '#4CAF50';
      case 'ended': return '#f44336';
      case 'in development': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const obtenerEstadoTexto = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'running': return 'En emisión';
      case 'ended': return 'Finalizada';
      case 'in development': return 'En desarrollo';
      default: return estado || 'Desconocido';
    }
  };

  return (
    <div className="detalle-container">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft />
        <span>Volver</span>
      </button>

      {/* Hero Section with Background */}
      <div className="hero-backdrop" style={{
        backgroundImage: serie.image?.original ? `url(${serie.image.original})` : 'none'
      }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="serie-poster-container">
            <img
              src={serie.image?.medium || '/placeholder-image.jpg'}
              alt={serie.name}
              className={`serie-poster ${imageLoaded ? 'loaded' : ''}`}
              onLoad={() => setImageLoaded(true)}
            />
            {favorito && <div className="favorite-badge-large">❤️</div>}
          </div>

          <div className="serie-info">
            <h1 className="serie-title">{serie.name}</h1>
            
            {serie.rating?.average && (
              <div className="rating-container">
                <FaStar className="star-icon" />
                <span className="rating-score">{serie.rating.average}/10</span>
                <span className="rating-label">IMDb</span>
              </div>
            )}

            <div className="serie-meta">
              <div className="meta-item">
                <FaCalendar className="meta-icon" />
                <span>{formatearFecha(serie.premiered)}</span>
              </div>
              <div className="meta-item">
                <FaGlobe className="meta-icon" />
                <span>{serie.language || 'No especificado'}</span>
              </div>
              <div className="meta-item">
                <div 
                  className="status-indicator"
                  style={{ backgroundColor: obtenerEstadoColor(serie.status) }}
                ></div>
                <span>{obtenerEstadoTexto(serie.status)}</span>
              </div>
            </div>

            {serie.genres && serie.genres.length > 0 && (
              <div className="genres-container">
                {serie.genres.map((genero, index) => (
                  <span key={index} className="genre-tag">
                    {genero}
                  </span>
                ))}
              </div>
            )}

            <div className="action-buttons">
              <button
                onClick={manejarFavorito}
                className={`favorite-button ${favorito ? 'is-favorite' : ''}`}
              >
                <FaHeart className="button-icon" />
                <span>{favorito ? 'En Favoritos' : 'Agregar a Favoritos'}</span>
              </button>
              
              {serie.url && (
                <a 
                  href={serie.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="watch-button"
                >
                  <FaPlay className="button-icon" />
                  <span>Ver en TVMaze</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <div className="content-wrapper">
          {/* Synopsis */}
          {serie.summary && (
            <div className="synopsis-container">
              <h2 className="section-title">Sinopsis</h2>
              <div 
                className="synopsis-text"
                dangerouslySetInnerHTML={{ __html: serie.summary }}
              />
            </div>
          )}

          {/* Additional Info */}
          <div className="additional-info">
            <h2 className="section-title">Información Adicional</h2>
            <div className="info-grid">
              {serie.network && (
                <div className="info-item">
                  <span className="info-label">Canal:</span>
                  <span className="info-value">{serie.network.name}</span>
                </div>
              )}
              {serie.schedule && (
                <div className="info-item">
                  <span className="info-label">Horario:</span>
                  <span className="info-value">
                    {serie.schedule.days?.join(', ') || 'No especificado'} 
                    {serie.schedule.time && ` a las ${serie.schedule.time}`}
                  </span>
                </div>
              )}
              {serie.runtime && (
                <div className="info-item">
                  <span className="info-label">Duración:</span>
                  <span className="info-value">{serie.runtime} minutos</span>
                </div>
              )}
              {serie.type && (
                <div className="info-item">
                  <span className="info-label">Tipo:</span>
                  <span className="info-value">{serie.type}</span>
                </div>
              )}
            </div>
          </div>

          {/* Share Section */}
          <div className="share-section">
            <h3 className="share-title">Compartir esta serie</h3>
            <div className="share-buttons">
              <button
                className="share-button facebook"
                onClick={() => compartirRedSocial('facebook')}
                title="Compartir en Facebook"
              >
                <FaFacebook />
                <span>Facebook</span>
              </button>
              <button
                className="share-button twitter"
                onClick={() => compartirRedSocial('twitter')}
                title="Compartir en Twitter"
              >
                <FaTwitter />
                <span>Twitter</span>
              </button>
              <button
                className="share-button whatsapp"
                onClick={() => compartirRedSocial('whatsapp')}
                title="Compartir en WhatsApp"
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleSerie;