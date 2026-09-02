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
    const recuperaNotaPrincipale = (): string => {
        if (lingua === "italiano") {
            return accordo.nomeItaliano
                .replace(" minore", "")
                .replace("7", "")
                .toUpperCase();
        }

        return accordo.nomeInglese
            .replace("m", "")
            .replace("7", "")
            .toUpperCase();
    };

    const recuperaSuffisso = (): string | null => {
        if (accordo.tipo === "minore") {
            return "m";
        }

        if (accordo.tipo === "settima") {
            return "7";
        }

        return null;
    };

    const notaPrincipale = recuperaNotaPrincipale();
    const suffisso = recuperaSuffisso();

    return (
        <div className="visualizzatore-accordo">
            <p>Accordo</p>

            <div className="nome-accordo">
        <span className="nota-principale">
          {notaPrincipale}
        </span>

                {suffisso && (
                    <span className="suffisso-accordo">
            {suffisso}
          </span>
                )}
            </div>
        </div>
    );
}