import ConfigurazioneEsercizio from "@/componenti/esercizio/ConfigurazioneEsercizio";
import IndicatoreTempo from "@/componenti/esercizio/IndicatoreTempo";
import MetronomoMeccanico from "@/componenti/metronomo/MetronomoMeccanico";

import { TempoMusicale } from "@/tipi/TempoMusicale";
import { TipoMetronomo } from "@/tipi/TipoMetronomo";

interface ProprietaConfigurazioneMetronomo {
    bpm: number;
    tempoMusicale: TempoMusicale;
    tipoMetronomo: TipoMetronomo;

    metronomoAvviato: boolean;

    posizionePallinoCorrente: number;

    diminuisciBpm: () => void;
    aumentaBpm: () => void;

    alCambioBpm: (bpm: number) => void;

    alCambioTempoMusicale: (
        tempo: TempoMusicale
    ) => void;

    alAvvio: () => void;
    alTermine: () => void;
}

export default function ConfigurazioneMetronomo({
                                                    bpm,
                                                    tempoMusicale,
                                                    tipoMetronomo,
                                                    metronomoAvviato,
                                                    posizionePallinoCorrente,
                                                    diminuisciBpm,
                                                    aumentaBpm,
                                                    alCambioBpm,
                                                    alCambioTempoMusicale,
                                                    alAvvio,
                                                    alTermine,
                                                }: ProprietaConfigurazioneMetronomo) {
    return (
        <>
            <div className="intestazione-sezione-metronomo">
                <h2>Metronomo</h2>

                <p>
                    Imposta velocità e tempo musicale
                    e inizia a suonare.
                </p>
            </div>

            <ConfigurazioneEsercizio
                bpm={bpm}
                tempoMusicale={tempoMusicale}
                diminuisciBpm={diminuisciBpm}
                aumentaBpm={aumentaBpm}
                alCambioBpm={alCambioBpm}
                alCambioTempoMusicale={
                    alCambioTempoMusicale
                }
            />

            <section className="visualizzazione-metronomo">
                {tipoMetronomo === "digitale" ? (
                    <IndicatoreTempo
                        posizionePallinoCorrente={
                            metronomoAvviato
                                ? posizionePallinoCorrente
                                : 0
                        }
                        palliniTotali={
                            tempoMusicale
                                .suddivisioniPerBattuta
                        }
                    />
                ) : (
                    <MetronomoMeccanico
                        bpm={bpm}
                        metronomoAvviato={
                            metronomoAvviato
                        }
                    />
                )}
            </section>

            <button
                type="button"
                className={
                    metronomoAvviato
                        ? "pulsante-termina-metronomo"
                        : "pulsante-avvia"
                }
                onClick={
                    metronomoAvviato
                        ? alTermine
                        : alAvvio
                }
            >
                {metronomoAvviato
                    ? "Ferma metronomo"
                    : "Avvia metronomo"}
            </button>
        </>
    );
}