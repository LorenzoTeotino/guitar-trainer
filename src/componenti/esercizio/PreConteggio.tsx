interface ProprietaPreConteggio {
    battitoCorrente: number;
    battitiTotali: number;
    bpm: number;
    alTermine: () => void;
}

export default function PreConteggio({
                                         battitoCorrente,
                                         battitiTotali,
                                         bpm,
                                         alTermine,
                                     }: ProprietaPreConteggio) {
    return (
        <section className="schermata-esercizio">
            <div className="barra-esercizio">
                <span>{bpm} BPM</span>
                <span>Preparati</span>
            </div>

            <div className="pre-conteggio">
                <p>Preparati</p>

                <h2>{battitoCorrente}</h2>

                <div className="contatore-battiti">
                    {Array.from(
                        { length: battitiTotali },
                        (_, indice) => {
                            const numeroBattito = indice + 1;

                            return (
                                <span
                                    key={numeroBattito}
                                    className={
                                        numeroBattito === battitoCorrente
                                            ? "battito-attivo"
                                            : ""
                                    }
                                >
                  {numeroBattito}
                </span>
                            );
                        }
                    )}
                </div>
            </div>

            <button
                type="button"
                className="pulsante-termina"
                onClick={alTermine}
            >
                Annulla
            </button>
        </section>
    );
}