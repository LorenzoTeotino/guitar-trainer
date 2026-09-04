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
        istanteAvvioMetronomo,
        setIstanteAvvioMetronomo,
    ] = useState<number | null>(null);

    const riferimentoTimer =
        useRef<number | null>(null);

    const avviaMetronomo =
        useCallback(async () => {
            await preparaMetronomo();

            setPosizionePallinoCorrente(1);

            /*
             * Questo momento viene condiviso
             * sia dall'audio sia dal pendolo.
             */
            const istanteAvvio =
                performance.now();

            setIstanteAvvioMetronomo(
                istanteAvvio
            );

            setMetronomoAvviato(true);
        }, []);

    const fermaMetronomo =
        useCallback(() => {
            if (
                riferimentoTimer.current !== null
            ) {
                window.clearTimeout(
                    riferimentoTimer.current
                );

                riferimentoTimer.current =
                    null;
            }

            setMetronomoAvviato(false);
            setPosizionePallinoCorrente(1);
            setIstanteAvvioMetronomo(null);
        }, []);

    useEffect(() => {
        if (
            !metronomoAvviato ||
            istanteAvvioMetronomo === null
        ) {
            return;
        }

        const intervalloMetronomo =
            calcolaIntervalloMetronomo(bpm);

        /*
         * Con il movimento sinusoidale:
         *
         * centro -> estremità = metà intervallo
         *
         * Poi:
         * estremità -> estremità = intervallo completo.
         */
        const primoClick =
            istanteAvvioMetronomo +
            intervalloMetronomo / 2;

        let numeroClick = 0;
        let posizioneCorrente = 1;

        const programmaClick = () => {
            const istanteClick =
                primoClick +
                numeroClick *
                intervalloMetronomo;

            const attesa =
                Math.max(
                    0,
                    istanteClick -
                    performance.now()
                );

            riferimentoTimer.current =
                window.setTimeout(() => {
                    const accentato =
                        tempoMusicale.accenti.includes(
                            posizioneCorrente
                        );

                    suonoMetronomo(
                        accentato,
                        suonoMetronomoSelezionato
                    );

                    setPosizionePallinoCorrente(
                        posizioneCorrente
                    );

                    posizioneCorrente =
                        posizioneCorrente >=
                        tempoMusicale
                            .suddivisioniPerBattuta
                            ? 1
                            : posizioneCorrente + 1;

                    numeroClick += 1;

                    programmaClick();
                }, attesa);
        };

        programmaClick();

        return () => {
            if (
                riferimentoTimer.current !== null
            ) {
                window.clearTimeout(
                    riferimentoTimer.current
                );

                riferimentoTimer.current =
                    null;
            }
        };
    }, [
        metronomoAvviato,
        istanteAvvioMetronomo,
        bpm,
        tempoMusicale,
        suonoMetronomoSelezionato,
    ]);

    return {
        metronomoAvviato,
        posizionePallinoCorrente,
        istanteAvvioMetronomo,
        avviaMetronomo,
        fermaMetronomo,
    };
}