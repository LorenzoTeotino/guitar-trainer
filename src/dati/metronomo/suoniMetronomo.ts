import { SuonoMetronomo } from "@/tipi/SuonoMetronomo";

export interface SuonoMetronomoDisponibile {
    id: SuonoMetronomo;
    nome: string;
    descrizione: string;
}

export const SUONI_METRONOMO: SuonoMetronomoDisponibile[] = [
    {
        id: "classico",
        nome: "Click classico",
        descrizione: "Click chiaro e bilanciato",
    },
    {
        id: "morbido",
        nome: "Click morbido",
        descrizione: "Suono più delicato e meno invasivo",
    },
    {
        id: "secco",
        nome: "Click secco",
        descrizione: "Click molto corto e preciso",
    },
    {
        id: "legno",
        nome: "Legno",
        descrizione: "Suono simile a due bacchette di legno",
    },
    {
        id: "hihat",
        nome: "Hi-hat",
        descrizione: "Suono metallico e brillante",
    },
    {
        id: "rimshot",
        nome: "Rimshot",
        descrizione: "Suono deciso simile al bordo del rullante",
    },
    {
        id: "clave",
        nome: "Clave",
        descrizione: "Suono percussivo corto e definito",
    },
    {
        id: "cowbell",
        nome: "Cowbell",
        descrizione: "Suono metallico più corposo",
    },
    {
        id: "digitale",
        nome: "Beep digitale",
        descrizione: "Beep elettronico pulito",
    },
    {
        id: "meccanico",
        nome: "Metronomo meccanico",
        descrizione: "Click ispirato a un metronomo tradizionale",
    },
];