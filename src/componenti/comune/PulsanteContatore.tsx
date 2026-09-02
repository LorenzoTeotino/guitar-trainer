interface ProprietaPulsanteContatore {
    valore: number;
    diminuisci: () => void;
    aumenta: () => void;
}

export default function PulsanteContatore({
                                              valore,
                                              diminuisci,
                                              aumenta,
                                          }: ProprietaPulsanteContatore) {
    return (
        <div className="pulsante-contatore">
            <button type="button" onClick={diminuisci}>
                −
            </button>

            <strong>{valore}</strong>

            <button type="button" onClick={aumenta}>
                +
            </button>
        </div>
    );
}