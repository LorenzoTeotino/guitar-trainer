export type TipoAccordo = "maggiore" | "minore" | "settima";

export interface Accordo {
    id: string;
    nomeItaliano: string;
    nomeInglese: string;
    tipo: TipoAccordo;
}