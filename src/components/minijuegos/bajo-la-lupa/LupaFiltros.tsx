import { useState } from 'react';
import LupaSelectAutocompletado from './LupaSelectAutocompletado';
import type { OpcionAutocompletado, CategoriaFiltro } from './types';

interface Props {
    opcionesClub: OpcionAutocompletado[];
    opcionesPosicion: OpcionAutocompletado[];
    opcionesNacionalidad: OpcionAutocompletado[];
    opcionesEdad: OpcionAutocompletado[];
    opcionesAltura: OpcionAutocompletado[];
    opcionesValor: OpcionAutocompletado[];
    onSeleccionar: (tipo: CategoriaFiltro, opcion: OpcionAutocompletado) => void;
    onPreguntar: () => void;
    preguntaValida: boolean;
    disabled?: boolean;
}

const CATEGORIAS: Array<{ id: CategoriaFiltro; label: string }> = [
    { id: 'club', label: 'Club' },
    { id: 'posicion', label: 'Posición' },
    { id: 'nacionalidad', label: 'País' },
    { id: 'edad', label: 'Edad' },
    { id: 'altura', label: 'Altura' },
    { id: 'valor', label: 'Valor' },
];

export default function LupaFiltros({
    opcionesClub,
    opcionesPosicion,
    opcionesNacionalidad,
    opcionesEdad,
    opcionesAltura,
    opcionesValor,
    onSeleccionar,
    onPreguntar,
    preguntaValida,
    disabled = false,
}: Props) {
    const [catActiva, setCatActiva] = useState<CategoriaFiltro | null>(null);
    const [opcionTemp, setOpcionTemp] = useState<OpcionAutocompletado | null>(null);

    const opcionesPorCategoria: Record<CategoriaFiltro, OpcionAutocompletado[]> = {
        club: opcionesClub,
        posicion: opcionesPosicion,
        nacionalidad: opcionesNacionalidad,
        edad: opcionesEdad,
        altura: opcionesAltura,
        valor: opcionesValor,
    };

    const handleChipClick = (cat: CategoriaFiltro) => {
        if (disabled) return;
        if (catActiva === cat) {
            setCatActiva(null);
            setOpcionTemp(null);
            return;
        }
        setCatActiva(cat);
        setOpcionTemp(null);
    };

    const handleSeleccion = (opcion: OpcionAutocompletado | null) => {
        if (disabled) return;
        setOpcionTemp(opcion);
        if (opcion && catActiva) {
            onSeleccionar(catActiva, opcion);
        }
    };

    const handlePreguntarClick = () => {
        if (disabled) return;
        onPreguntar();
        setOpcionTemp(null);
        setCatActiva(null);
    };

    return (
        <div className="lupa-filtros">
            <div className="lupa-filtros-chips">
                {CATEGORIAS.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        className={`lupa-filtro-chip ${catActiva === cat.id ? 'lupa-filtro-chip-activo' : ''}`}
                        onClick={() => handleChipClick(cat.id)}
                        disabled={disabled}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {catActiva && (
                <div className="lupa-filtros-dropdown">
                    <LupaSelectAutocompletado
                        placeholder={`Buscar ${CATEGORIAS.find((c) => c.id === catActiva)?.label.toLowerCase()}...`}
                        opciones={opcionesPorCategoria[catActiva]}
                        onSeleccionar={handleSeleccion}
                        valorSeleccionado={opcionTemp}
                        disabled={disabled}
                    />
                </div>
            )}

            <div className="lupa-filtros-preguntar-row">
                <button
                    type="button"
                    className="lupa-filtros-btn-preguntar"
                    onClick={handlePreguntarClick}
                    disabled={!preguntaValida || disabled}
                >
                    Preguntar
                </button>
            </div>
        </div>
    );
}
