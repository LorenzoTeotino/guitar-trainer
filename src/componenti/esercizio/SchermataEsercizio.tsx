import { Accordo } from "@/tipi/Accordo";
import { LinguaAccordi } from "@/tipi/LinguaAccordi";

import VisualizzatoreAccordo from "@/componenti/esercizio/VisualizzatoreAccordo";
import IndicatoreTempo from "@/componenti/esercizio/IndicatoreTempo";

interface ProprietaSchermataEsercizio {
    accordoCorrente: Accordo;
    lingua: LinguaAccordi;
    posizionePallinoCorrente: number;
    palliniTotali: number;
    bpm: number;
    alTermine: () => void;
}

export default function SchermataEsercizio({
                                               accordoCorrente,
                                               lingua,
                                               posizionePallinoCorrente,
                                               palliniTotali,
                                               bpm,
                                               alTermine,
                                           }: ProprietaSchermataEsercizio) {
    return (
        <section className="schermata-esercizio">
            <div className="barra-esercizio">
                <span>{bpm} BPM</span>
            </div>

            <VisualizzatoreAccordo
                accordo={accordoCorrente}
                lingua={lingua}
            />

            <IndicatoreTempo
                posizionePallinoCorrente={posizionePallinoCorrente}
                palliniTotali={palliniTotali}
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