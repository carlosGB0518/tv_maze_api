import TarjetaSerie from './TarjetaSerie';

function ListaSeries({ series }) {
  return (
    <div>
      {series.map(item => (
        <TarjetaSerie key={item.show.id} serie={item.show} />
      ))}
    </div>
  );
}

export default ListaSeries;
