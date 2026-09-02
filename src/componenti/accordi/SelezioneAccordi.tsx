import { accordiDisponibili } from "@/dati/accordi/accordiDisponibili";
import { LinguaAccordi } from "@/tipi/LinguaAccordi";
import PulsanteAccordo from "./PulsanteAccordo";

interface ProprietaSelezioneAccordi {
    lingua: LinguaAccordi;
    accordiSelezionati: string[];
    alCambioSelezione: (idAccordo: string) => void;
}

export default function SelezioneAccordi({
                                             lingua,
                                             accordiSelezionati,
                                             alCambioSelezione,
                                         }: ProprietaSelezioneAccordi) {
    return (
        <div className="selezione-accordi">
            {accordiDisponibili.map((accordo) => (
                <PulsanteAccordo
                    key={accordo.id}
                    accordo={accordo}
                    lingua={lingua}
                    selezionato={accordiSelezionati.includes(accordo.id)}
                    alClick={() => alCambioSelezione(accordo.id)}
                />
            ))}
        </div>
    );
}