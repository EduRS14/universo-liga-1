// 1. Definimos la estructura básica de un jugador
export interface Jugador {
  nombre: string;
  nacionalidad: string;
}

// 2. Definimos la estructura de la plantilla dividida por posiciones
export interface Plantilla {
  arqueros: Jugador[];
  defensas: Jugador[];
  volantes: Jugador[];
  delanteros: Jugador[];
}

// 3. Estructura para los colores del equipo
export interface Colores {
  primario: string;   // Ej: "#87CEEB"
  secundario: string; // Ej: "#FFFFFF"
}

// 4. Estructura de la identidad del club
export interface Identidad {
  fecha_fundacion: string;
  ciudad: string;
  apodos: string[];
  colores: Colores;
}

// 5. Estructura del estadio
export interface Estadio {
  nombre: string;
  capacidad: number;
  altura_msnm: number; // Metros sobre el nivel del mar
  url_foto: string;
}

// 6. Estructura del cuerpo técnico
export interface CuerpoTecnico {
  dt: string;
  nacionalidad: string;
}

// 7. Estructura de los títulos (Palmarés)
export interface Palmares {
  titulos_primera_division: number;
  titulos_internacionales: string[];
}

// 8. INTERFAZ PRINCIPAL: Agrupa todo lo anterior
export interface EquipoInformacion {
  id: number;
  nombre: string;
  diminutivo: string;
  url_foto: string;
  identidad: Identidad;
  historia: string;
  palmares: Palmares;
  estadio: Estadio;
  cuerpo_tecnico: CuerpoTecnico;
  plantilla: Plantilla;
}