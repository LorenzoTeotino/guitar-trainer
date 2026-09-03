"use client";

import {
    useCallback,
    useEffect,
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

    const suddivisioniPerBattuta =
        tempoMusicale.suddivisioniPerBattuta;

    const avviaEsercizio =
        useCallback(async () => {
            await preparaMetronomo();

            setAccordoCorrente(null);
            setPosizionePallinoCorrente(1);
            setContoAllaRovescia(3);

            setPreConteggioAttivo(true);
            setEsercizioAvviato(false);
        }, []);

    const fermaEsercizio =
        useCallback(() => {
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

        const intervallo =
            window.setInterval(() => {
                setContoAllaRovescia(
                    (valorePrecedente) => {
                        if (
                            valorePrecedente >
                            1
                        ) {
                            return (
                                valorePrecedente -
                                1
                            );
                        }

                        window.clearInterval(
                            intervallo
                        );

                        setContoAllaRovescia(
                            0
                        );

                        window.setTimeout(
                            () => {
                                const primoAccordo =
                                    accordi.length >
                                    0
                                        ? selezionaAccordoCasuale(
                                            accordi
                                        )
                                        : null;

                                setAccordoCorrente(
                                    primoAccordo
                                );

                                setPreConteggioAttivo(
                                    false
                                );

                                setEsercizioAvviato(
                                    true
                                );

                                setPosizionePallinoCorrente(
                                    1
                                );

                                suonoMetronomo(
                                    true,
                                    suonoMetronomoSelezionato
                                );
                            },
                            300
                        );

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
        suonoMetronomoSelezionato,
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

        const intervallo =
            window.setInterval(() => {
                setPosizionePallinoCorrente(
                    (posizionePrecedente) => {
                        if (
                            posizionePrecedente >=
                            suddivisioniPerBattuta
                        ) {
                            if (
                                accordi.length >
                                0
                            ) {
                                setAccordoCorrente(
                                    (
                                        accordoPrecedente
                                    ) =>
                                        selezionaAccordoCasuale(
                                            accordi,
                                            accordoPrecedente
                                        )
                                );
                            }

                            suonoMetronomo(
                                true,
                                suonoMetronomoSelezionato
                            );

                            return 1;
                        }

                        const nuovaPosizione =
                            posizionePrecedente +
                            1;

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

        return () => {
            window.clearInterval(
                intervallo
            );
        };
    }, [
        esercizioAvviato,
        preConteggioAttivo,
        bpm,
        suddivisioniPerBattuta,
        accordi,
        tempoMusicale.accenti,
        suonoMetronomoSelezionato,
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