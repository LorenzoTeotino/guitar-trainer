import { Accordo } from "@/tipi/Accordo";
import { LinguaAccordi } from "@/tipi/LinguaAccordi";

interface ProprietaPulsanteAccordo {
    accordo: Accordo;
    lingua: LinguaAccordi;
    selezionato: boolean;
    alClick: () => void;
}

export default function PulsanteAccordo({
                                            accordo,
                                            lingua,
                                            selezionato,
                                            alClick,
                                        }: ProprietaPulsanteAccordo) {
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
        <button
            type="button"
            className={`pulsante-accordo ${
                selezionato ? "selezionato" : ""
            }`}
            onClick={alClick}
        >
      <span className="nota-pulsante">
        {notaPrincipale}
      </span>

            {suffisso && (
                <span className="suffisso-pulsante">
          {suffisso}
        </span>
            )}
        </button>
    );
}