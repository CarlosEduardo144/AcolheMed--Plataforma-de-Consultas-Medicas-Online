export type StatusConsulta = 'agendada' | 'em_andamento' | 'finalizada' | 'cancelada';

export class ConsultaResponseModel {
    id: string;
    pacienteFoto: string;
    medicoFoto: string;
    medicoId: string;
    dataHora: Date;
    especialidadeId: string;
    especialidadeNome: string;
    status: StatusConsulta;
    observacoes: string;
    motivoCancelamento: string;
    pacienteNome: string;
    medicoNome: string
    linkConsulta: string;
    possuiAvaliacao: boolean;
    possuiPrescricao: boolean;

    constructor() {
        this.id = '';
        this.pacienteFoto = "";
        this.medicoFoto = "";
        this.medicoId = "";
        this.dataHora = new Date();
        this.especialidadeId = ""
        this.especialidadeNome = "";
        this.status = 'agendada';
        this.observacoes = '';
        this.motivoCancelamento = "";
        this.medicoNome = "";
        this.pacienteNome = "";
        this.linkConsulta = "";
        this.possuiAvaliacao = false;
        this.possuiPrescricao = false;
    }
}
