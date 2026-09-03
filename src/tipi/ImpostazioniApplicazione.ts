import { TipoMetronomo } from "@/tipi/TipoMetronomo";
import { SuonoMetronomo } from "@/tipi/SuonoMetronomo";

export interface ImpostazioniApplicazione {
    tipoMetronomo: TipoMetronomo;
    suonoMetronomo: SuonoMetronomo;
}