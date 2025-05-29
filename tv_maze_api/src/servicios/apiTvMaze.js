// Buscar series por nombre (mapea para extraer los objetos 'show')
export async function buscarSeriesPorNombre(nombre) {
  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${nombre}`);
  const data = await res.json();
  return data.map(item => item.show); // Extrae solo los shows
}

// Obtener detalles de una serie por su ID
export async function obtenerSeriePorId(id) {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  return await res.json();
}

// Obtener todas las series (puede ser pesado)
export async function obtenerSeries() {
  const respuesta = await fetch('https://api.tvmaze.com/shows');
  if (!respuesta.ok) throw new Error('Error al cargar las series');
  return await respuesta.json();
}

// Obtener un grupo de series populares (por ejemplo página 1)
export async function obtenerSeriesPopulares() {
  try {
    const respuesta = await fetch('https://api.tvmaze.com/shows?page=1');
    if (!respuesta.ok) throw new Error('Error al cargar las series populares');
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}


// aleatorio
export async function obtenerSerieAleatoria() {
  const pagina = Math.floor(Math.random() * 10); // TVMaze tiene múltiples páginas (~250)
  const respuesta = await fetch(`https://api.tvmaze.com/shows?page=${pagina}`);
  const series = await respuesta.json();
  const indiceAleatorio = Math.floor(Math.random() * series.length);
  return series[indiceAleatorio];
}
