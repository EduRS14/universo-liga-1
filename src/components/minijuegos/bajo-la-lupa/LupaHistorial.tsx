import type { EntradaHistorial } from './types';

interface Props {
    historial: EntradaHistorial[];
}

export default function LupaHistorial({ historial }: Props) {
    if (historial.length === 0) {
        return (
            <div className="lupa-historial-vacio">
                Tus preguntas y respuestas aparecerán aquí
            </div>
        );
    }
    return (
        <div className="lupa-historial-contenido">
            {historial.map((e, i) => (
                <div key={i} className="lupa-historial-entry">
                    <span className="lupa-historial-q">{e.pregunta}</span>
                    <span className={`lupa-historial-a ${e.respuesta === 'SI' ? 'si' : 'no'}`}>
                        {e.respuesta === 'SI' ? 'Sí' : 'No'}
                    </span>
                </div>
            ))}
        </div>
    );
}
