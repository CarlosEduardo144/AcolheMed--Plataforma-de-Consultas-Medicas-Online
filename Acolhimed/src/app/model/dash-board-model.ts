import { ConsultaResponseModel } from "./consulta-response";

export class DashBoardModel {
    totalMedicos: number;
    totalEspecialidades: number;
    totalconsultasHoje: number;
    totalPacientesAtendidos: number;
    consultaEmAndamento: ConsultaResponseModel;

    constructor() {
        this.totalMedicos = 0;
        this.totalEspecialidades = 0;
        this.totalconsultasHoje = 0;
        this.totalPacientesAtendidos = 0;
        this.consultaEmAndamento = new ConsultaResponseModel();
    }
}
