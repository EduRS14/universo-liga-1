// src/components/ModalSeleccion.tsx
import React from 'react';
import type { Jugador } from '../../../../types/minijuegos/jugador.interface';
import './modal.styles.css';

interface ModalSeleccionProps {
  candidatos: Jugador[];
  onSelect: (jugador: Jugador) => void;
  onClose: () => void;
}

export const ModalSeleccion: React.FC<ModalSeleccionProps> = ({ 
  candidatos, 
  onSelect, 
  onClose 
}) => {
  if (!candidatos || candidatos.length === 0) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>¿A quién te refieres?</h3>
        <p>Encontramos varios jugadores con ese apellido.</p>

        <div className="grid-jugadores">
          {candidatos.map((jugador) => (
            <div 
              key={jugador.id} 
              className="card-candidato"
              onClick={() => onSelect(jugador)}
              role="button"
              tabIndex={0}
            >
              <img 
                src={jugador.url_foto || '/img/minijuegos/default.webp'} 
                alt={jugador.nombre}
                className="img-candidato"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/img/minijuegos/default.webp';
                }}
              />
              <div className="nombre-candidato">{jugador.nombre}</div>
            </div>
          ))}
        </div>
        
        <button 
          className="btn-cancelar"
          onClick={onClose} 
        >
          Cancelar / Intentar otro apellido
        </button>
      </div>
    </div>
  );
};