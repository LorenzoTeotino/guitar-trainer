"use client";

import { useMemo, useState } from "react";

import SelezioneAccordi from "@/componenti/accordi/SelezioneAccordi";

import NavigazionePrincipale from "@/componenti/comune/NavigazionePrincipale";

import ConfigurazioneEsercizio from "@/componenti/esercizio/ConfigurazioneEsercizio";
import PreConteggio from "@/componenti/esercizio/PreConteggio";
import SchermataEsercizio from "@/componenti/esercizio/SchermataEsercizio";

import ConfigurazioneMetronomo from "@/componenti/metronomo/ConfigurazioneMetronomo";

import { BPM_PREDEFINITI } from "@/costanti/configurazioneEsercizio";

import { accordiDisponibili } from "@/dati/accordi/accordiDisponibili";
import { TEMPO_QUATTRO_QUARTI } from "@/dati/tempi/tempiDisponibili";

import { useEsercizioAccordi } from "@/ganci/useEsercizioAccordi";

import FinestraImpostazioni from "@/componenti/impostazioni/FinestraImpostazioni";
import { useImpostazioniApplicazione } from "@/ganci/useImpostazioniApplicazione";

import { useMetronomo } from "@/ganci/useMetronomo";

import { LinguaAccordi } from "@/tipi/LinguaAccordi";
import { SezioneApplicazione } from "@/tipi/SezioneApplicazione";
import { TempoMusicale } from "@/tipi/TempoMusicale";

export default function PaginaPrincipale() {
  const [lingua, setLingua] =
      useState<LinguaAccordi>("italiano");

  const [accordiSelezionati, setAccordiSelezionati] =
      useState<string[]>([]);

  const [bpm, setBpm] =
      useState(BPM_PREDEFINITI);

  const [tempoMusicale, setTempoMusicale] =
      useState<TempoMusicale>(
          TEMPO_QUATTRO_QUARTI
      );

  const [sezioneAttiva, setSezioneAttiva] =
      useState<SezioneApplicazione>(
          "esercizio"
      );

  const [
    impostazioniAperte,
    setImpostazioniAperte,
  ] = useState(false);

  const {
    impostazioni,
    cambiaTipoMetronomo,
    cambiaSuonoMetronomo,
  } = useImpostazioniApplicazione();

  const {
    metronomoAvviato,
    posizionePallinoCorrente:
        posizionePallinoMetronomo,
    posizionePendolo,
    avviaMetronomo,
    fermaMetronomo,
  } = useMetronomo({
    bpm,
    tempoMusicale,
    suonoMetronomoSelezionato:
    impostazioni.suonoMetronomo,
  });

  const accordiAttivi = useMemo(() => {
    return accordiDisponibili.filter(
        (accordo) =>
            accordiSelezionati.includes(
                accordo.id
            )
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
    accordi:
        sezioneAttiva === "esercizio"
            ? accordiAttivi
            : [],
    bpm,
    tempoMusicale,
    suonoMetronomoSelezionato:
    impostazioni.suonoMetronomo,
  });

  const cambiaSelezioneAccordo = (
      idAccordo: string
  ) => {
    setAccordiSelezionati(
        (accordiPrecedenti) => {
          if (
              accordiPrecedenti.includes(
                  idAccordo
              )
          ) {
            return accordiPrecedenti.filter(
                (id) =>
                    id !== idAccordo
            );
          }

          return [
            ...accordiPrecedenti,
            idAccordo,
          ];
        }
    );
  };

  const selezionaTuttiGliAccordi = () => {
    setAccordiSelezionati(
        accordiDisponibili.map(
            (accordo) => accordo.id
        )
    );
  };

  const deselezionaTuttiGliAccordi = () => {
    setAccordiSelezionati([]);
  };

  const diminuisciBpm = () => {
    setBpm((valore) =>
        Math.max(30, valore - 1)
    );
  };

  const aumentaBpm = () => {
    setBpm((valore) =>
        Math.min(300, valore + 1)
    );
  };

  if (preConteggioAttivo) {
    return (
        <main className="pagina">
          <PreConteggio
              contoAllaRovescia={
                contoAllaRovescia
              }
              alTermine={
                fermaEsercizio
              }
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
            <h1>
              Guitar Trainer
            </h1>

            <p>
              Allenati con gli accordi
              oppure usa il metronomo
              per mantenere il ritmo.
            </p>
          </header>

          <NavigazionePrincipale
              sezioneAttiva={sezioneAttiva}
              alCambioSezione={setSezioneAttiva}
              alAperturaImpostazioni={() =>
                  setImpostazioniAperte(true)
              }
          />

          {sezioneAttiva ===
              "esercizio" && (
                  <>
                    <section className="pannello">
                      <div className="intestazione-sezione">
                        <div>
                          <h2>
                            Accordi
                          </h2>

                          <p>
                            {
                              accordiSelezionati.length
                            }{" "}
                            selezionati
                          </p>
                        </div>

                        <div className="azioni-selezione">
                          <select
                              className="selettore-lingua-accordi"
                              value={lingua}
                              onChange={(evento) =>
                                  setLingua(
                                      evento.target.value as LinguaAccordi
                                  )
                              }
                          >
                            <option value="italiano">
                              Italiano
                            </option>

                            <option value="inglese">
                              Inglese
                            </option>
                          </select>

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
                          lingua={
                            lingua
                          }
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
                        tempoMusicale={
                          tempoMusicale
                        }
                        diminuisciBpm={
                          diminuisciBpm
                        }
                        aumentaBpm={
                          aumentaBpm
                        }
                        alCambioBpm={
                          setBpm
                        }
                        alCambioTempoMusicale={
                          setTempoMusicale
                        }
                    />

                    <button
                        type="button"
                        className="pulsante-avvia"
                        onClick={
                          avviaEsercizio
                        }
                        disabled={
                            accordiSelezionati.length ===
                            0
                        }
                    >
                      Avvia esercizio
                    </button>

                    {accordiSelezionati.length ===
                        0 && (
                            <p className="messaggio-selezione">
                              Seleziona almeno
                              un accordo per
                              iniziare.
                            </p>
                        )}
                  </>
              )}
          {sezioneAttiva === "metronomo" && (
              <ConfigurazioneMetronomo
                  bpm={bpm}
                  tempoMusicale={tempoMusicale}
                  tipoMetronomo={
                    impostazioni.tipoMetronomo
                  }
                  metronomoAvviato={
                    metronomoAvviato
                  }
                  posizionePallinoCorrente={
                    posizionePallinoMetronomo
                  }
                  posizionePendolo={
                    posizionePendolo
                  }
                  diminuisciBpm={
                    diminuisciBpm
                  }
                  aumentaBpm={
                    aumentaBpm
                  }
                  alCambioBpm={
                    setBpm
                  }
                  alCambioTempoMusicale={
                    setTempoMusicale
                  }
                  alAvvio={
                    avviaMetronomo
                  }
                  alTermine={
                    fermaMetronomo
                  }
              />
          )}

          {impostazioniAperte && (
              <FinestraImpostazioni
                  tipoMetronomo={
                    impostazioni.tipoMetronomo
                  }
                  suonoMetronomoSelezionato={
                    impostazioni.suonoMetronomo
                  }
                  alCambioTipoMetronomo={
                    cambiaTipoMetronomo
                  }
                  alCambioSuonoMetronomo={
                    cambiaSuonoMetronomo
                  }
                  allaChiusura={() =>
                      setImpostazioniAperte(false)
                  }
              />
          )}
        </div>
      </main>
  );
}