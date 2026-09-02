interface ProprietaContatoreBattiti {
    battitoCorrente: number;
    battitiTotali: number;
}

export default function ContatoreBattiti({
                                             battitoCorrente,
                                             battitiTotali,
                                         }: ProprietaContatoreBattiti) {
    return (
        <div className="contatore-battiti">
            {Array.from({ length: battitiTotali }, (_, indice) => {
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
            })}
        </div>
    );
}