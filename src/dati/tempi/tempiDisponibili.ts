import { TempoMusicale } from "@/tipi/TempoMusicale";

export const TEMPO_DUE_QUARTI: TempoMusicale = {
    id: "2/4",
    nome: "2/4",
    numeratore: 2,
    denominatore: 4,
    suddivisioniPerBattuta: 2,
    accenti: [1],
};

export const TEMPO_TRE_QUARTI: TempoMusicale = {
    id: "3/4",
    nome: "3/4",
    numeratore: 3,
    denominatore: 4,
    suddivisioniPerBattuta: 3,
    accenti: [1],
};

export const TEMPO_QUATTRO_QUARTI: TempoMusicale = {
    id: "4/4",
    nome: "4/4",
    numeratore: 4,
    denominatore: 4,
    suddivisioniPerBattuta: 4,
    accenti: [1],
};

export const TEMPO_CINQUE_QUARTI: TempoMusicale = {
    id: "5/4",
    nome: "5/4",
    numeratore: 5,
    denominatore: 4,
    suddivisioniPerBattuta: 5,
    accenti: [1],
};

export const TEMPO_SEI_OTTAVI: TempoMusicale = {
    id: "6/8",
    nome: "6/8",
    numeratore: 6,
    denominatore: 8,
    suddivisioniPerBattuta: 6,
    accenti: [1, 4],
};

export const TEMPO_SETTE_OTTAVI: TempoMusicale = {
    id: "7/8",
    nome: "7/8",
    numeratore: 7,
    denominatore: 8,
    suddivisioniPerBattuta: 7,
    accenti: [1],
};

export const TEMPO_NOVE_OTTAVI: TempoMusicale = {
    id: "9/8",
    nome: "9/8",
    numeratore: 9,
    denominatore: 8,
    suddivisioniPerBattuta: 9,
    accenti: [1, 4, 7],
};

export const TEMPO_DODICI_OTTAVI: TempoMusicale = {
    id: "12/8",
    nome: "12/8",
    numeratore: 12,
    denominatore: 8,
    suddivisioniPerBattuta: 12,
    accenti: [1, 4, 7, 10],
};

export const TEMPI_DISPONIBILI: TempoMusicale[] = [
    TEMPO_DUE_QUARTI,
    TEMPO_TRE_QUARTI,
    TEMPO_QUATTRO_QUARTI,
    TEMPO_CINQUE_QUARTI,
    TEMPO_SEI_OTTAVI,
    TEMPO_SETTE_OTTAVI,
    TEMPO_NOVE_OTTAVI,
    TEMPO_DODICI_OTTAVI,
];