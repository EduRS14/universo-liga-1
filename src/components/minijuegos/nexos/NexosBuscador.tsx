import { useState, useMemo } from 'react';
import './styles.css';

interface NexoJugador {
    id: number;
    nombre: string;
    url_foto?: string;
    equiposJugados: {
        id_equipo: number;
        periodos: number[][];
    }[];
}

interface Props {
    jugadores: NexoJugador[];
    onAgregar: (jugador: NexoJugador) => void;
}

function normalizar(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function NexosBuscador({ jugadores, onAgregar }: Props) {
    const [busqueda, setBusqueda] = useState('');

    const filtrados = useMemo(() => {
        if (!busqueda.trim()) return [];
        const lower = normalizar(busqueda);
        return jugadores
            .filter(j => normalizar(j.nombre).includes(lower))
            .slice(0, 8);
    }, [jugadores, busqueda]);

    return (
        <div className="nexos-buscador">
            <input
                type="text"
                className="nexos-buscador-input"
                placeholder="Buscar jugador..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
            />
            {filtrados.length > 0 && (
                <div className="nexos-buscador-lista">
                    {filtrados.map(j => (
                        <button
                            key={j.id}
                            className="nexos-buscador-item"
                            onClick={() => { onAgregar(j); setBusqueda(''); }}
                        >
                            {j.nombre}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
