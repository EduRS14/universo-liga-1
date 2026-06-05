import type { EquipoCopa } from '../../types/copa-liga/equipo';
import './styles.css';

interface Props {
    equipo: EquipoCopa;
}

export default function ChampionDisplay({ equipo }: Props) {
    return (
        <div className="contenedor-campeon">
            <div className="campeon-card">
                <div className="campeon-trofeo">🏆</div>
                <h2 className="campeon-label">¡CAMPEÓN DE LA COPA DE LA LIGA 2026!</h2>
                <img src={equipo.url_foto} alt={equipo.nombre} className="campeon-logo" />
                <h1 className="campeon-nombre">{equipo.nombre}</h1>
                <p className="campeon-info">{equipo.ciudad} - {equipo.division}</p>
                <div className="campeon-premios">
                    <p><strong>+2 puntos</strong> en la tabla acumulada 2027 de su liga</p>
                </div>
            </div>
        </div>
    );
}
