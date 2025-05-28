export async function buscarSeriesPorNombre(nombre) {
  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${nombre}`);
  return await res.json();
}

export async function obtenerSeriePorId(id) {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  return await res.json();
}

export async function obtenerSeries() {
  const respuesta = await fetch('https://api.tvmaze.com/shows');
  if (!respuesta.ok) throw new Error('Error al cargar las series');
  return await respuesta.json();
}
