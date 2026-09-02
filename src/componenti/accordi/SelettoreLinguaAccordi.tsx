import { LinguaAccordi } from "@/tipi/LinguaAccordi";

interface ProprietaSelettoreLinguaAccordi {
    lingua: LinguaAccordi;
    alCambioLingua: (lingua: LinguaAccordi) => void;
}

export default function SelettoreLinguaAccordi({
                                                   lingua,
                                                   alCambioLingua,
                                               }: ProprietaSelettoreLinguaAccordi) {
    return (
        <div className="selettore-lingua">
            <button
                type="button"
                className={lingua === "italiano" ? "attivo" : ""}
                onClick={() => alCambioLingua("italiano")}
            >
                Italiano
            </button>

            <button
                type="button"
                className={lingua === "inglese" ? "attivo" : ""}
                onClick={() => alCambioLingua("inglese")}
            >
                Inglese
            </button>
        </div>
    );
}