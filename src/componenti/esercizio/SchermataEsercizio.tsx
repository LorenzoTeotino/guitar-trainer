import { Accordo } from "@/tipi/Accordo";
import { LinguaAccordi } from "@/tipi/LinguaAccordi";
import VisualizzatoreAccordo from "@/componenti/esercizio/VisualizzatoreAccordo";
import ContatoreBattiti from "@/componenti/esercizio/ContatoreBattiti";

interface ProprietaSchermataEsercizio {
    accordoCorrente: Accordo;
    lingua: LinguaAccordi;
    battitoCorrente: number;
    battitiPerAccordo: number;
    bpm: number;
    alTermine: () => void;
}

export default function SchermataEsercizio({
                                               accordoCorrente,
                                               lingua,
                                               battitoCorrente,
                                               battitiPerAccordo,
                                               bpm,
                                               alTermine,
                                           }: ProprietaSchermataEsercizio) {
    return (
        <section className="schermata-esercizio">
            <div className="barra-esercizio">
                <span>{bpm} BPM</span>

                <span>
          {battitiPerAccordo} battiti
        </span>
            </div>

            <VisualizzatoreAccordo
                accordo={accordoCorrente}
                lingua={lingua}
            />

            <ContatoreBattiti
                battitoCorrente={battitoCorrente}
                battitiTotali={battitiPerAccordo}
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