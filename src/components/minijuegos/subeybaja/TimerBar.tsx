import './styles.css';

interface Props {
    segundos: number;
    total: number;
}

export default function TimerBar({ segundos, total }: Props) {
    const porcentaje = Math.max(0, Math.min(100, (segundos / total) * 100));
    const claseColor = segundos <= 3 ? 'subeybaja-timer-critico' : segundos <= 7 ? 'subeybaja-timer-alerta' : '';
    return (
        <div className="subeybaja-timer-wrapper">
            <div className="subeybaja-timer-barra">
                <div
                    className={`subeybaja-timer-relleno ${claseColor}`}
                    style={{ width: `${porcentaje}%` }}
                />
            </div>
            <span className="subeybaja-timer-texto">{Math.ceil(segundos)}s</span>
        </div>
    );
}
