import { Accordo } from "@/tipi/Accordo";

export function selezionaAccordoCasuale(
    accordi: Accordo[],
    accordoPrecedente?: Accordo | null
): Accordo | null {
    if (accordi.length === 0) {
        return null;
    }

    if (accordi.length === 1) {
        return accordi[0];
    }

    const accordiDisponibili = accordoPrecedente
        ? accordi.filter(
            (accordo) => accordo.id !== accordoPrecedente.id
        )
        : accordi;

    const indiceCasuale = Math.floor(
        Math.random() * accordiDisponibili.length
    );

    return accordiDisponibili[indiceCasuale];
}