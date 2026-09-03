"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { TempoMusicale } from "@/tipi/TempoMusicale";
import { SuonoMetronomo } from "@/tipi/SuonoMetronomo";

import {
    calcolaIntervalloMetronomo,
    preparaMetronomo,
    suonoMetronomo,
} from "@/servizi/metronomo/servizioMetronomo";

export type PosizionePendolo =
    | "centro"
    | "sinistra"
    | "destra";

interface ProprietaUseMetronomo {
    bpm: number;
    tempoMusicale: TempoMusicale;
    suonoMetronomoSelezionato: SuonoMetronomo;
}

export function useMetronomo({
                                 bpm,
                                 tempoMusicale,
                                 suonoMetronomoSelezionato,
                             }: ProprietaUseMetronomo) {
    const [
        metronomoAvviato,
        setMetronomoAvviato,
    ] = useState(false);

    const [
        posizionePallinoCorrente,
        setPosizionePallinoCorrente,
    ] = useState(1);

    const [
        posizionePendolo,
        setPosizionePendolo,
    ] = useState<PosizionePendolo>("centro");

    const latoSuccessivo =
        useRef<"sinistra" | "destra">("destra");

    const riferimentoIntervallo =
        useRef<number | null>(null);

    const riferimentoPrimoMovimento =
        useRef<number | null>(null);

    const avviaMetronomo =
        useCallback(async () => {
            await preparaMetronomo();

            setPosizionePallinoCorrente(1);
            setPosizionePendolo("centro");

            latoSuccessivo.current =
                "destra";

            setMetronomoAvviato(true);
        }, []);

    const fermaMetronomo =
        useCallback(() => {
            setMetronomoAvviato(false);
            setPosizionePallinoCorrente(1);
            setPosizionePendolo("centro");

            latoSuccessivo.current =
                "destra";
        }, []);

    useEffect(() => {
        if (!metronomoAvviato) {
            return;
        }

        const intervalloMetronomo =
            calcolaIntervalloMetronomo(bpm);

        /*
         * Il pendolo parte dal centro.
         *
         * Per arrivare alla prima estremità
         * gli facciamo percorrere metà intervallo.
         */
        const primoMovimento =
            window.setTimeout(() => {
                setPosizionePendolo(
                    latoSuccessivo.current
                );

                latoSuccessivo.current =
                    latoSuccessivo.current === "destra"
                        ? "sinistra"
                        : "destra";

                suonoMetronomo(
                    true,
                    suonoMetronomoSelezionato
                );

                const intervallo =
                    window.setInterval(() => {
                        setPosizionePendolo(
                            latoSuccessivo.current
                        );

                        latoSuccessivo.current =
                            latoSuccessivo.current === "destra"
                                ? "sinistra"
                                : "destra";

                        setPosizionePallinoCorrente(
                            (posizionePrecedente) => {
                                const palliniTotali =
                                    tempoMusicale
                                        .suddivisioniPerBattuta;

                                const nuovaPosizione =
                                    posizionePrecedente >=
                                    palliniTotali
                                        ? 1
                                        : posizionePrecedente + 1;

                                const accentato =
                                    tempoMusicale.accenti.includes(
                                        nuovaPosizione
                                    );

                                suonoMetronomo(
                                    accentato,
                                    suonoMetronomoSelezionato
                                );

                                return nuovaPosizione;
                            }
                        );
                    }, intervalloMetronomo);

                riferimentoIntervallo.current =
                    intervallo;
            }, intervalloMetronomo / 2);

        riferimentoPrimoMovimento.current =
            primoMovimento;

        return () => {
            window.clearTimeout(
                primoMovimento
            );

            if (
                riferimentoIntervallo.current !== null
            ) {
                window.clearInterval(
                    riferimentoIntervallo.current
                );
            }

            riferimentoIntervallo.current =
                null;
        };
    }, [
        metronomoAvviato,
        bpm,
        tempoMusicale,
        suonoMetronomoSelezionato,
    ]);

    return {
        metronomoAvviato,
        posizionePallinoCorrente,
        posizionePendolo,
        avviaMetronomo,
        fermaMetronomo,
    };
}