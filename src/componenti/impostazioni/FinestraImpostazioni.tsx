import { TipoMetronomo } from "@/tipi/TipoMetronomo";
import { SuonoMetronomo } from "@/tipi/SuonoMetronomo";

import { SUONI_METRONOMO } from "@/dati/metronomo/suoniMetronomo";

import {
    preparaMetronomo,
    suonoMetronomo,
} from "@/servizi/metronomo/servizioMetronomo";

interface ProprietaFinestraImpostazioni {
    tipoMetronomo: TipoMetronomo;
    suonoMetronomoSelezionato: SuonoMetronomo;

    alCambioTipoMetronomo: (
        tipo: TipoMetronomo
    ) => void;

    alCambioSuonoMetronomo: (
        suono: SuonoMetronomo
    ) => void;

    allaChiusura: () => void;
}

export default function FinestraImpostazioni({
                                                 tipoMetronomo,
                                                 suonoMetronomoSelezionato,
                                                 alCambioTipoMetronomo,
                                                 alCambioSuonoMetronomo,
                                                 allaChiusura,
                                             }: ProprietaFinestraImpostazioni) {
    const provaSuono = async () => {
        await preparaMetronomo();

        suonoMetronomo(
            true,
            suonoMetronomoSelezionato
        );
    };

    return (
        <div
            className="sfondo-impostazioni"
            onClick={allaChiusura}
        >
            <section
                className="finestra-impostazioni"
                onClick={(evento) =>
                    evento.stopPropagation()
                }
            >
                <div className="intestazione-impostazioni">
                    <div>
                        <h2>Impostazioni</h2>

                        <p>
                            Personalizza il comportamento
                            di Guitar Trainer.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="pulsante-chiudi-impostazioni"
                        onClick={allaChiusura}
                        aria-label="Chiudi impostazioni"
                    >
                        ×
                    </button>
                </div>

                <div className="sezione-impostazioni">
                    <h3>Metronomo</h3>

                    <div className="impostazione">
                        <div className="descrizione-impostazione">
                            <strong>
                                Tipo di metronomo
                            </strong>

                            <span>
                                Scegli la visualizzazione
                                del metronomo.
                            </span>
                        </div>

                        <div className="selettore-tipo-metronomo">
                            <button
                                type="button"
                                className={
                                    tipoMetronomo ===
                                    "digitale"
                                        ? "attivo"
                                        : ""
                                }
                                onClick={() =>
                                    alCambioTipoMetronomo(
                                        "digitale"
                                    )
                                }
                            >
                                Digitale
                            </button>

                            <button
                                type="button"
                                className={
                                    tipoMetronomo ===
                                    "meccanico"
                                        ? "attivo"
                                        : ""
                                }
                                onClick={() =>
                                    alCambioTipoMetronomo(
                                        "meccanico"
                                    )
                                }
                            >
                                Meccanico
                            </button>
                        </div>
                    </div>

                    <div className="impostazione">
                        <div className="descrizione-impostazione">
                            <strong>
                                Suono del click
                            </strong>

                            <span>
                                Scegli il suono utilizzato
                                durante il metronomo.
                            </span>
                        </div>

                        <div className="controllo-suono-metronomo">
                            <select
                                className="selettore-suono-metronomo"
                                value={
                                    suonoMetronomoSelezionato
                                }
                                onChange={(evento) =>
                                    alCambioSuonoMetronomo(
                                        evento.target
                                            .value as SuonoMetronomo
                                    )
                                }
                            >
                                {SUONI_METRONOMO.map(
                                    (suono) => (
                                        <option
                                            key={suono.id}
                                            value={suono.id}
                                        >
                                            {suono.nome}
                                        </option>
                                    )
                                )}
                            </select>

                            <button
                                type="button"
                                className="pulsante-prova-suono"
                                onClick={provaSuono}
                            >
                                Prova
                            </button>
                        </div>

                        <p className="descrizione-suono">
                            {
                                SUONI_METRONOMO.find(
                                    (suono) =>
                                        suono.id ===
                                        suonoMetronomoSelezionato
                                )?.descrizione
                            }
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="pulsante-salva-impostazioni"
                    onClick={allaChiusura}
                >
                    Chiudi
                </button>
            </section>
        </div>
    );
}