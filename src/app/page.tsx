"use client";

import { useMemo, useState } from "react";

import SelettoreLinguaAccordi from "@/componenti/accordi/SelettoreLinguaAccordi";
import SelezioneAccordi from "@/componenti/accordi/SelezioneAccordi";
import ConfigurazioneEsercizio from "@/componenti/esercizio/ConfigurazioneEsercizio";
import SchermataEsercizio from "@/componenti/esercizio/SchermataEsercizio";
import PreConteggio from "@/componenti/esercizio/PreConteggio";

import { accordiDisponibili } from "@/dati/accordi/accordiDisponibili";

import {
  BATTITI_PREDEFINITI,
  BPM_PREDEFINITI,
} from "@/costanti/configurazioneEsercizio";

import { LinguaAccordi } from "@/tipi/LinguaAccordi";
import { useEsercizioAccordi } from "@/ganci/useEsercizioAccordi";

export default function PaginaPrincipale() {
  const [lingua, setLingua] =
      useState<LinguaAccordi>("italiano");

  const [accordiSelezionati, setAccordiSelezionati] =
      useState<string[]>([]);

  const [bpm, setBpm] =
      useState(BPM_PREDEFINITI);

  const [battitiPerAccordo, setBattitiPerAccordo] =
      useState(BATTITI_PREDEFINITI);

  const accordiAttivi = useMemo(() => {
    return accordiDisponibili.filter((accordo) =>
        accordiSelezionati.includes(accordo.id)
    );
  }, [accordiSelezionati]);

  const {
    esercizioAvviato,
    preConteggioAttivo,
    accordoCorrente,
    battitoCorrente,
    battitoPreConteggio,
    avviaEsercizio,
    fermaEsercizio,
  } = useEsercizioAccordi({
    accordi: accordiAttivi,
    bpm,
    battitiPerAccordo,
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
              battitoCorrente={battitoPreConteggio}
              alTermine={fermaEsercizio}
          />
        </main>
    );
  }

  if (
      esercizioAvviato &&
      accordoCorrente
  ) {
    return (
        <main className="pagina">
          <SchermataEsercizio
              accordoCorrente={accordoCorrente}
              lingua={lingua}
              battitoCorrente={battitoCorrente}
              battitiPerAccordo={battitiPerAccordo}
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

          <section className="pannello">
            <ConfigurazioneEsercizio
                bpm={bpm}
                battitiPerAccordo={
                  battitiPerAccordo
                }
                alCambioBpm={setBpm}
                alCambioBattiti={
                  setBattitiPerAccordo
                }
            />
          </section>

          <button
              type="button"
              className="pulsante-avvia"
              onClick={avviaEsercizio}
              disabled={
                  accordiSelezionati.length === 0
              }
          >
            Avvia esercizio
          </button>

          {accordiSelezionati.length === 0 && (
              <p className="messaggio-selezione">
                Seleziona almeno un accordo per
                iniziare.
              </p>
          )}
        </div>
      </main>
  );
}