import { SuonoMetronomo } from "@/tipi/SuonoMetronomo";

let contestoAudio: AudioContext | null = null;

function recuperaContestoAudio(): AudioContext {
    if (!contestoAudio) {
        contestoAudio = new AudioContext();
    }

    if (contestoAudio.state === "suspended") {
        void contestoAudio.resume();
    }

    return contestoAudio;
}

export function calcolaIntervalloMetronomo(
    bpm: number
): number {
    return 60000 / bpm;
}

export async function preparaMetronomo(): Promise<void> {
    const contesto = recuperaContestoAudio();

    if (contesto.state === "suspended") {
        await contesto.resume();
    }
}

interface ConfigurazioneSuono {
    frequenzaNormale: number;
    frequenzaAccento: number;
    durata: number;
    volume: number;
    tipoOscillatore: OscillatorType;
}

function recuperaConfigurazioneSuono(
    suono: SuonoMetronomo
): ConfigurazioneSuono {
    switch (suono) {
        case "morbido":
            return {
                frequenzaNormale: 700,
                frequenzaAccento: 950,
                durata: 0.06,
                volume: 0.11,
                tipoOscillatore: "sine",
            };

        case "secco":
            return {
                frequenzaNormale: 1400,
                frequenzaAccento: 1900,
                durata: 0.018,
                volume: 0.22,
                tipoOscillatore: "square",
            };

        case "legno":
            return {
                frequenzaNormale: 520,
                frequenzaAccento: 760,
                durata: 0.045,
                volume: 0.2,
                tipoOscillatore: "triangle",
            };

        case "hihat":
            return {
                frequenzaNormale: 5200,
                frequenzaAccento: 6800,
                durata: 0.025,
                volume: 0.08,
                tipoOscillatore: "square",
            };

        case "rimshot":
            return {
                frequenzaNormale: 1800,
                frequenzaAccento: 2400,
                durata: 0.022,
                volume: 0.24,
                tipoOscillatore: "square",
            };

        case "clave":
            return {
                frequenzaNormale: 1100,
                frequenzaAccento: 1450,
                durata: 0.04,
                volume: 0.19,
                tipoOscillatore: "triangle",
            };

        case "cowbell":
            return {
                frequenzaNormale: 800,
                frequenzaAccento: 1050,
                durata: 0.09,
                volume: 0.16,
                tipoOscillatore: "square",
            };

        case "digitale":
            return {
                frequenzaNormale: 1250,
                frequenzaAccento: 1750,
                durata: 0.055,
                volume: 0.14,
                tipoOscillatore: "sine",
            };

        case "meccanico":
            return {
                frequenzaNormale: 900,
                frequenzaAccento: 1250,
                durata: 0.03,
                volume: 0.2,
                tipoOscillatore: "triangle",
            };

        case "classico":
        default:
            return {
                frequenzaNormale: 1000,
                frequenzaAccento: 1150,
                durata: 0.03,
                volume: 0.18,
                tipoOscillatore: "sine",
            };
    }
}

function riproduciClickClassico(
    accentato: boolean
): void {
    const contesto =
        recuperaContestoAudio();

    const ora =
        contesto.currentTime;

    const livelloAccento =
        accentato ? 1 : 0;

    const volumeBase =
        0.18;

    const moltiplicatoriAccento = [
        0,
        1,
        1.25,
        1.45,
    ];

    const moltiplicatoreAccento =
        moltiplicatoriAccento[
            livelloAccento
            ] ?? 1;

    const volume =
        accentato
            ? 2.5 *
            volumeBase *
            moltiplicatoreAccento
            : 2.5 *
            volumeBase *
            0.5;

    const guadagno =
        contesto.createGain();

    guadagno.connect(
        contesto.destination
    );

    const oscillatore =
        contesto.createOscillator();

    const filtro =
        contesto.createBiquadFilter();

    oscillatore.connect(filtro);
    filtro.connect(guadagno);

    filtro.type = "highpass";

    filtro.frequency.setValueAtTime(
        1000 +
        100 * livelloAccento,
        ora
    );

    oscillatore.type = "sine";

    oscillatore.frequency.setValueAtTime(
        1000 +
        150 * livelloAccento,
        ora
    );

    guadagno.gain.setValueAtTime(
        volume,
        ora
    );

    guadagno.gain.exponentialRampToValueAtTime(
        0.001,
        ora + 0.03
    );

    oscillatore.start(ora);
    oscillatore.stop(ora + 0.03);
}

function riproduciSuonoGenerico(
    accentato: boolean,
    suono: SuonoMetronomo
): void {
    const contesto =
        recuperaContestoAudio();

    const configurazione =
        recuperaConfigurazioneSuono(
            suono
        );

    const ora =
        contesto.currentTime;

    const oscillatore =
        contesto.createOscillator();

    const guadagno =
        contesto.createGain();

    oscillatore.type =
        configurazione.tipoOscillatore;

    oscillatore.frequency.setValueAtTime(
        accentato
            ? configurazione.frequenzaAccento
            : configurazione.frequenzaNormale,
        ora
    );

    guadagno.gain.setValueAtTime(
        configurazione.volume,
        ora
    );

    guadagno.gain.exponentialRampToValueAtTime(
        0.001,
        ora +
        configurazione.durata
    );

    oscillatore.connect(guadagno);
    guadagno.connect(
        contesto.destination
    );

    oscillatore.start(ora);

    oscillatore.stop(
        ora +
        configurazione.durata
    );
}

export function suonoMetronomo(
    accentato: boolean,
    suono: SuonoMetronomo = "classico"
): void {
    if (suono === "classico") {
        riproduciClickClassico(
            accentato
        );

        return;
    }

    riproduciSuonoGenerico(
        accentato,
        suono
    );
}