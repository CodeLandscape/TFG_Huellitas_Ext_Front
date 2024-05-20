import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {AuthTokenService} from '../../services/auth-token.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  isPerson: boolean;

  constructor(private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.isPerson = this.tokenService.getTokenData().roles === 'ROLE_USER';
  }

}
