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
         {/* Pasamos los datos como props al componente del juego real */}
         <JuegoElABC todosLosEquipos={todosLosEquipos} todosLosJugadores={todosLosJugadores} />
      </div>
    );
  }

  return (
      <div className="contenedor-configuracion">
        {yaJugoHoy && (
          <div style={{ backgroundColor: 'rgba(255, 255, 0, 0.2)', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
               <p style={{ color: '#ffd700', textAlign: 'center', margin: 0 }}>
                  ⚠️ Nota: Ya has completado el reto diario de hoy.
              </p>
          </div>
        )}

        <div className="container-fluid">
          <div className="row justify-content-evenly align-items-center">

            <div className="col-10 col-lg-4 d-flex justify-content-center">

              <img src="/img/minijuegos/juegos/el-abc.webp" alt="El ABC" className='img-fluid img-el-once'/>

            </div>
            <div className="col-10 col-lg-4">

              <p className='presentacion-el-once'>
                No basta con saber quién fue campeón. En <strong>El ABC,</strong> el azar es el verdadero rival. Te enfrentamos a una ruta de 22 letras, y en cada parada te esperará un <strong>escudo diferente</strong> de la Primera División (2010-2026). Podrías tener que recordar a un crack de la 'U' con la A, y al segundo siguiente, buscar a uno de San Simón con la B. ¿Tienes el <strong>archivo mental suficiente</strong> para completar el abecedario sin equivocarte?
              </p>

              
              <div style={{ marginTop: '2rem' }}>
                <button
                  id="btn-continuar"
                  className="btn btn-jugar"
                  onClick={handleContinuar}
                >
                  Jugar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

}