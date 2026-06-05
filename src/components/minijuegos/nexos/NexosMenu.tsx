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
                            ¿Te consideras un <strong>verdadero especialista</strong> en el mercado de pases de nuestra liga? <strong>Nexos</strong> es el laboratorio donde los vestuarios, las trayectorias y la historia del fútbol peruano se entrelazan. El desafío pondrá a prueba tu memoria de forma milimétrica: debes <strong>conectar a dos futbolistas</strong> de épocas o estilos totalmente distintos construyendo un <strong>puente de compañeros de equipo</strong> que compartieron club y año. ¿Serás capaz de trazar la <strong>ruta perfecta con la menor cantidad de pases posibles</strong> o te quedarás sin ideas a mitad del camino? ¡Demuestra que conoces el recorrido de cada camiseta y encuentra el nexo del día!
                        </p>

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
