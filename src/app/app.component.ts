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
  [x: string]: any;
  title = 'huellitas-extremenas';


  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {

  }
}
