import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PciConnectablesModule } from './pci-connectables/pci.connectables.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PciConnectablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
