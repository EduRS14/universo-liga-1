// src/components/minijuegos/el-tapadito/juego/teclado.tsx
import React from 'react';
import './styles.css';

const TECLAS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

interface TecladoProps {
  letrasUsadas: Record<string, 'verde' | 'amarillo' | 'gris'>;
  onKeyPress: (key: string) => void;
  disabled?: boolean;
}

export const TecladoVirtual: React.FC<TecladoProps> = ({ letrasUsadas, onKeyPress, disabled }) => {
  return (
    <div className={`tapadito-teclado ${disabled ? 'disabled' : ''}`}>
      {TECLAS.map((fila, i) => (
        <div key={i} className="teclado-fila">
          {fila.map((tecla) => {
            const estado = letrasUsadas[tecla];
            const esEnter = tecla === 'ENTER';
            const esBorrar = tecla === 'BACKSPACE';
            const label = esBorrar ? '⌫' : tecla;

            return (
              <button
                key={tecla}
                onClick={() => !disabled && onKeyPress(tecla)}
                disabled={disabled}
                className={`tecla ${estado || ''} ${esEnter || esBorrar ? 'tecla-especial' : ''}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};