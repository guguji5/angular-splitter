import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleSplitterComponent } from './pages/simple-splitter/simple-splitter.component';
import { NestedSplitterComponent } from './pages/nested-splitter/nested-splitter.component';
import { MacNotesSplitterComponent } from './pages/mac-notes-splitter/mac-notes-splitter.component';

const routes: Routes = [
  { path: 'simple', component: SimpleSplitterComponent },
  { path: 'nested', component: NestedSplitterComponent },
  { path: 'macnotes', component: MacNotesSplitterComponent },
  { path: '', redirectTo: '/simple', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
