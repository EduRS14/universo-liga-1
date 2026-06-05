const KEYS_FASES = [
    "copa-liga-octavos",
    "copa-liga-cuartos",
    "copa-liga-semifinales",
    "copa-liga-final",
    "copa-liga-ganador"
];

export function invalidarHaciaAdelante(fase: "grupos" | "octavos" | "cuartos" | "semifinales") {
    switch (fase) {
        case "grupos":
            KEYS_FASES.forEach(key => localStorage.removeItem(key));
            break;
        case "octavos":
            ["copa-liga-cuartos", "copa-liga-semifinales", "copa-liga-final", "copa-liga-ganador"]
                .forEach(key => localStorage.removeItem(key));
            break;
        case "cuartos":
            ["copa-liga-semifinales", "copa-liga-final", "copa-liga-ganador"]
                .forEach(key => localStorage.removeItem(key));
            break;
        case "semifinales":
            ["copa-liga-final", "copa-liga-ganador"]
                .forEach(key => localStorage.removeItem(key));
            break;
    }
}
