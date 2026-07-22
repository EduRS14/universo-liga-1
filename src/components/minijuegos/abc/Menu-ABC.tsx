import { useState, useEffect } from 'react';
import Spinner from '../Spinner';
import './styles.css';
import { JuegoElABC } from './juego/juego-el-abc';

import Equipos from '../../../data/minijuegos/equipos.json'; 
import Jugadores from '../../../data/minijuegos/jugadores_obtenidos.json';

import type { Equipo } from '../../../types/minijuegos/equipo';
import type { Jugador } from '../../../types/minijuegos/jugador.interface';

const todosLosEquipos: Equipo[] = Equipos as Equipo[];
const todosLosJugadores: Jugador[] = Jugadores as Jugador[];

type Dificultad = 'facil' | 'intermedio' | 'dificil';

const DIFICULTADES: { label: string; value: Dificultad }[] = [
  { label: 'Fácil', value: 'facil' },
  { label: 'Intermedio', value: 'intermedio' },
  { label: 'Difícil', value: 'dificil' },
];

const SLIDES = [
  { emoji: '🎲', title: 'Letra al Azar', text: 'Cada ronda se te asignará una letra del abecedario junto a un escudo aleatorio de la Liga 1 (2010-2026).', img: 'slide-1.webp' },
  { emoji: '👤', title: 'Nombra un Jugador', text: 'Debes escribir el nombre de un futbolista que haya pertenecido a ese equipo y cuyo nombre empiece con esa letra.', img: 'slide-2.webp' },
  { emoji: '💡', title: 'Pistas y Saltos', text: 'Usa una pista para descubrir el equipo o salta la letra si te quedas atascado. Tienes 3 saltos por partida.', img: 'slide-3.webp' },
  { emoji: '🏆', title: 'Completa el ABC', text: 'Completa las 22 letras del abecedario para ganar. Juega a tu ritmo, sin límite de tiempo.', img: 'slide-4.webp' },
];

// --- COMPONENTE PRINCIPAL ---
export default function MenuABC() {
  const [dificultad, setDificultad] = useState<Dificultad>('intermedio');
  
  const [juegoIniciado, setJuegoIniciado] = useState(false);

  const [loading, setLoading] = useState(true);

  // 1. CARGA INICIAL (Montaje)
  useEffect(() => {
    // A) Chequear si hay una partida en curso (Recuperación de estado)
    const iniciadoPrevio = localStorage.getItem('juegoIniciadoElABC');
    
    if (iniciadoPrevio === 'true') {
        setJuegoIniciado(true);
    }

    // B) Recuperar dificultad guardada
    const difGuardada = localStorage.getItem('elABC_dificultad');
    if (difGuardada === 'facil' || difGuardada === 'intermedio' || difGuardada === 'dificil') {
      setDificultad(difGuardada);
    }

    setLoading(false);

  }, []);

  // 2. GUARDADO (Al dar Click)
  const handleContinuar = (e: React.FormEvent) => {
    e.preventDefault();

    setJuegoIniciado(true);

    // Guardar en LocalStorage
    localStorage.setItem('juegoIniciadoElABC', 'true');
    localStorage.setItem('elABC_dificultad', dificultad);
  };

  if (loading) {
    return <Spinner size="lg" mensaje="Preparando El ABC..." />;
  }

  // --- VISTA DEL JUEGO ---
  if (juegoIniciado) {
    return (
      <div className="fade-in">
         <JuegoElABC todosLosEquipos={todosLosEquipos} todosLosJugadores={todosLosJugadores} dificultad={dificultad} />
      </div>
    );
  }

  // --- VISTA DEL MENÚ ---
  return (
    <div className="contenedor-configuracion abc-menu-wrapper">
      <div className="menu-juego-abc-full-bg fade-in">
        
        {/* CONTENIDO FLOTANTE */}
        <div className="abc-contenido-contenedor">
          
          {/* Cabecera del Juego */}
          <div className="abc-cabecera text-center">
            <span className="badge-categoria-abc">RETO</span>
            <h1 className="titulo-hero-abc">EL ABC</h1>
            <h2 className="subtitulo-hero-abc">LA RULETA DE NOMBRES</h2>
          </div>

          {/* Cuerpo y Acción */}
          <div className="abc-cuerpo-accion text-center">
            <p className="descripcion-juego-abc text-justify">
              En El ABC, el verdadero desafío no es recordar campeones, sino completar una <strong>ruta aleatoria de 22 letras</strong> identificando jugadores de distintos clubes de la <strong>Primera División (2010–2026)</strong> en un <strong>reto ilimitado</strong> que pondrá a prueba tu memoria futbolera.
            </p>

            {/* SLIDER DE INSTRUCCIONES */}
            <div id="sliderABC" className="carousel slide abc-slider" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#sliderABC" data-bs-slide-to="0" className="active" aria-label="Slide 1" />
                <button type="button" data-bs-target="#sliderABC" data-bs-slide-to="1" aria-label="Slide 2" />
                <button type="button" data-bs-target="#sliderABC" data-bs-slide-to="2" aria-label="Slide 3" />
                <button type="button" data-bs-target="#sliderABC" data-bs-slide-to="3" aria-label="Slide 4" />
              </div>
              <div className="carousel-inner">
                {SLIDES.map((slide, i) => (
                  <div key={slide.title} className={`carousel-item${i === 0 ? ' active' : ''}`}>
                    <div className="abc-slide-inner">
                      <div className="abc-slide-placeholder">
                        <span className="abc-slide-emoji">{slide.emoji}</span>
                      </div>
                      <img
                        src={`/img/minijuegos/tutoriales/el-abc/${slide.img}`}
                        alt={slide.title}
                        className="abc-slide-img"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                    <div className="abc-slide-caption">
                      <h5>{slide.title}</h5>
                      <p>{slide.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#sliderABC" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#sliderABC" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>

            <form onSubmit={handleContinuar} className="seccion-accion-abc">
              {/* SELECTOR DE DIFICULTAD */}
              <div className="contenedor-config-dificultad-abc">
                <h3 className="titulo-config-abc">🎯 Selecciona tu nivel:</h3>
                <div className="selector-dificultad-abc">
                  {DIFICULTADES.map((item) => (
                    <div key={item.value} className="opcion-radio-wrapper-abc">
                      <input
                        type="radio"
                        id={`dificultad-${item.value}`}
                        name="dificultad"
                        value={item.value}
                        className="radio-oculto-abc"
                        onChange={() => setDificultad(item.value)}
                        checked={dificultad === item.value}
                      />
                      <label htmlFor={`dificultad-${item.value}`} className="radio-label-abc">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                id="btn-continuar"
                type="submit"
                className="btn-iniciar-reto-abc"
              >
                JUGAR AHORA
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}