import './styles.css';

interface Props {
    tipo: 'victoria' | 'derrota' | 'rendicion';
    estrellas?: number;
    label?: string;
    onVolver: () => void;
}

export default function NexosModal({ tipo, estrellas, label, onVolver }: Props) {
    let titulo = '';
    let icono = '';
    let mensaje = '';

    if (tipo === 'victoria') {
        titulo = '¡VICTORIA!';
        icono = '🏆';
        mensaje = label ?? '';
    } else if (tipo === 'derrota') {
        titulo = 'DERROTA';
        icono = '❌';
        mensaje = 'No lograste conectar el nexo. Vuelve mañana para intentarlo de nuevo.';
    } else {
        titulo = 'TE RINDISTE';
        icono = '🏳️';
        mensaje = 'Has abandonado el reto. Vuelve mañana para intentarlo de nuevo.';
    }

    const mostrarEstrellas = tipo === 'victoria' && (estrellas ?? 0) > 0;

    return (
        <div className="nexos-modal-overlay" onClick={onVolver}>
            <div
                className={`nexos-modal nexos-modal-${tipo}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="nexos-modal-icono">{icono}</div>
                <h2 className="nexos-modal-titulo">{titulo}</h2>
                {mostrarEstrellas ? (
                    <>
                        <div className="nexos-modal-estrellas">
                            {[1, 2, 3].map(i => (
                                <span
                                    key={i}
                                    className={`nexos-modal-estrella ${i <= (estrellas ?? 0) ? 'nexos-modal-estrella-llena' : ''}`}
                                >
                                    ⭐
                                </span>
                            ))}
                        </div>
                        {mensaje && <p className="nexos-modal-label">{mensaje}</p>}
                    </>
                ) : tipo === 'victoria' ? (
                    <p className="nexos-modal-label">{mensaje}</p>
                ) : (
                    <p className="nexos-modal-mensaje">{mensaje}</p>
                )}
                <button className="nexos-modal-btn" onClick={onVolver} type="button">
                    VOLVER AL MENÚ
                </button>
            </div>
        </div>
    );
}
