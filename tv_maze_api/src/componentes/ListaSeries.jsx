import TarjetaSerie from './TarjetaSerie';

function ListaSeries({ series }) {
  if (!series || series.length === 0) {
    return <p>No se encontraron series.</p>;
  }

  return (
    <div>
      {series
        .filter(serie => serie && serie.id) // Protección extra
        .map(serie => (
          <TarjetaSerie key={serie.id} serie={serie} />
        ))}
    </div>
  );
}

export default ListaSeries;
