import type { GrupoCopa, FechaCopa } from '../../types/copa-liga/grupo';
import { calcularTablaGrupo } from '../../utils/copa-liga/calcular-tabla';
import './styles.css';

interface Props {
    grupo: GrupoCopa;
    fechas: FechaCopa[];
}

export default function TablaGrupo({ grupo, fechas }: Props) {
    const tabla = calcularTablaGrupo(grupo, fechas);
    const equiposMap = new Map(grupo.equipos.map(e => [e.id, e]));

    const clasificados = grupo.tipo === 'cuatro' ? 2 : 1;

    return (
        <div className="contenedor-tabla-copa">
            <h3 className="titulo-tabla-copa">Tabla - Grupo {grupo.letra}</h3>

            <div className="tabla-encabezado">
                <div className="tabla-col col-pos">#</div>
                <div className="tabla-col col-equipo">Equipo</div>
                <div className="tabla-col col-num">PJ</div>
                <div className="tabla-col col-num">PG</div>
                <div className="tabla-col col-num">PE</div>
                <div className="tabla-col col-num">PP</div>
                <div className="tabla-col col-num d-none d-lg-block">GF</div>
                <div className="tabla-col col-num d-none d-lg-block">GC</div>
                <div className="tabla-col col-num">DG</div>
                <div className="tabla-col col-num">PTS</div>
            </div>

            {tabla.map((fila, idx) => {
                const equipo = equiposMap.get(fila.equipo_id);
                const esClasificado = idx < clasificados;
                return (
                    <div key={fila.equipo_id} className={`tabla-fila ${esClasificado ? 'fila-clasificado' : ''}`}>
                        <div className="tabla-col col-pos">
                            <div className="pos-indicator" style={{ backgroundColor: esClasificado ? '#32a869' : 'transparent' }}>
                                {idx + 1}
                            </div>
                        </div>
                        <div className="tabla-col col-equipo">
                            <img src={equipo?.url_foto} alt={equipo?.nombre} className="tabla-logo" />
                            <span className="d-none d-lg-inline">{equipo?.nombre}</span>
                            <span className="d-inline d-lg-none">{equipo?.diminutivo}</span>
                        </div>
                        <div className="tabla-col col-num">{fila.partidosJugados}</div>
                        <div className="tabla-col col-num">{fila.victorias}</div>
                        <div className="tabla-col col-num">{fila.empates}</div>
                        <div className="tabla-col col-num">{fila.derrotas}</div>
                        <div className="tabla-col col-num d-none d-lg-block">{fila.golesFavor}</div>
                        <div className="tabla-col col-num d-none d-lg-block">{fila.golesContra}</div>
                        <div className="tabla-col col-num">{fila.diferenciaGoles}</div>
                        <div className="tabla-col col-num pts">{fila.puntos}</div>
                    </div>
                );
            })}

            <div className="tabla-leyenda">
                <div className="leyenda-item">
                    <div className="leyenda-color" style={{ backgroundColor: '#32a869' }}></div>
                    <span>Clasificado</span>
                </div>
            </div>
        </div>
    );
}
