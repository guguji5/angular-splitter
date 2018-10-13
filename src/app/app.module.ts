import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { TamSplitterComponent } from './components/tam-splitter/tam-splitter.component';
import { TamSplitterPanelComponent } from './components/tam-splitter-panel/tam-splitter-panel.component';
import { TamSplitterBarComponent } from './components/tam-splitter-bar/tam-splitter-bar.component';
import { SimpleSplitterComponent } from './pages/simple-splitter/simple-splitter.component';
import { NestedSplitterComponent } from './pages/nested-splitter/nested-splitter.component';
import { MacNotesSplitterComponent } from './pages/mac-notes-splitter/mac-notes-splitter.component';

@NgModule({
  declarations: [
    AppComponent,
    TamSplitterComponent,
    TamSplitterPanelComponent,
    TamSplitterBarComponent,
    SimpleSplitterComponent,
    NestedSplitterComponent,
    MacNotesSplitterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
