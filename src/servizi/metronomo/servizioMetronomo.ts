export function calcolaMillisecondiPerBattito(bpm: number): number {
    return 60000 / bpm;
}

export function riproduciBattito(accentato: boolean): void {
    const contestoAudio = new AudioContext();

    const oscillatore = contestoAudio.createOscillator();
    const guadagno = contestoAudio.createGain();

    oscillatore.connect(guadagno);
    guadagno.connect(contestoAudio.destination);

    oscillatore.frequency.value = accentato ? 1000 : 700;

    guadagno.gain.setValueAtTime(
        0.25,
        contestoAudio.currentTime
    );

    guadagno.gain.exponentialRampToValueAtTime(
        0.001,
        contestoAudio.currentTime + 0.08
    );

    oscillatore.start();
    oscillatore.stop(contestoAudio.currentTime + 0.08);

    oscillatore.onended = () => {
        contestoAudio.close();
    };
}