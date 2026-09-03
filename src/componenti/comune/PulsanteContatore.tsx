interface ProprietaPulsanteContatore {
    valore: number;
    valoreMinimo: number;
    valoreMassimo: number;
    diminuisci: () => void;
    aumenta: () => void;
    alCambioValore: (valore: number) => void;
}

export default function PulsanteContatore({
                                              valore,
                                              valoreMinimo,
                                              valoreMassimo,
                                              diminuisci,
                                              aumenta,
                                              alCambioValore,
                                          }: ProprietaPulsanteContatore) {
    return (
        <div className="controllo-bpm">
            <div className="pulsante-contatore">
                <button
                    type="button"
                    onClick={diminuisci}
                    disabled={valore <= valoreMinimo}
                >
                    -
                </button>

                <strong>{valore}</strong>

                <button
                    type="button"
                    onClick={aumenta}
                    disabled={valore >= valoreMassimo}
                >
                    +
                </button>
            </div>

            <input
                type="range"
                className="slider-bpm"
                min={valoreMinimo}
                max={valoreMassimo}
                step={1}
                value={valore}
                onChange={(evento) =>
                    alCambioValore(Number(evento.target.value))
                }
            />
        </div>
    );
}