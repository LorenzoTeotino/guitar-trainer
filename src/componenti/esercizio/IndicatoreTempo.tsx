interface ProprietaIndicatoreTempo {
    posizionePallinoCorrente: number;
    palliniTotali: number;
}

export default function IndicatoreTempo({
                                            posizionePallinoCorrente,
                                            palliniTotali,
                                        }: ProprietaIndicatoreTempo) {
    return (
        <div className="indicatore-tempo">
            {Array.from(
                { length: palliniTotali },
                (_, indice) => {
                    const numeroPallino = indice + 1;

                    return (
                        <span
                            key={numeroPallino}
                            className={
                                numeroPallino === posizionePallinoCorrente
                                    ? "pallino-attivo"
                                    : ""
                            }
                        >
              {numeroPallino}
            </span>
                    );
                }
            )}
        </div>
    );
}