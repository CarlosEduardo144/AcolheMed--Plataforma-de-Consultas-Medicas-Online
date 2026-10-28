import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { IonIcon, IonButton, IonContent, IonHeader, IonTabBar, IonTabButton, IonTitle, IonToolbar, IonLabel, IonButtons, IonAvatar } from '@ionic/angular/standalone';
import { MedicoModel } from 'src/app/model/medico.model';
import { PacienteModel } from 'src/app/model/paciente.model';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CommonModule } from '@angular/common'; // 1. Importe o módulo
import { forkJoin } from 'rxjs';
import { ConsultaService } from 'src/app/services/consulta-service';
import { ConsultaResponseModel } from 'src/app/model/consulta-response';
import { TokenService } from 'src/app/services/token-service';
import { TokenModel } from 'src/app/model/token-model';
import { DashBoardModel } from 'src/app/model/dash-board-model';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonIcon, RouterModule, CommonModule, IonHeader, IonHeader, IonTabBar, IonTabButton, IonToolbar, IonButtons, IonContent, IonAvatar, IonLabel, IonTitle, IonButton
  ],
})
export class InicioPage implements OnInit {

  usuario!: PacienteModel | MedicoModel;
  consultaEmAndamento: ConsultaResponseModel;
  carregandoInicial = true;
  token: TokenModel;
  dashBoard: DashBoardModel;

  constructor(
    private navCtrl: NavController,
    private usuarioService: UsuarioService,
    private toastController: ToastController,
    private consultaService: ConsultaService,
    private tokenService: TokenService
  ) {
    this.consultaEmAndamento = new ConsultaResponseModel();
    this.token = new TokenModel();
    this.dashBoard = new DashBoardModel();
  }

  ngOnInit() {
    this.carregarDadosIniciais();
  }

  ionViewWillEnter() {
    if (!this.carregandoInicial && this.token.id) {
      this.carregarUsuario(false);
    }
  }

  carregarDadosIniciais() {
    this.carregandoInicial = true;
    this.token = this.tokenService.extrair();
    if (!this.token.id) {
      this.exibirMensagem('Erro ao identificar usuário.');
      return;
    }

    forkJoin({
      usuario: this.usuarioService.buscarPorId(this.token.id),
      dashBoard: this.usuarioService.getDashBoard(),
    }).subscribe({
      next: ({ usuario, dashBoard }) => {
        this.usuario = usuario;
        this.dashBoard = dashBoard;
        this.consultaEmAndamento = dashBoard.consultaEmAndamento
        this.carregandoInicial = false;
      },
      error: (erro) => {
        this.carregandoInicial = false;
        this.exibirMensagem(erro.error?.message || 'Erro ao carregar informações iniciais.');
      }
    });
  }

  carregarUsuario(exibirCarregamento = true) {
    if (exibirCarregamento) {
      this.carregandoInicial = true;
    }
    this.usuarioService.buscarPorId(this.token.id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        if (exibirCarregamento) {
          this.carregandoInicial = false;
        }
      },
      error: (erro) => {
        console.error(erro);
        if (exibirCarregamento) {
          this.carregandoInicial = false;
        }
        this.exibirMensagem(erro.error?.message || 'Erro ao carregar usuário');
      }
    });
  }

  navigate(path: string) {
    this.navCtrl.navigateForward(path);
  }

  iniciais(nome?: string): string {
    if (!nome) return '';
    return nome.trim().slice(0, 2).toUpperCase();
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }

  abrirNotificacoes() {
    this.navCtrl.navigateForward("/notificacoes");
  }

  abrirChat() {
    // navegação para o chat da consulta em andamento
  }

  iniciarChamada(consulta: ConsultaResponseModel) {
    this.consultaService.definirConsultaEmAndamento(consulta.id).subscribe({
      next: () => {
      },
      error: (erro) => {
        console.log(erro);
      }
    });
    window.open(consulta.linkConsulta, '_system');
  }
}
