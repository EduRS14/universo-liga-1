import { MAX_INTENTOS } from './bajo-la-lupa-logic';

interface Props {
    intentosRestantes: number;
    nombreUsado: boolean;
}

export default function LupaBadgeIntentos({ intentosRestantes }: Props) {
    const total = MAX_INTENTOS;
    const usados = total - intentosRestantes;
    return (
        <div className="lupa-badge-intentos">
            <div className="lupa-badge-circulos">
                {Array.from({ length: total }).map((_, i) => (
                    <span
                        key={i}
                        className={`lupa-badge-circulo ${i >= total - usados ? 'lupa-badge-circulo-usado' : 'lupa-badge-circulo-disponible'}`}
                    />
                ))}
            </div>
            <span className="lupa-badge-contador">{intentosRestantes}/{total}</span>
        </div>
    );
}
