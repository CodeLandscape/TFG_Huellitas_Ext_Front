import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CONFIG } from '../config/config';

@Injectable()
export class ConfigService {
  filePath = '/assets/config.json';
  configData: any = CONFIG;
  get(key: string) {
    return this.configData[key];
  }
}
