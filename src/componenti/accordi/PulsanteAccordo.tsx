interface ProprietaPulsanteAccordo {
    nome: string;
    selezionato: boolean;
    alClick: () => void;
}

export default function PulsanteAccordo({
                                            nome,
                                            selezionato,
                                            alClick,
                                        }: ProprietaPulsanteAccordo) {
    return (
        <button
            type="button"
            className={`pulsante-accordo ${
                selezionato ? "selezionato" : ""
            }`}
            onClick={alClick}
        >
            {nome}
        </button>
    );
}