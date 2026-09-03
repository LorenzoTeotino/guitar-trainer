import PulsanteContatore from "@/componenti/comune/PulsanteContatore";
import { TempoMusicale } from "@/tipi/TempoMusicale";
import { TEMPI_DISPONIBILI } from "@/dati/tempi/tempiDisponibili";

interface ProprietaConfigurazioneEsercizio {
    bpm: number;
    tempoMusicale: TempoMusicale;

    diminuisciBpm: () => void;
    aumentaBpm: () => void;

    alCambioTempoMusicale: (
        tempoMusicale: TempoMusicale
    ) => void;
}

export default function ConfigurazioneEsercizio({
                                                    bpm,
                                                    tempoMusicale,
                                                    diminuisciBpm,
                                                    aumentaBpm,
                                                    alCambioTempoMusicale,
                                                }: ProprietaConfigurazioneEsercizio) {
    return (
        <section className="pannello">
            <div className="configurazione-esercizio">
                <div>
                    <h3>BPM</h3>

                    <PulsanteContatore
                        valore={bpm}
                        diminuisci={diminuisciBpm}
                        aumenta={aumentaBpm}
                    />
                </div>

                <div>
                    <h3>Tempo</h3>

                    <div className="selettore-tempo">
                        {TEMPI_DISPONIBILI.map((tempo) => (
                            <button
                                key={tempo.id}
                                type="button"
                                className={
                                    tempoMusicale.id === tempo.id
                                        ? "tempo-attivo"
                                        : ""
                                }
                                onClick={() =>
                                    alCambioTempoMusicale(tempo)
                                }
                            >
                                {tempo.nome}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}