import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Modules */
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

/* Services / Providers */
// import { AuthTokenService } from './services/authToken.service';
import { HttpClient } from '@angular/common/http';
// import { ComunService } from './services/comun.service';
import { ConfigService } from './services/config.service';
import { CookieService } from 'ng2-cookies';
import { IpServiceService } from './services/ip-service.service';

/* Components */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';  // Componente Cabecera
import { HomeComponent } from './components/home/home.component';        // Componente por defecto
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';  // Componente Pie



@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, FooterComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    // AuthTokenService,
    // ComunService,
    HttpClient,
    CookieService,
    ConfigService,
    IpServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
