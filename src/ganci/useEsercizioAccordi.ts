"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { Accordo } from "@/tipi/Accordo";
import { TempoMusicale } from "@/tipi/TempoMusicale";
import { SuonoMetronomo } from "@/tipi/SuonoMetronomo";

import { selezionaAccordoCasuale } from "@/utilita/accordi/selezionaAccordoCasuale";

import {
    calcolaIntervalloMetronomo,
    preparaMetronomo,
    suonoMetronomo,
} from "@/servizi/metronomo/servizioMetronomo";

interface ProprietaUseEsercizioAccordi {
    accordi: Accordo[];
    bpm: number;
    tempoMusicale: TempoMusicale;
    suonoMetronomoSelezionato: SuonoMetronomo;
}

export function useEsercizioAccordi({
                                        accordi,
                                        bpm,
                                        tempoMusicale,
                                        suonoMetronomoSelezionato,
                                    }: ProprietaUseEsercizioAccordi) {
    const [
        esercizioAvviato,
        setEsercizioAvviato,
    ] = useState(false);

    const [
        preConteggioAttivo,
        setPreConteggioAttivo,
    ] = useState(false);

    const [
        accordoCorrente,
        setAccordoCorrente,
    ] = useState<Accordo | null>(null);

    const [
        posizionePallinoCorrente,
        setPosizionePallinoCorrente,
    ] = useState(1);

    const [
        contoAllaRovescia,
        setContoAllaRovescia,
    ] = useState(3);

    const [
        istanteAvvioMetronomo,
        setIstanteAvvioMetronomo,
    ] = useState<number | null>(null);

    const riferimentoTimerMetronomo =
        useRef<number | null>(null);

    const avviaEsercizio =
        useCallback(async () => {
            await preparaMetronomo();

            setAccordoCorrente(null);
            setPosizionePallinoCorrente(1);
            setContoAllaRovescia(3);

            setIstanteAvvioMetronomo(null);

            setPreConteggioAttivo(true);
            setEsercizioAvviato(false);
        }, []);

    const fermaEsercizio =
        useCallback(() => {
            if (
                riferimentoTimerMetronomo.current !== null
            ) {
                window.clearTimeout(
                    riferimentoTimerMetronomo.current
                );

                riferimentoTimerMetronomo.current =
                    null;
            }

            setEsercizioAvviato(false);
            setPreConteggioAttivo(false);

            setAccordoCorrente(null);
            setPosizionePallinoCorrente(1);
            setContoAllaRovescia(3);

            setIstanteAvvioMetronomo(null);
        }, []);

    /*
     * PRE-CONTEGGIO
     *
     * Rimane completamente silenzioso.
     * Serve solamente per:
     *
     * 3 → 2 → 1 → VIA
     */
    useEffect(() => {
        if (!preConteggioAttivo) {
            return;
        }

        const intervalloMetronomo =
            calcolaIntervalloMetronomo(bpm);

        const intervallo =
            window.setInterval(() => {
                setContoAllaRovescia(
                    (valorePrecedente) => {
                        if (
                            valorePrecedente > 1
                        ) {
                            return (
                                valorePrecedente - 1
                            );
                        }

                        window.clearInterval(
                            intervallo
                        );

                        setContoAllaRovescia(0);

                        window.setTimeout(() => {
                            const primoAccordo =
                                accordi.length > 0
                                    ? selezionaAccordoCasuale(
                                        accordi
                                    )
                                    : null;

                            setAccordoCorrente(
                                primoAccordo
                            );

                            setPosizionePallinoCorrente(
                                1
                            );

                            /*
                             * QUESTO è l'unico istante
                             * di riferimento.
                             *
                             * Lo usa sia il pendolo
                             * sia il sistema dei click.
                             */
                            const istanteAvvio =
                                performance.now();

                            setIstanteAvvioMetronomo(
                                istanteAvvio
                            );

                            setPreConteggioAttivo(
                                false
                            );

                            setEsercizioAvviato(
                                true
                            );
                        }, 300);

                        return 0;
                    }
                );
            }, intervalloMetronomo);

        return () => {
            window.clearInterval(
                intervallo
            );
        };
    }, [
        preConteggioAttivo,
        bpm,
        accordi,
    ]);

    /*
     * METRONOMO DELL'ESERCIZIO
     *
     * Questa è la STESSA logica temporale
     * usata dal tab Metronomo.
     *
     * Pendolo e click partono dallo stesso
     * istante assoluto.
     */
    useEffect(() => {
        if (
            !esercizioAvviato ||
            preConteggioAttivo ||
            istanteAvvioMetronomo === null
        ) {
            return;
        }

        const intervalloMetronomo =
            calcolaIntervalloMetronomo(bpm);

        /*
         * Il pendolo parte dal centro.
         *
         * La prima estremità viene raggiunta
         * dopo metà intervallo.
         */
        const primoClick =
            istanteAvvioMetronomo +
            intervalloMetronomo / 2;

        let numeroClick = 0;
        let posizioneCorrente = 1;
        let primoTempoEseguito = false;

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

            riferimentoTimerMetronomo.current =
                window.setTimeout(() => {
                    /*
                     * Se siamo tornati sulla posizione 1,
                     * significa che inizia una nuova battuta.
                     *
                     * Cambiamo accordo PRIMA del click
                     * del nuovo primo tempo.
                     */
                    if (
                        posizioneCorrente === 1 &&
                        primoTempoEseguito &&
                        accordi.length > 0
                    ) {
                        setAccordoCorrente(
                            (accordoPrecedente) =>
                                selezionaAccordoCasuale(
                                    accordi,
                                    accordoPrecedente
                                )
                        );
                    }

                    const accentato =
                        tempoMusicale.accenti.includes(
                            posizioneCorrente
                        );

                    /*
                     * CLICK esattamente nello stesso
                     * momento in cui il pendolo
                     * raggiunge l'estremità.
                     */
                    suonoMetronomo(
                        accentato,
                        suonoMetronomoSelezionato
                    );

                    setPosizionePallinoCorrente(
                        posizioneCorrente
                    );

                    primoTempoEseguito = true;

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
                riferimentoTimerMetronomo.current !== null
            ) {
                window.clearTimeout(
                    riferimentoTimerMetronomo.current
                );

                riferimentoTimerMetronomo.current =
                    null;
            }
        };
    }, [
        esercizioAvviato,
        preConteggioAttivo,
        istanteAvvioMetronomo,
        bpm,
        tempoMusicale,
        accordi,
        suonoMetronomoSelezionato,
    ]);

    return {
        esercizioAvviato,
        preConteggioAttivo,
        accordoCorrente,
        posizionePallinoCorrente,
        contoAllaRovescia,
        istanteAvvioMetronomo,
        avviaEsercizio,
        fermaEsercizio,
    };
}