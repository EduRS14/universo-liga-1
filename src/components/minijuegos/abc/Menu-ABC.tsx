import { useState, useEffect } from 'react';
import './styles.css';
import { JuegoElABC } from './juego/juego-el-abc';

import Equipos from '../../../data/minijuegos/equipos.json'; 
import Jugadores from '../../../data/minijuegos/jugadores_obtenidos.json';

import type { Equipo } from '../../../types/minijuegos/equipo';
import type { Jugador } from '../../../types/minijuegos/jugador.interface';

const todosLosEquipos: Equipo[] = Equipos as Equipo[];
const todosLosJugadores: Jugador[] = Jugadores as Jugador[];

// --- COMPONENTE PRINCIPAL ---
export default function MenuABC() {
  const [tiempo, setTiempo] = useState<number | null>(null);
  
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [yaJugoHoy, setYaJugoHoy] = useState(false);

  const [loading, setLoading] = useState(true);

  // 1. CARGA INICIAL (Montaje)
  useEffect(() => {
    // A) Chequear si ya jugó hoy (bloqueo diario)
    const jugado = localStorage.getItem('juegoJugadoElABC');
    if (jugado) {
      setYaJugoHoy(true);
    }
    
    // B) Chequear si hay una partida en curso (Recuperación de estado)
    const iniciadoPrevio = localStorage.getItem('juegoIniciadoElABC');
    
    if (iniciadoPrevio === 'true') {
        setJuegoIniciado(true);
    }

    setLoading(false);

  }, []);

  // 2. LOGGING (Opcional, para debug)
  useEffect(() => {
    if (juegoIniciado) {
        console.log("Estado del juego actualizado:", { tiempo });
    }
  }, [juegoIniciado]);

  // 3. GUARDADO (Al dar Click)
  const handleContinuar = (e: React.FormEvent) => {
    e.preventDefault();

    setJuegoIniciado(true);

    // Guardar en LocalStorage
    localStorage.setItem('juegoIniciadoElABC', 'true');
  };

  if (loading) {
    return (
      <div className="contenedor-configuracion">
        <p className='texto-cargando'>Cargando...</p>
      </div>
    );
  }

  // --- VISTA DEL JUEGO ---
  if (juegoIniciado) {
    return (
      <div className="fade-in">
         <JuegoElABC todosLosEquipos={todosLosEquipos} todosLosJugadores={todosLosJugadores} />
      </div>
    );
  }

  // --- NUEVA VISTA DEL MENÚ CON FONDO TOTAL ---
  return (
    <div className="contenedor-configuracion">
      <div className="menu-juego-abc-full-bg fade-in">
        
        {/* 1. EL OVERLAY GENERAL (Imprescindible para legibilidad) */}
        <div className="abc-overlay-fondo"></div>

        {/* 2. EL CONTENIDO FLOTANTE (Centrado y legible) */}
        <div className="abc-contenido-contenedor">
          
          {/* Cabecera del Juego */}
          <div className="abc-cabecera text-center mb-5">
            <span className="badge-categoria-abc">RETO</span>
            <h1 className="titulo-hero-abc">EL ABC</h1>
            <h2 className="subtitulo-hero-abc">LA RULETA DE NOMBRES</h2>
          </div>

          {/* Cuerpo y Acción */}
          <div className="abc-cuerpo-accion text-center">
            <p className="descripcion-juego-abc text-justify">
              No basta con saber quién fue campeón. En <strong>El ABC</strong>, el azar es el verdadero rival. Te enfrentamos a una ruta de 22 letras, y en cada parada te esperará un <strong>escudo diferente</strong> de la Primera División (2010-2026). Podrías tener que recordar a un crack de la 'U' con la A, y al segundo siguiente, buscar a uno de San Simón con la B. <strong>¿Tienes el archivo mental para completar el abecedario? Reto ilimitado</strong>
            </p>

            {yaJugoHoy ? (
              <div className="alerta-jugado-abc fade-in">
                <span className="alerta-icono-abc">⏳</span>
                <p>Ya completaste el reto de hoy<br/><strong>Vuelve mañana para un nuevo alfabeto</strong></p>
              </div>
            ) : (
              <form onSubmit={handleContinuar} className="seccion-accion-abc">
                <button
                  id="btn-continuar"
                  type="submit"
                  className="btn-iniciar-reto-abc"
                >
                  JUGAR AHORA
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}