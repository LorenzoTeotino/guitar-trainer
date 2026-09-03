export type IdentificativoTempoMusicale =
    | "4/4"
    | "3/4"
    | "6/8";

export interface TempoMusicale {
    id: IdentificativoTempoMusicale;
    nome: string;
    numeratore: number;
    denominatore: number;

    /*
     * Numero di suddivisioni visualizzate
     * all'interno della battuta.
     *
     * 4/4 -> 4 quarti
     * 3/4 -> 3 quarti
     * 6/8 -> 6 ottavi
     */
    suddivisioniPerBattuta: number;

    /*
     * Posizioni che devono ricevere
     * un accento dal metronomo.
     */
    accenti: number[];
}