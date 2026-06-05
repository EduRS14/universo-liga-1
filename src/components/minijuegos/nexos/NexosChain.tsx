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
    cadena: NexoJugador[];
    destino: NexoJugador | null;
    nexoFallido: number | null;
    valido?: boolean;
}

export default function NexosChain({ cadena, destino, nexoFallido, valido = false }: Props) {
    return (
        <div className="nexos-chain">
            {cadena.map((jugador, idx) => (
                <div key={`${jugador.id}-${idx}`} className="nexos-nodo-container">
                    <div className={`nexos-nodo ${nexoFallido === idx ? 'nexos-nodo-error' : ''} ${valido ? 'nexos-nodo-valido' : ''}`}>
                        <img
                            src={jugador.url_foto}
                            alt={jugador.nombre}
                            className="nexos-nodo-foto"
                        />
                        <span className="nexos-nodo-nombre">{jugador.nombre}</span>
                    </div>
                    {idx < cadena.length - 1 && (
                        <div className={`nexos-flecha ${nexoFallido === idx + 1 ? 'nexos-flecha-error' : ''}`}>
                            ↓
                        </div>
                    )}
                </div>
            ))}

            {destino && (
                <>
                    <div className={`nexos-flecha ${nexoFallido === cadena.length ? 'nexos-flecha-error' : ''}`}>
                        ↓
                    </div>
                    <div className="nexos-nodo-container">
                        <div className={`nexos-nodo nexos-nodo-destino ${nexoFallido === cadena.length ? 'nexos-nodo-error' : ''} ${valido ? 'nexos-nodo-valido' : ''}`}>
                            <img
                                src={destino.url_foto}
                                alt={destino.nombre}
                                className="nexos-nodo-foto"
                            />
                            <span className="nexos-nodo-nombre">{destino.nombre}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}