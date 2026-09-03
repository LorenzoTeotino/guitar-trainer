import { PosizionePendolo } from "@/ganci/useMetronomo";

interface ProprietaMetronomoMeccanico {
    bpm: number;
    posizionePendolo: PosizionePendolo;
}

export default function MetronomoMeccanico({
                                               bpm,
                                               posizionePendolo,
                                           }: ProprietaMetronomoMeccanico) {
    const durataMovimento =
        60 / bpm;

    const durataTransizione =
        posizionePendolo === "centro"
            ? durataMovimento / 2
            : durataMovimento;

    return (
        <div className="contenitore-metronomo-meccanico">
            <div className="metronomo-meccanico">
                <div className="linea-centrale-metronomo" />

                <div
                    className={[
                        "pendolo-metronomo",
                        `pendolo-${posizionePendolo}`,
                    ].join(" ")}
                    style={{
                        transitionDuration:
                            `${durataTransizione}s`,
                    }}
                >
                    <div className="asta-metronomo" />

                    <div className="peso-metronomo" />

                    <div className="perno-metronomo" />
                </div>
            </div>
        </div>
    );
}