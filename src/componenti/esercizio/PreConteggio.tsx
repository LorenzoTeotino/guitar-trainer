interface ProprietaPreConteggio {
    contoAllaRovescia: number;
    alTermine: () => void;
}

export default function PreConteggio({
                                         contoAllaRovescia,
                                         alTermine,
                                     }: ProprietaPreConteggio) {
    const testoConteggio =
        contoAllaRovescia > 0
            ? contoAllaRovescia
            : "VIA";

    return (
        <section className="schermata-esercizio">
            <div className="pre-conteggio-semplice">
                <div className="numero-pre-conteggio">
                    {testoConteggio}
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