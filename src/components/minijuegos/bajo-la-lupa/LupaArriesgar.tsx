import LupaBuscadorNombre from './LupaBuscadorNombre';

interface JugadorNombre {
    id: number;
    nombre: string;
}

interface Props {
    jugadores: JugadorNombre[];
    onArriesgar: (nombre: string) => void;
    disabled: boolean;
    usado: boolean;
    intentosRestantes: number;
    maxIntentos: number;
}

export default function LupaArriesgar({
    jugadores,
    onArriesgar,
    disabled,
    usado,
    intentosRestantes,
    maxIntentos,
}: Props) {
    return (
        <div className="lupa-arriesgar">
            <p className="lupa-arriesgar-titulo">¿Sabes quién es? Arriesga su nombre</p>
            {intentosRestantes > 0 && !disabled && (
                <p className="lupa-arriesgar-contador">
                    Te quedan {intentosRestantes} de {maxIntentos} intentos
                </p>
            )}
            <div className="lupa-arriesgar-grupo">
                <LupaBuscadorNombre
                    jugadores={jugadores}
                    onSeleccionar={(j) => onArriesgar(j.nombre)}
                    usado={usado || disabled}
                />
            </div>
            {usado && (
                <p className="lupa-arriesgar-usado">Ya usaste todos tus intentos de nombre.</p>
            )}
        </div>
    );
}
