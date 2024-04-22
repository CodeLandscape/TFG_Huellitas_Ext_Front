import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CONFIG } from '../config/config';
import { AuthTokenService } from './authToken.service';

@Injectable()
export class ConfigService {
  filePath = '/assets/config.json';
  configData: any = CONFIG;

  // tslint:disable-next-line: variable-name
  constructor(private _http: AuthTokenService, ) {
    //    this.getConfig();
  }

  getConfig() {
    this._http
      .get(this.filePath)
      .toPromise()
      .then(res => {
        this.configData = res;
      });
  }

  get(key: string) {
    return this.configData[key];
  }
}
