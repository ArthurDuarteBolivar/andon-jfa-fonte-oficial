import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OperationService } from 'src/app/service/operation.service';

@Component({
  selector: 'app-qrcode-counter',
  templateUrl: './qrcode-counter.component.html',
  styleUrls: ['./qrcode-counter.component.scss'],
})
export class QrcodeCounterComponent implements OnInit {
  nomeOperacao: string = '';
  private storage: Storage;
  nome: string = '';
  constructor(
    private operationService: OperationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.storage = window.localStorage;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.nomeOperacao = params['name'];
    });
  }

  entrar(name: string): void {
    this.storage.setItem("nome", name);
    this.operationService
      .atualizarOcupado(this.nomeOperacao.toString(), true)
      .subscribe();
    this.router.navigate(['counter/${this.nomeOperacao}']);
    
  }
}
