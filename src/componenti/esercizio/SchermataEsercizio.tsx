import { Accordo } from "@/tipi/Accordo";
import { LinguaAccordi } from "@/tipi/LinguaAccordi";
import { TempoMusicale } from "@/tipi/TempoMusicale";
import { TipoMetronomo } from "@/tipi/TipoMetronomo";

import VisualizzatoreAccordo from "@/componenti/esercizio/VisualizzatoreAccordo";
import IndicatoreTempo from "@/componenti/esercizio/IndicatoreTempo";
import MetronomoMeccanico from "@/componenti/metronomo/MetronomoMeccanico";

interface ProprietaSchermataEsercizio {
    accordoCorrente: Accordo | null;
    lingua: LinguaAccordi;

    posizionePallinoCorrente: number;
    palliniTotali: number;

    tempoMusicale: TempoMusicale;
    bpm: number;

    tipoMetronomo: TipoMetronomo;

    esercizioAvviato: boolean;
    istanteAvvioMetronomo: number | null;

    alTermine: () => void;
}

export default function SchermataEsercizio({
                                               accordoCorrente,
                                               lingua,
                                               posizionePallinoCorrente,
                                               palliniTotali,
                                               tempoMusicale,
                                               bpm,
                                               tipoMetronomo,
                                               esercizioAvviato,
                                               istanteAvvioMetronomo,
                                               alTermine,
                                           }: ProprietaSchermataEsercizio) {
    return (
        <section className="schermata-esercizio">
            <div className="barra-esercizio">
                <span>{bpm} BPM</span>

                <span>
                    {tempoMusicale.nome}
                </span>
            </div>

            {accordoCorrente && (
                <VisualizzatoreAccordo
                    accordo={accordoCorrente}
                    lingua={lingua}
                />
            )}

            {tipoMetronomo === "digitale" ? (
                <IndicatoreTempo
                    posizionePallinoCorrente={
                        posizionePallinoCorrente
                    }
                    palliniTotali={
                        palliniTotali
                    }
                />
            ) : (
                <MetronomoMeccanico
                    bpm={bpm}
                    metronomoAvviato={
                        esercizioAvviato
                    }
                    istanteAvvioMetronomo={
                        istanteAvvioMetronomo
                    }
                />
            )}

            <button
                type="button"
                className="pulsante-termina"
                onClick={alTermine}
            >
                Termina esercizio
            </button>
        </section>
    );
}