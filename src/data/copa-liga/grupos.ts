import type { GrupoCopa } from "../../types/copa-liga/grupo";
import equipos from "./equipos-copa.json";

const getEquipo = (id: number) => {
    const e = equipos.find(eq => eq.id === id);
    if (!e) throw new Error(`Equipo no encontrado: ${id}`);
    return e;
};

export const gruposCopa: GrupoCopa[] = [
    {
        letra: "A",
        tipo: "cuatro",
        equipos: [getEquipo(1), getEquipo(2), getEquipo(3), getEquipo(4)]
    },
    {
        letra: "B",
        tipo: "tres",
        equipos: [getEquipo(5), getEquipo(6), getEquipo(7)]
    },
    {
        letra: "C",
        tipo: "tres",
        equipos: [getEquipo(8), getEquipo(9), getEquipo(10)]
    },
    {
        letra: "D",
        tipo: "tres",
        equipos: [getEquipo(11), getEquipo(12), getEquipo(13)]
    },
    {
        letra: "E",
        tipo: "cuatro",
        equipos: [getEquipo(14), getEquipo(15), getEquipo(16), getEquipo(17)]
    },
    {
        letra: "F",
        tipo: "cuatro",
        equipos: [getEquipo(18), getEquipo(19), getEquipo(20), getEquipo(21)]
    },
    {
        letra: "G",
        tipo: "tres",
        equipos: [getEquipo(22), getEquipo(23), getEquipo(24)]
    },
    {
        letra: "H",
        tipo: "tres",
        equipos: [getEquipo(25), getEquipo(26), getEquipo(27)]
    },
    {
        letra: "I",
        tipo: "tres",
        equipos: [getEquipo(28), getEquipo(29), getEquipo(30)]
    },
    {
        letra: "J",
        tipo: "cuatro",
        equipos: [getEquipo(31), getEquipo(32), getEquipo(33), getEquipo(34)]
    }
];
