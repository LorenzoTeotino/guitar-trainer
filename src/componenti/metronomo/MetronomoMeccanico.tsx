"use client";

import {
    useEffect,
    useRef,
} from "react";

interface ProprietaMetronomoMeccanico {
    bpm: number;
    metronomoAvviato: boolean;
    istanteAvvioMetronomo: number | null;
}

export default function MetronomoMeccanico({
                                               bpm,
                                               metronomoAvviato,
                                               istanteAvvioMetronomo,
                                           }: ProprietaMetronomoMeccanico) {
    const riferimentoPendolo =
        useRef<HTMLDivElement | null>(null);

    const riferimentoAnimazione =
        useRef<number | null>(null);

    useEffect(() => {
        const pendolo =
            riferimentoPendolo.current;

        if (!pendolo) {
            return;
        }

        if (
            !metronomoAvviato ||
            istanteAvvioMetronomo === null
        ) {
            if (
                riferimentoAnimazione.current !== null
            ) {
                window.cancelAnimationFrame(
                    riferimentoAnimazione.current
                );
            }

            riferimentoAnimazione.current =
                null;

            pendolo.style.transform =
                "translateX(-50%) rotate(0deg)";

            return;
        }

        const durataCiclo =
            (60000 / bpm) * 2;

        const animaPendolo = (
            tempoCorrente: number
        ) => {
            const tempoTrascorso =
                tempoCorrente -
                istanteAvvioMetronomo;

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
        istanteAvvioMetronomo,
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