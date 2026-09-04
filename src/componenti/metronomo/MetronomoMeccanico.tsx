"use client";

import {
    useEffect,
    useRef,
} from "react";

interface ProprietaMetronomoMeccanico {
    bpm: number;
    metronomoAvviato: boolean;
}

export default function MetronomoMeccanico({
                                               bpm,
                                               metronomoAvviato,
                                           }: ProprietaMetronomoMeccanico) {
    const riferimentoPendolo =
        useRef<HTMLDivElement | null>(null);

    const riferimentoAnimazione =
        useRef<number | null>(null);

    const riferimentoInizio =
        useRef<number | null>(null);

    useEffect(() => {
        const pendolo =
            riferimentoPendolo.current;

        if (!pendolo) {
            return;
        }

        if (!metronomoAvviato) {
            if (
                riferimentoAnimazione.current !== null
            ) {
                window.cancelAnimationFrame(
                    riferimentoAnimazione.current
                );
            }

            riferimentoAnimazione.current =
                null;

            riferimentoInizio.current =
                null;

            pendolo.style.transform =
                "translateX(-50%) rotate(0deg)";

            return;
        }

        riferimentoInizio.current =
            null;

        const animaPendolo = (
            tempoCorrente: number
        ) => {
            if (
                riferimentoInizio.current === null
            ) {
                riferimentoInizio.current =
                    tempoCorrente;
            }

            const tempoTrascorso =
                tempoCorrente -
                riferimentoInizio.current;

            const durataCiclo =
                (60000 / bpm) * 2;

            const angolo =
                30 *
                Math.sin(
                    (
                        (tempoTrascorso %
                            durataCiclo) /
                        durataCiclo
                    ) *
                    Math.PI *
                    2
                );

            pendolo.style.transform =
                `translateX(-50%) rotate(${angolo}deg)`;

            riferimentoAnimazione.current =
                window.requestAnimationFrame(
                    animaPendolo
                );
        };

        riferimentoAnimazione.current =
            window.requestAnimationFrame(
                animaPendolo
            );

        return () => {
            if (
                riferimentoAnimazione.current !== null
            ) {
                window.cancelAnimationFrame(
                    riferimentoAnimazione.current
                );
            }

            riferimentoAnimazione.current =
                null;
        };
    }, [
        bpm,
        metronomoAvviato,
    ]);

    return (
        <div className="contenitore-metronomo-meccanico">
            <div className="metronomo-meccanico">
                <div className="linea-centrale-metronomo" />

                <div
                    ref={riferimentoPendolo}
                    className="pendolo-metronomo"
                >
                    <div className="asta-metronomo" />

                    <div className="peso-metronomo" />

                    <div className="perno-metronomo" />
                </div>
            </div>
        </div>
    );
}