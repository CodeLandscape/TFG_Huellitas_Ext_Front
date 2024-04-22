import { Component, OnInit } from '@angular/core';
import { ComunService } from '../../services/comun.service';
import { AuthTokenService } from '../../services/authToken.service';
import { IpServiceService } from '../../services/ip-service.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})

export class FooterComponent implements OnInit {

  usuarioNombre: string;
  usuarioApellidos: string;
  usuarioCompleto: string;
  fecha: string;
  miToken: any;
  usuarioIP: string;

  constructor(
    // tslint:disable-next-line: variable-name
    private _communServices: ComunService,
    private http: AuthTokenService,
    private ip: IpServiceService
    ) {}

    ngOnInit() {
      this.miToken = this._communServices.getTokenData();
      this.usuarioNombre = this.miToken.u_nombre;
      this.usuarioApellidos = this.miToken.u_apellidos;
      this.usuarioCompleto = this.usuarioNombre + ' ' + this.usuarioApellidos;
      this.fecha =  this.miToken.created;
      // console.log(miToken);
      // console.log(this.usuarioCompleto);
      // console.log(this.fecha);

      this.getIP();
    }
      getIP() {
        this.ip.getIPAddress().subscribe((res: any) => {
          this.usuarioIP = res.ip;
        });
      }
    }
