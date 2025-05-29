import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { obtenerSeriePorId } from '../servicios/apiTvMaze';
import { useFavoritos } from '../hooks/useFavoritos';
import './DetalleSerie.css';
import {FaFacebook,FaTwitter,FaWhatsapp,} from 'react-icons/fa';


function DetalleSerie() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [cargando, setCargando] = useState(true);

  const {
    agregarFavorito,
    eliminarFavorito,
    esFavorito,
  } = useFavoritos();

  useEffect(() => {
    async function cargarSerie() {
      try {
        const datos = await obtenerSeriePorId(id);
        setSerie(datos);
      } catch (error) {
        console.error('Error al cargar la serie:', error);
      } finally {
        setCargando(false);
      }
    }

    cargarSerie();
  }, [id]);

  if (cargando) return <div>Cargando...</div>;
  if (!serie) return <div>Serie no encontrada.</div>;

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
    toast.info('Serie eliminada de favoritos');
  } else {
    agregarFavorito(infoSerie);
    toast.success('Serie agregada a favoritos');
  }
};




  return (
    <div>
      <h1>{serie.name}</h1>
      {serie.image && <img src={serie.image.medium} alt={serie.name} />}
      <p dangerouslySetInnerHTML={{ __html: serie.summary }} />
      <p><strong>Idioma:</strong> {serie.language}</p>
      <p><strong>Géneros:</strong> {serie.genres.join(', ')}</p>
      <p><strong>Estreno:</strong> {serie.premiered}</p>
      <p><strong>Estado:</strong> {serie.status}</p>

      <button
              onClick={manejarFavorito}
              className={`boton-favorito ${favorito ? 'boton-eliminar' : 'boton-agregar'}`}
          >
          {favorito ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
      </button>

<div className="compartir-redes">
  <p>Compartir:</p>
  <button
    className="compartir-boton"
    onClick={() => compartirRedSocial('facebook')}
  >
    <FaFacebook size={24} color="#4267B2" />
  </button>
  <button
    className="compartir-boton"
    onClick={() => compartirRedSocial('twitter')}
  >
    <FaTwitter size={24} color="#1DA1F2" />
  </button>
  <button
    className="compartir-boton"
    onClick={() => compartirRedSocial('whatsapp')}
  >
    <FaWhatsapp size={24} color="#25D366" />
  </button>
</div>



    </div>
  );
}


 function compartirRedSocial(red) {
  const url = window.location.href;
  const texto = encodeURIComponent('¡Mira esta serie en mi app!');

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
}

export default DetalleSerie;
