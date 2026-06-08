import { useState, useEffect, useRef, useMemo } from 'react';
import type { OpcionAutocompletado } from './types';
import { normalizar } from './bajo-la-lupa-logic';

interface Props {
    placeholder: string;
    opciones: OpcionAutocompletado[];
    onSeleccionar: (opcion: OpcionAutocompletado | null) => void;
    valorSeleccionado: OpcionAutocompletado | null;
    disabled?: boolean;
    maxResultados?: number;
}

export default function LupaSelectAutocompletado({
    placeholder,
    opciones,
    onSeleccionar,
    valorSeleccionado,
    disabled = false,
    maxResultados = 50,
}: Props) {
    const [inputValue, setInputValue] = useState(valorSeleccionado?.label ?? '');
    const [abierto, setAbierto] = useState(false);
    const [highlightedIdx, setHighlightedIdx] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(valorSeleccionado?.label ?? '');
    }, [valorSeleccionado]);

    const filtradas = useMemo(() => {
        const tieneValor = valorSeleccionado && inputValue === valorSeleccionado.label;
        if (!inputValue.trim() || tieneValor) {
            return opciones.slice(0, maxResultados);
        }
        const norm = normalizar(inputValue);
        return opciones.filter(o => normalizar(o.label).includes(norm)).slice(0, maxResultados);
    }, [inputValue, opciones, valorSeleccionado, maxResultados]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setAbierto(false);
                if (valorSeleccionado) {
                    setInputValue(valorSeleccionado.label);
                } else {
                    setInputValue('');
                    onSeleccionar(null);
                }
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [valorSeleccionado, onSeleccionar]);

    const seleccionar = (opcion: OpcionAutocompletado) => {
        setInputValue(opcion.label);
        setAbierto(false);
        onSeleccionar(opcion);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setAbierto(true);
            setHighlightedIdx(i => Math.min(i + 1, filtradas.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIdx(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (abierto && filtradas[highlightedIdx]) {
                seleccionar(filtradas[highlightedIdx]);
            }
        } else if (e.key === 'Escape') {
            setAbierto(false);
        }
    };

    return (
        <div className="lupa-select-autocomplete" ref={containerRef}>
            <input
                ref={inputRef}
                type="text"
                className="form-control form-control-sm lupa-select-input"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setAbierto(true);
                    setHighlightedIdx(0);
                    if (valorSeleccionado && e.target.value !== valorSeleccionado.label) {
                        onSeleccionar(null);
                    }
                }}
                onFocus={() => {
                    if (!disabled) {
                        setAbierto(true);
                        setHighlightedIdx(0);
                    }
                }}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                autoComplete="off"
            />
            {abierto && !disabled && filtradas.length > 0 && (
                <ul className="lupa-select-dropdown">
                    {filtradas.map((op, idx) => (
                        <li
                            key={String(op.value)}
                            className={`lupa-select-option ${idx === highlightedIdx ? 'lupa-select-option-highlighted' : ''}`}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                seleccionar(op);
                            }}
                            onMouseEnter={() => setHighlightedIdx(idx)}
                        >
                            {op.label}
                        </li>
                    ))}
                </ul>
            )}
            {abierto && !disabled && filtradas.length === 0 && (
                <ul className="lupa-select-dropdown">
                    <li className="lupa-select-option lupa-select-option-empty">Sin resultados</li>
                </ul>
            )}
        </div>
    );
}
