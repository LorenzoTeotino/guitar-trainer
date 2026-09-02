import { Accordo } from "@/tipi/Accordo";
import { LinguaAccordi } from "@/tipi/LinguaAccordi";

interface ProprietaVisualizzatoreAccordo {
    accordo: Accordo;
    lingua: LinguaAccordi;
}

export default function VisualizzatoreAccordo({
                                                  accordo,
                                                  lingua,
                                              }: ProprietaVisualizzatoreAccordo) {
    const nome =
        lingua === "italiano"
            ? accordo.nomeItaliano
            : accordo.nomeInglese;

    return (
        <div className="visualizzatore-accordo">
            <p>Accordo</p>
            <h2>{nome}</h2>
        </div>
    );
}