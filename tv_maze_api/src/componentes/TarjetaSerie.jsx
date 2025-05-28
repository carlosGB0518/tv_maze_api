import { Link } from 'react-router-dom';

function TarjetaSerie({ serie }) {
  return (
    <div>
      <h3>{serie.name}</h3>
      {serie.image && <img src={serie.image.medium} alt={serie.name} />}
      <p>
        <Link to={`/serie/${serie.id}`}>Ver detalles</Link>
      </p>
    </div>
  );
}

export default TarjetaSerie;
