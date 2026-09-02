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

export function calcolaMillisecondiPerBattito(
    bpm: number
): number {
    return 60000 / bpm;
}

export function riproduciBattito(
    accentato: boolean
): void {
    const contesto = recuperaContestoAudio();

    const oscillatore = contesto.createOscillator();
    const guadagno = contesto.createGain();

    oscillatore.type = "square";

    oscillatore.frequency.setValueAtTime(
        accentato ? 1600 : 1100,
        contesto.currentTime
    );

    guadagno.gain.setValueAtTime(
        0.18,
        contesto.currentTime
    );

    guadagno.gain.exponentialRampToValueAtTime(
        0.001,
        contesto.currentTime + 0.035
    );

    oscillatore.connect(guadagno);
    guadagno.connect(contesto.destination);

    oscillatore.start(contesto.currentTime);

    oscillatore.stop(
        contesto.currentTime + 0.035
    );
}