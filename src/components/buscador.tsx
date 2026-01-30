import { useState, useEffect, useRef } from 'react';
import todosLosJugadores from '../data/minijuegos/jugadores_obtenidos.json';
import type { Jugador } from '../types/minijuegos/jugador.interface';
import './BuscadorStyles.css';

interface Props {
  onJugadorSeleccionado: (jugador: Jugador) => void;
  posicionAFiltrar?: string;
}

function normalizarTexto(texto: string): string {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
}

export default function Buscador({ onJugadorSeleccionado }: Props) {
  const [busqueda, setBusqueda] = useState('');
  const [sugerencias, setSugerencias] = useState<Jugador[]>([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Efecto para enfocar automáticamente al cargar el componente
  useEffect(() => {
    // Si la referencia existe (el input está renderizado), le damos foco
    if (inputRef.current) {
        inputRef.current.focus();
    }
  }, []); // El array vacío asegura que solo corra al montarse

  useEffect(() => {
    if (busqueda.length > 1) {
      const resultados = todosLosJugadores.filter(jugador => 
        normalizarTexto(jugador.nombre.toLocaleLowerCase()).includes(normalizarTexto(busqueda))
      );
      setSugerencias(resultados);
      setMostrarLista(true);
    } else {
      setSugerencias([]);
      setMostrarLista(false);
    }
  }, [busqueda]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setBusqueda(e.target.value);
  }

  const handleSelect = (jugador: Jugador) => {
    onJugadorSeleccionado(jugador);
    setBusqueda('');
    setMostrarLista(false);
  };

  return (
    <div className="buscador-container">

      <div className="buscador-wrapper">
      
      <input
        ref={inputRef}
        type="text"
        placeholder="Escribe el nombre del jugador..."
        value={busqueda}
        onChange={handleInputChange}
        className="input-buscador"
      />

      {mostrarLista && sugerencias.length > 0 && (
        <ul className="lista-sugerencias">
          {sugerencias.map((jugador) => (
            <li 
              key={jugador.id} 
              onClick={() => handleSelect(jugador)}
              style={{
                padding: '10px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '10px',
                color: '#333'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <img 
                src={jugador.url_foto !== "https://img.a.transfermarkt.technology/portrait/header/default.jpg?lm=1" 
                      ? jugador.url_foto 
                      : "/img/minijuegos/default.webp"} 
                alt={jugador.nombre}
                style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} 
              />
              
              <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-start',
                  textAlign: 'left'
              }}>
                <span style={{ fontWeight: 'bold' }}>{jugador.nombre}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      </div>
    </div>
  );
}