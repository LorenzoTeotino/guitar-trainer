"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { Accordo } from "@/tipi/Accordo";

import { selezionaAccordoCasuale } from "@/utilita/accordi/selezionaAccordoCasuale";

import {
    calcolaMillisecondiPerBattito,
    riproduciBattito,
} from "@/servizi/metronomo/servizioMetronomo";

interface ProprietaUseEsercizioAccordi {
    accordi: Accordo[];
    bpm: number;
    battitiPerAccordo: number;
}

export function useEsercizioAccordi({
                                        accordi,
                                        bpm,
                                        battitiPerAccordo,
                                    }: ProprietaUseEsercizioAccordi) {
    const [esercizioAvviato, setEsercizioAvviato] =
        useState(false);

    const [preConteggioAttivo, setPreConteggioAttivo] =
        useState(false);

    const [accordoCorrente, setAccordoCorrente] =
        useState<Accordo | null>(null);

    const [battitoCorrente, setBattitoCorrente] =
        useState(1);

    const [battitoPreConteggio, setBattitoPreConteggio] =
        useState(3);

    const avviaEsercizio = useCallback(() => {
        if (accordi.length === 0) {
            return;
        }

        setAccordoCorrente(null);
        setBattitoCorrente(1);
        setBattitoPreConteggio(3);

        setPreConteggioAttivo(true);
        setEsercizioAvviato(false);
    }, [accordi]);

    const fermaEsercizio = useCallback(() => {
        setEsercizioAvviato(false);
        setPreConteggioAttivo(false);

        setAccordoCorrente(null);

        setBattitoCorrente(1);
        setBattitoPreConteggio(3);
    }, []);

    useEffect(() => {
        if (!preConteggioAttivo) {
            return;
        }

        const millisecondiPerBattito =
            calcolaMillisecondiPerBattito(bpm);

        const intervallo = window.setInterval(() => {
            setBattitoPreConteggio((valorePrecedente) => {
                if (valorePrecedente > 1) {
                    return valorePrecedente - 1;
                }

                window.clearInterval(intervallo);

                const primoAccordo =
                    selezionaAccordoCasuale(accordi);

                setBattitoPreConteggio(0);

                window.setTimeout(() => {
                    setAccordoCorrente(primoAccordo);
                    setPreConteggioAttivo(false);
                    setEsercizioAvviato(true);
                    setBattitoCorrente(1);

                    riproduciBattito(true);
                }, 300);

                return 0;
            });
        }, millisecondiPerBattito);

        return () => {
            window.clearInterval(intervallo);
        };
    }, [
        preConteggioAttivo,
        bpm,
        accordi,
    ]);

    useEffect(() => {
        if (
            !esercizioAvviato ||
            preConteggioAttivo
        ) {
            return;
        }

        const millisecondiPerBattito =
            calcolaMillisecondiPerBattito(bpm);

        const intervallo = window.setInterval(() => {
            setBattitoCorrente(
                (battitoPrecedente) => {
                    if (
                        battitoPrecedente >= battitiPerAccordo
                    ) {
                        setAccordoCorrente(
                            (accordoPrecedente) =>
                                selezionaAccordoCasuale(
                                    accordi,
                                    accordoPrecedente
                                )
                        );

                        riproduciBattito(true);

                        return 1;
                    }

                    const nuovoBattito =
                        battitoPrecedente + 1;

                    riproduciBattito(false);

                    return nuovoBattito;
                }
            );
        }, millisecondiPerBattito);

        return () => {
            window.clearInterval(intervallo);
        };
    }, [
        esercizioAvviato,
        preConteggioAttivo,
        bpm,
        battitiPerAccordo,
        accordi,
    ]);

    return {
        esercizioAvviato,
        preConteggioAttivo,
        accordoCorrente,
        battitoCorrente,
        battitoPreConteggio,
        avviaEsercizio,
        fermaEsercizio,
    };
}