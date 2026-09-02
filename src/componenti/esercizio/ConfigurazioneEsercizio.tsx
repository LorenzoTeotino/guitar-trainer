import PulsanteContatore from "@/componenti/comune/PulsanteContatore";
import {
    BATTITI_MASSIMI,
    BATTITI_MINIMI,
    BPM_MASSIMI,
    BPM_MINIMI,
    VARIAZIONE_BPM,
} from "@/costanti/configurazioneEsercizio";

interface ProprietaConfigurazioneEsercizio {
    bpm: number;
    battitiPerAccordo: number;
    alCambioBpm: (bpm: number) => void;
    alCambioBattiti: (battiti: number) => void;
}

export default function ConfigurazioneEsercizio({
                                                    bpm,
                                                    battitiPerAccordo,
                                                    alCambioBpm,
                                                    alCambioBattiti,
                                                }: ProprietaConfigurazioneEsercizio) {
    return (
        <div className="configurazione-esercizio">
            <div>
                <h3>BPM</h3>

                <PulsanteContatore
                    valore={bpm}
                    diminuisci={() =>
                        alCambioBpm(
                            Math.max(BPM_MINIMI, bpm - VARIAZIONE_BPM)
                        )
                    }
                    aumenta={() =>
                        alCambioBpm(
                            Math.min(BPM_MASSIMI, bpm + VARIAZIONE_BPM)
                        )
                    }
                />
            </div>

            <div>
                <h3>Battiti per accordo</h3>

                <PulsanteContatore
                    valore={battitiPerAccordo}
                    diminuisci={() =>
                        alCambioBattiti(
                            Math.max(BATTITI_MINIMI, battitiPerAccordo - 1)
                        )
                    }
                    aumenta={() =>
                        alCambioBattiti(
                            Math.min(BATTITI_MASSIMI, battitiPerAccordo + 1)
                        )
                    }
                />
            </div>
        </div>
    );
}