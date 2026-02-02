import type { Jugador } from "../../../types/minijuegos/jugador.interface";

// Lista de conectores que NO deberían contar como apellido válido por sí solos
const CONECTORES_INVALIDOS = ['de', 'del', 'la', 'las', 'los', 'da', 'y', 'van', 'von'];

export const normalizarTexto = (texto: string): string => {
  if (!texto) return "";
  // Normalización estándar: minúsculas, sin tildes
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
};

export const obtenerStringApellidos = (nombreCompleto: string): string => {
  const partes = normalizarTexto(nombreCompleto).split(' ');
  if (partes.length <= 1) return partes[0]; 
  return partes.slice(1).join(' '); 
};

export const buscarPorApellido = (
  inputUsuario: string, 
  listaJugadores: Jugador[], 
  letraActual: string
): Jugador[] => {
  const inputClean = normalizarTexto(inputUsuario);
  const letraClean = normalizarTexto(letraActual);

  if (!inputClean || CONECTORES_INVALIDOS.includes(inputClean)) {
    return [];
  }

  return listaJugadores.filter(jugador => {
    const apellidosFull = obtenerStringApellidos(jugador.nombre);

    // 1. Validar que el apellido empiece con la letra del turno
    if (!apellidosFull.startsWith(letraClean)) return false;

    // 2. Validar coincidencia de palabra completa (Regex)
    try {
      const inputEscapado = inputClean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Busca la palabra exacta dentro del string de apellidos
      const regex = new RegExp(`\\b${inputEscapado}\\b`, 'i');
      return regex.test(apellidosFull);
    } catch (e) {
      return false;
    }
  });
};