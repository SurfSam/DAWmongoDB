import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { NodeCardComponent } from './components/node-card/node-card.component';

import { HttpClientModule } from '@angular/common/http';
import { TableContainerComponent } from './components/table-container/table-container.component';

@NgModule({
  declarations: [
    AppComponent,
    CardContainerComponent,
    NodeCardComponent,
    TableContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
