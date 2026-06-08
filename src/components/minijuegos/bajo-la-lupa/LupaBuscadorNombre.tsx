import { useState, useEffect, useRef, useMemo } from 'react';
import { normalizar } from './bajo-la-lupa-logic';

interface JugadorNombre {
    id: number;
    nombre: string;
}

interface Props {
    jugadores: JugadorNombre[];
    onSeleccionar: (jugador: JugadorNombre) => void;
    disabled?: boolean;
    usado?: boolean;
    maxResultados?: number;
}

export default function LupaBuscadorNombre({
    jugadores,
    onSeleccionar,
    disabled = false,
    usado = false,
    maxResultados = 8,
}: Props) {
    const [input, setInput] = useState('');
    const [abierto, setAbierto] = useState(false);
    const [highlightedIdx, setHighlightedIdx] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const filtrados = useMemo(() => {
        if (!input.trim()) return [];
        const norm = normalizar(input);
        return jugadores
            .filter((j) => j.nombre && j.nombre.trim() !== '')
            .filter((j) => normalizar(j.nombre).includes(norm))
            .slice(0, maxResultados);
    }, [input, jugadores, maxResultados]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setAbierto(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSeleccionar = (jugador: JugadorNombre) => {
        if (disabled || usado) return;
        onSeleccionar(jugador);
        setInput('');
        setAbierto(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled || usado) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setAbierto(true);
            setHighlightedIdx((i) => Math.min(i + 1, filtrados.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIdx((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (abierto && filtrados[highlightedIdx]) {
                handleSeleccionar(filtrados[highlightedIdx]);
            }
        } else if (e.key === 'Escape') {
            setAbierto(false);
        }
    };

    return (
        <div className="lupa-buscador-nombre" ref={containerRef}>
            <input
                type="text"
                className="form-control form-control-sm lupa-buscador-nombre-input"
                placeholder="Busca el jugador"
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                    setAbierto(true);
                    setHighlightedIdx(0);
                }}
                onFocus={() => !disabled && !usado && setAbierto(true)}
                onKeyDown={handleKeyDown}
                disabled={disabled || usado}
                autoComplete="off"
            />
            {abierto && !disabled && !usado && filtrados.length > 0 && (
                <ul className="lupa-buscador-nombre-dropdown">
                    {filtrados.map((j, idx) => (
                        <li
                            key={j.id}
                            className={`lupa-buscador-nombre-option ${idx === highlightedIdx ? 'lupa-buscador-nombre-option-highlighted' : ''}`}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleSeleccionar(j);
                            }}
                            onMouseEnter={() => setHighlightedIdx(idx)}
                        >
                            {j.nombre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
