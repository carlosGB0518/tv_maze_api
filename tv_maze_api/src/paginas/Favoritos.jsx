import { useFavoritos } from '../hooks/useFavoritos';
import { Link } from 'react-router-dom';

function Favoritos() {
  const { favoritos, eliminarFavorito } = useFavoritos();

  return (
    <div>
      <h2>Mis Series Favoritas</h2>

      {favoritos.length === 0 ? (
        <p>No tienes series favoritas.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          padding: '1rem'
        }}>
          {favoritos.map((serie) => (
            <div key={serie.serie_id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
              <Link to={`/series/${serie.serie_id}`}>
                <img
                  src={serie.imagen_url}
                  alt={serie.nombre}
                  style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                />
                <h4 style={{ marginTop: '0.5rem' }}>{serie.nombre}</h4>
              </Link>
              <button onClick={() => eliminarFavorito(serie.serie_id)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;
