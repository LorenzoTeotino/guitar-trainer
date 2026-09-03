import PulsanteContatore from "@/componenti/comune/PulsanteContatore";
import { TempoMusicale } from "@/tipi/TempoMusicale";
import { TEMPI_DISPONIBILI } from "@/dati/tempi/tempiDisponibili";

interface ProprietaConfigurazioneEsercizio {
    bpm: number;
    tempoMusicale: TempoMusicale;
    diminuisciBpm: () => void;
    aumentaBpm: () => void;
    alCambioTempoMusicale: (tempo: TempoMusicale) => void;
}

export default function ConfigurazioneEsercizio({
                                                    bpm,
                                                    tempoMusicale,
                                                    diminuisciBpm,
                                                    aumentaBpm,
                                                    alCambioTempoMusicale,
                                                }: ProprietaConfigurazioneEsercizio) {
    const cambiaTempoMusicale = (
        evento: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const nuovoTempo = TEMPI_DISPONIBILI.find(
            (tempo) => tempo.id === evento.target.value
        );

        if (nuovoTempo) {
            alCambioTempoMusicale(nuovoTempo);
        }
    };

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

                    <select
                        className="selettore-tempo"
                        value={tempoMusicale.id}
                        onChange={cambiaTempoMusicale}
                    >
                        {TEMPI_DISPONIBILI.map((tempo) => (
                            <option
                                key={tempo.id}
                                value={tempo.id}
                            >
                                {tempo.nome}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </section>
    );
}