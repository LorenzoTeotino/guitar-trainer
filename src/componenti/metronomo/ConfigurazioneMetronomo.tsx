import ConfigurazioneEsercizio from "@/componenti/esercizio/ConfigurazioneEsercizio";
import { TempoMusicale } from "@/tipi/TempoMusicale";

interface ProprietaConfigurazioneMetronomo {
    bpm: number;
    tempoMusicale: TempoMusicale;

    diminuisciBpm: () => void;
    aumentaBpm: () => void;
    alCambioBpm: (bpm: number) => void;

    alCambioTempoMusicale: (
        tempo: TempoMusicale
    ) => void;

    alAvvio: () => void;
}

export default function ConfigurazioneMetronomo({
                                                    bpm,
                                                    tempoMusicale,
                                                    diminuisciBpm,
                                                    aumentaBpm,
                                                    alCambioBpm,
                                                    alCambioTempoMusicale,
                                                    alAvvio,
                                                }: ProprietaConfigurazioneMetronomo) {
    return (
        <>
            <div className="intestazione-sezione-metronomo">
                <h2>Metronomo</h2>

                <p>
                    Imposta velocità e tempo musicale e inizia a suonare.
                </p>
            </div>

            <ConfigurazioneEsercizio
                bpm={bpm}
                tempoMusicale={tempoMusicale}
                diminuisciBpm={diminuisciBpm}
                aumentaBpm={aumentaBpm}
                alCambioBpm={alCambioBpm}
                alCambioTempoMusicale={alCambioTempoMusicale}
            />

            <button
                type="button"
                className="pulsante-avvia"
                onClick={alAvvio}
            >
                Avvia metronomo
            </button>
        </>
    );
}