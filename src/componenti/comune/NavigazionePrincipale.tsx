import { SezioneApplicazione } from "@/tipi/SezioneApplicazione";

interface ProprietaNavigazionePrincipale {
    sezioneAttiva: SezioneApplicazione;
    alCambioSezione: (sezione: SezioneApplicazione) => void;
}

export default function NavigazionePrincipale({
                                                  sezioneAttiva,
                                                  alCambioSezione,
                                              }: ProprietaNavigazionePrincipale) {
    return (
        <nav className="navigazione-principale">
            <button
                type="button"
                className={
                    sezioneAttiva === "esercizio"
                        ? "attivo"
                        : ""
                }
                onClick={() => alCambioSezione("esercizio")}
            >
                Esercizio accordi
            </button>

            <button
                type="button"
                className={
                    sezioneAttiva === "metronomo"
                        ? "attivo"
                        : ""
                }
                onClick={() => alCambioSezione("metronomo")}
            >
                Metronomo
            </button>
        </nav>
    );
}