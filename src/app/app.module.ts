import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ZJMYUtilModule } from '@zjmy/util';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ZJMYUtilModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
