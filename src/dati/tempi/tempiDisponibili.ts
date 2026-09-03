import { TempoMusicale } from "@/tipi/TempoMusicale";

export const TEMPO_QUATTRO_QUARTI: TempoMusicale = {
    id: "4/4",
    nome: "4/4",
    numeratore: 4,
    denominatore: 4,
    suddivisioniPerBattuta: 4,
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

export const TEMPO_SEI_OTTAVI: TempoMusicale = {
    id: "6/8",
    nome: "6/8",
    numeratore: 6,
    denominatore: 8,
    suddivisioniPerBattuta: 6,
    accenti: [1, 4],
};

export const TEMPI_DISPONIBILI: TempoMusicale[] = [
    TEMPO_QUATTRO_QUARTI,
    TEMPO_TRE_QUARTI,
    TEMPO_SEI_OTTAVI,
];