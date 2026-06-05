import { useState, useEffect } from 'react';
import './CopaLigaModal.css';

export default function CopaLigaModal() {
    const [visible, setVisible] = useState(false);
    const [noMostrar, setNoMostrar] = useState(false);

    useEffect(() => {
        const guardado = localStorage.getItem('copa-liga-modal-no-mostrar');
        if (!guardado) {
            setVisible(true);
        }
    }, []);

    const handleCerrar = () => {
        if (noMostrar) {
            localStorage.setItem('copa-liga-modal-no-mostrar', 'true');
        }
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-copa">
                <div className="modal-copa-img">
                    <img src="/img/copa-liga/trofeo-copa-liga.webp" alt="Copa de la Liga" />
                </div>

                <div className="modal-copa-body">
                    <h2 className="modal-copa-titulo">Copa de la Liga 2026</h2>
                    <p className="modal-copa-texto">
                        ¡Llega la Copa de la Liga 2026! Un nuevo torneo donde 34 equipos de Liga 1 y Liga 2 se enfrentarán en 10 grupos, seguidos de llaves de eliminación directa (octavos, cuartos, semis y final) en busca de la gloria. ¡Entra ya a nuestro simulador, pronostica cada una de las fases y arma todo el camino hasta la gran final para ver quién será el campeón!
                    </p>

                    <label className="modal-copa-check">
                        <input
                            type="checkbox"
                            checked={noMostrar}
                            onChange={(e) => setNoMostrar(e.target.checked)}
                        />
                        <span>No mostrar este mensaje nuevamente</span>
                    </label>

                    <button className="modal-copa-btn" onClick={handleCerrar}>
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
}