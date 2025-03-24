import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http'

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaturamentosModule } from '../app/faturamentos/faturamentos.module';
import { CoreModule } from '../app/core/core.module';
import { SecurityModule } from '../app/security/security.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,
    HttpClientModule,
    
    FaturamentosModule,
    CoreModule,
    SecurityModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                  darkModeSelector: '.my-app-dark'
                }
            }
        })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
