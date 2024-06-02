import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'huellitas-extremenas';

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    const tokenData = this.tokenService.getTokenData();
    if (tokenData === null) {
      this.router.navigate(['/']);
    }
  }
}
