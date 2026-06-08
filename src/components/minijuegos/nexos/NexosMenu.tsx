import './styles.css';

interface Props {
    onJugar: () => void;
    deshabilitado?: boolean;
}

export default function NexosMenu({ onJugar, deshabilitado = false }: Props) {
    return (
        <div className="contenedor-configuracion">
            <div className="menu-nexos-full-bg fade-in">

                <div className="nexos-overlay-fondo"></div>

                <div className="nexos-contenido-contenedor">

                    <div className="nexos-cabecera text-center">
                        <span className="menu-nexos-badge">RETO DIARIO</span>
                        <h1 className="menu-nexos-titulo">NEXOS</h1>
                        <p className="menu-nexos-subtitulo">El Templo de las Conexiones</p>
                    </div>

                    <div className="nexos-cuerpo-accion text-center">
                        <p className="menu-nexos-descripcion">
                            <strong>¿Te consideras un especialista en el mercado de pases de nuestra liga?</strong>
                            {" "}Nexos es el laboratorio donde los vestuarios, las trayectorias y la historia del fútbol peruano se entrelazan. Tu misión es <strong>conectar a dos futbolistas</strong> distintos construyendo un puente de compañeros de equipo que compartieron club y año, en la primera división entre 2010 y 2026.
                        </p>

                        <ul className="nexos-reglas">
                            <li>Cada jugador agregado al camino debe haber sido <strong>compañero de equipo</strong> del anterior en algún año.</li>
                            <li>Tienes que <strong>conectar un origen y un destino</strong> en la menor cantidad de pases posible.</li>
                            <li>Menos pases = más estrellas (1⭐, 2⭐ o 3⭐ según la eficiencia del camino).</li>
                            <li>Si no puedes conectar, puedes <strong>rendirte</strong> y ver el resultado del día.</li>
                            <li><strong>Reto diario</strong></li>
                        </ul>

                        {deshabilitado && (
                            <div className="menu-nexos-ya-jugado">
                                <span className="menu-nexos-ya-jugado-icono">⏳</span>
                                <span>Ya jugaste Nexos hoy. Vuelve mañana.</span>
                            </div>
                        )}

                        <button
                            className={`menu-nexos-btn ${deshabilitado ? 'menu-nexos-btn-deshabilitado' : ''}`}
                            onClick={() => onJugar()}
                            disabled={deshabilitado}
                            type="button"
                        >
                            JUGAR
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
