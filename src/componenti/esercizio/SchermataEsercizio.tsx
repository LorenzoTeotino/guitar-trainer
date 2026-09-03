import { Accordo } from "@/tipi/Accordo";
import { LinguaAccordi } from "@/tipi/LinguaAccordi";
import { TempoMusicale } from "@/tipi/TempoMusicale";

import VisualizzatoreAccordo from "@/componenti/esercizio/VisualizzatoreAccordo";
import IndicatoreTempo from "@/componenti/esercizio/IndicatoreTempo";

interface ProprietaSchermataEsercizio {
    accordoCorrente: Accordo | null;
    lingua: LinguaAccordi;
    posizionePallinoCorrente: number;
    palliniTotali: number;
    tempoMusicale: TempoMusicale;
    bpm: number;
    alTermine: () => void;
}

export default function SchermataEsercizio({
                                               accordoCorrente,
                                               lingua,
                                               posizionePallinoCorrente,
                                               palliniTotali,
                                               tempoMusicale,
                                               bpm,
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

            <IndicatoreTempo
                posizionePallinoCorrente={
                    posizionePallinoCorrente
                }
                palliniTotali={
                    palliniTotali
                }
            />

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