import { Component, OnInit, ElementRef} from '@angular/core';
// import { ComunService } from './services/comun.service';
import { Router } from '@angular/router';
import { ConfigService } from './services/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(public router: Router) {
  }
  [x: string]: any;
  title = 'preving-app';

  tokenisValid: string = null;

  // tslint:disable-next-line: variable-name
  // constructor(private _communServices: ComunService,
  //             private router: Router,
  //             private elementRef: ElementRef,
  //             // tslint:disable-next-line: variable-name
  //             private _configService: ConfigService) {
  // }

  ngOnInit() {
      // VALIDACIÓN DEL TOKEN
    this.tokenisValid = this._communServices.getTokenData();
    if (!this.tokenisValid) {
      // window.location.href = 'https://intranet.preving.com/sso/login-form.do'; // PROD
      // window.location.href = 'https://demointranet.preving.com/'; // DEMO
    }
  }
}
