"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { Accordo } from "@/tipi/Accordo";
import { TempoMusicale } from "@/tipi/TempoMusicale";

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
}

export function useEsercizioAccordi({
                                        accordi,
                                        bpm,
                                        tempoMusicale,
                                    }: ProprietaUseEsercizioAccordi) {
    const [esercizioAvviato, setEsercizioAvviato] =
        useState(false);

    const [preConteggioAttivo, setPreConteggioAttivo] =
        useState(false);

    const [accordoCorrente, setAccordoCorrente] =
        useState<Accordo | null>(null);

    const [
        posizionePallinoCorrente,
        setPosizionePallinoCorrente,
    ] = useState(1);

    const [
        contoAllaRovescia,
        setContoAllaRovescia,
    ] = useState(3);

    const avviaEsercizio = useCallback(async() => {
        if (accordi.length === 0) {
            return;
        }

        await preparaMetronomo();

        setAccordoCorrente(null);
        setPosizionePallinoCorrente(1);
        setContoAllaRovescia(3);

        setPreConteggioAttivo(true);
        setEsercizioAvviato(false);
    }, [accordi]);

    const fermaEsercizio = useCallback(() => {
        setEsercizioAvviato(false);
        setPreConteggioAttivo(false);

        setAccordoCorrente(null);

        setPosizionePallinoCorrente(1);
        setContoAllaRovescia(3);
    }, []);

    useEffect(() => {
        if (!preConteggioAttivo) {
            return;
        }

        const intervalloMetronomo =
            calcolaIntervalloMetronomo(bpm);

        const intervallo = window.setInterval(() => {
            setContoAllaRovescia((valorePrecedente) => {
                if (valorePrecedente > 1) {
                    return valorePrecedente - 1;
                }

                window.clearInterval(intervallo);

                const primoAccordo =
                    selezionaAccordoCasuale(accordi);

                setContoAllaRovescia(0);

                window.setTimeout(() => {
                    setAccordoCorrente(primoAccordo);

                    setPreConteggioAttivo(false);
                    setEsercizioAvviato(true);

                    setPosizionePallinoCorrente(1);

                    suonoMetronomo(true);
                }, 300);

                return 0;
            });
        }, intervalloMetronomo);

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

        const intervalloMetronomo =
            calcolaIntervalloMetronomo(bpm);

        const intervallo = window.setInterval(() => {
            setPosizionePallinoCorrente(
                (posizionePrecedente) => {
                    if (
                        posizionePrecedente >=
                        tempoMusicale.suddivisioniPerBattuta
                    ) {
                        setAccordoCorrente(
                            (accordoPrecedente) =>
                                selezionaAccordoCasuale(
                                    accordi,
                                    accordoPrecedente
                                )
                        );

                        suonoMetronomo(true);

                        return 1;
                    }

                    const nuovaPosizione =
                        posizionePrecedente + 1;

                    suonoMetronomo(false);

                    return nuovaPosizione;
                }
            );
        }, intervalloMetronomo);

        return () => {
            window.clearInterval(intervallo);
        };
    }, [
        esercizioAvviato,
        preConteggioAttivo,
        bpm,
        tempoMusicale,
        accordi,
    ]);

    return {
        esercizioAvviato,
        preConteggioAttivo,
        accordoCorrente,
        posizionePallinoCorrente,
        contoAllaRovescia,
        avviaEsercizio,
        fermaEsercizio,
    };
}