"use client";

import {
    useEffect,
    useState,
} from "react";

import { ImpostazioniApplicazione } from "@/tipi/ImpostazioniApplicazione";
import { TipoMetronomo } from "@/tipi/TipoMetronomo";
import { SuonoMetronomo } from "@/tipi/SuonoMetronomo";

const CHIAVE_IMPOSTAZIONI =
    "guitar-trainer-impostazioni";

const IMPOSTAZIONI_PREDEFINITE: ImpostazioniApplicazione = {
    tipoMetronomo: "digitale",
    suonoMetronomo: "classico",
};

export function useImpostazioniApplicazione() {
    const [
        impostazioni,
        setImpostazioni,
    ] = useState<ImpostazioniApplicazione>(
        IMPOSTAZIONI_PREDEFINITE
    );

    const [
        impostazioniCaricate,
        setImpostazioniCaricate,
    ] = useState(false);

    useEffect(() => {
        const impostazioniSalvate =
            window.localStorage.getItem(
                CHIAVE_IMPOSTAZIONI
            );

        if (impostazioniSalvate) {
            try {
                const valoriSalvati =
                    JSON.parse(
                        impostazioniSalvate
                    ) as Partial<ImpostazioniApplicazione>;

                setImpostazioni({
                    ...IMPOSTAZIONI_PREDEFINITE,
                    ...valoriSalvati,
                });
            } catch {
                setImpostazioni(
                    IMPOSTAZIONI_PREDEFINITE
                );
            }
        }

        setImpostazioniCaricate(true);
    }, []);

    useEffect(() => {
        if (!impostazioniCaricate) {
            return;
        }

        window.localStorage.setItem(
            CHIAVE_IMPOSTAZIONI,
            JSON.stringify(impostazioni)
        );
    }, [
        impostazioni,
        impostazioniCaricate,
    ]);

    const cambiaTipoMetronomo = (
        tipoMetronomo: TipoMetronomo
    ) => {
        setImpostazioni(
            (impostazioniPrecedenti) => ({
                ...impostazioniPrecedenti,
                tipoMetronomo,
            })
        );
    };

    const cambiaSuonoMetronomo = (
        suonoMetronomo: SuonoMetronomo
    ) => {
        setImpostazioni(
            (impostazioniPrecedenti) => ({
                ...impostazioniPrecedenti,
                suonoMetronomo,
            })
        );
    };

    return {
        impostazioni,
        cambiaTipoMetronomo,
        cambiaSuonoMetronomo,
    };
}