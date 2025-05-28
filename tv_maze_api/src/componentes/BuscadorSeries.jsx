import { useState } from 'react';

function BuscadorSeries({ onBuscar }) {
  const [termino, setTermino] = useState("");

  const manejarCambio = (e) => {
    setTermino(e.target.value);
    onBuscar(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar serie..."
      value={termino}
      onChange={manejarCambio}
    />
  );
}

export default BuscadorSeries;
