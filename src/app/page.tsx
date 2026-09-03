"use client";

import { useMemo, useState } from "react";

import SelettoreLinguaAccordi from "@/componenti/accordi/SelettoreLinguaAccordi";
import SelezioneAccordi from "@/componenti/accordi/SelezioneAccordi";
import ConfigurazioneEsercizio from "@/componenti/esercizio/ConfigurazioneEsercizio";
import SchermataEsercizio from "@/componenti/esercizio/SchermataEsercizio";
import PreConteggio from "@/componenti/esercizio/PreConteggio";

import { accordiDisponibili } from "@/dati/accordi/accordiDisponibili";
import { TEMPO_QUATTRO_QUARTI } from "@/dati/tempi/tempiDisponibili";

import { BPM_PREDEFINITI } from "@/costanti/configurazioneEsercizio";

import { LinguaAccordi } from "@/tipi/LinguaAccordi";
import { TempoMusicale } from "@/tipi/TempoMusicale";

import { useEsercizioAccordi } from "@/ganci/useEsercizioAccordi";

export default function PaginaPrincipale() {
  const [lingua, setLingua] =
      useState<LinguaAccordi>("italiano");

  const [accordiSelezionati, setAccordiSelezionati] =
      useState<string[]>([]);

  const [bpm, setBpm] =
      useState(BPM_PREDEFINITI);

  const [tempoMusicale, setTempoMusicale] =
      useState<TempoMusicale>(TEMPO_QUATTRO_QUARTI);

  const accordiAttivi = useMemo(() => {
    return accordiDisponibili.filter((accordo) =>
        accordiSelezionati.includes(accordo.id)
    );
  }, [accordiSelezionati]);

  const {
    esercizioAvviato,
    preConteggioAttivo,
    accordoCorrente,
    posizionePallinoCorrente,
    contoAllaRovescia,
    avviaEsercizio,
    fermaEsercizio,
  } = useEsercizioAccordi({
    accordi: accordiAttivi,
    bpm,
    tempoMusicale,
  });

  const cambiaSelezioneAccordo = (
      idAccordo: string
  ) => {
    setAccordiSelezionati((accordiPrecedenti) => {
      if (accordiPrecedenti.includes(idAccordo)) {
        return accordiPrecedenti.filter(
            (id) => id !== idAccordo
        );
      }

      return [...accordiPrecedenti, idAccordo];
    });
  };

  const selezionaTuttiGliAccordi = () => {
    setAccordiSelezionati(
        accordiDisponibili.map((accordo) => accordo.id)
    );
  };

  const deselezionaTuttiGliAccordi = () => {
    setAccordiSelezionati([]);
  };

  if (preConteggioAttivo) {
    return (
        <main className="pagina">
          <PreConteggio
              contoAllaRovescia={contoAllaRovescia}
              alTermine={fermaEsercizio}
          />
        </main>
    );
  }

  if (esercizioAvviato) {
    return (
        <main className="pagina">
          <SchermataEsercizio
              accordoCorrente={accordoCorrente}
              lingua={lingua}
              posizionePallinoCorrente={
                posizionePallinoCorrente
              }
              palliniTotali={
                tempoMusicale.suddivisioniPerBattuta
              }
              tempoMusicale={tempoMusicale}
              bpm={bpm}
              alTermine={fermaEsercizio}
          />
        </main>
    );
  }

  return (
      <main className="pagina">
        <div className="contenitore-principale">
          <header className="intestazione">
            <h1>Guitar Trainer</h1>

            <p>
              Seleziona gli accordi che vuoi
              esercitare e allenati a cambiarli
              mantenendo il ritmo.
            </p>
          </header>

          <section className="pannello">
            <h2>Nomi degli accordi</h2>

            <SelettoreLinguaAccordi
                lingua={lingua}
                alCambioLingua={setLingua}
            />
          </section>

          <section className="pannello">
            <div className="intestazione-sezione">
              <div>
                <h2>Accordi</h2>

                <p>
                  {accordiSelezionati.length} selezionati
                </p>
              </div>

              <div className="azioni-selezione">
                <button
                    type="button"
                    onClick={selezionaTuttiGliAccordi}
                >
                  Tutti
                </button>

                <button
                    type="button"
                    onClick={deselezionaTuttiGliAccordi}
                >
                  Nessuno
                </button>
              </div>
            </div>

            <SelezioneAccordi
                lingua={lingua}
                accordiSelezionati={
                  accordiSelezionati
                }
                alCambioSelezione={
                  cambiaSelezioneAccordo
                }
            />
          </section>

          <ConfigurazioneEsercizio
              bpm={bpm}
              tempoMusicale={tempoMusicale}
              diminuisciBpm={() =>
                  setBpm((valore) => Math.max(30, valore - 1))
              }
              aumentaBpm={() =>
                  setBpm((valore) => Math.min(300, valore + 1))
              }
              alCambioBpm={setBpm}
              alCambioTempoMusicale={setTempoMusicale}
          />

          <button
              type="button"
              className="pulsante-avvia"
              onClick={avviaEsercizio}
          >
            Avvia esercizio
          </button>
        </div>
      </main>
  );
}