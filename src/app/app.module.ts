import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BoardComponent } from './components/board/board.component';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './containers/app.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, BoardComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
