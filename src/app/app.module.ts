import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GiphyListComponent } from './components/giphy-list/giphy-list.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { GiphySearchEngineComponent } from './components/giphy-search-engine/giphy-search-engine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, GiphyListComponent, GiphySearchEngineComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule, NgbPaginationModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
