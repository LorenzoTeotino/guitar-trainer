import { SezioneApplicazione } from "@/tipi/SezioneApplicazione";

interface ProprietaNavigazionePrincipale {
    sezioneAttiva: SezioneApplicazione;

    alCambioSezione: (
        sezione: SezioneApplicazione
    ) => void;

    alAperturaImpostazioni: () => void;
}

export default function NavigazionePrincipale({
                                                  sezioneAttiva,
                                                  alCambioSezione,
                                                  alAperturaImpostazioni,
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
                onClick={() =>
                    alCambioSezione("esercizio")
                }
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
                onClick={() =>
                    alCambioSezione("metronomo")
                }
            >
                Metronomo
            </button>

            <button
                type="button"
                className="pulsante-impostazioni"
                onClick={alAperturaImpostazioni}
                aria-label="Apri impostazioni"
                title="Impostazioni"
            >
                ⚙
            </button>
        </nav>
    );
}