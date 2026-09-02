interface ProprietaPreConteggio {
    battitoCorrente: number;
    alTermine: () => void;
}

export default function PreConteggio({
                                         battitoCorrente,
                                         alTermine,
                                     }: ProprietaPreConteggio) {

    const testoConteggio =
        battitoCorrente > 0
            ? battitoCorrente
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