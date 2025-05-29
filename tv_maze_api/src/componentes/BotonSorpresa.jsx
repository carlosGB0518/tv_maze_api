import { useNavigate } from 'react-router-dom';
import { obtenerSerieAleatoria } from '../servicios/apiTvMaze';
import { useState } from 'react';

function BotonSorpresa() {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);

  const manejarClick = async () => {
    setCargando(true);
    try {
      const serie = await obtenerSerieAleatoria();
      navigate(`/serie/${serie.id}`);
    } catch (error) {
      console.error('Error al obtener serie aleatoria:', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <button onClick={manejarClick} disabled={cargando}>
      {cargando ? 'Buscando sorpresa...' : 'Sorpresa 🎲'}
    </button>
  );
}

export default BotonSorpresa;
