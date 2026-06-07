import { ICONOS_CATEGORIA, NOMBRES_CATEGORIA, type Categoria } from './subeybaja-logic';
import './styles.css';

interface Props {
    categoria: Categoria;
}

export default function CategoriaDisplay({ categoria }: Props) {
    return (
        <div className="subeybaja-categoria-display">
            <span className="subeybaja-categoria-icono">{ICONOS_CATEGORIA[categoria]}</span>
            <span className="subeybaja-categoria-label">Compara por:</span>
            <span className="subeybaja-categoria-valor">{NOMBRES_CATEGORIA[categoria]}</span>
        </div>
    );
}
