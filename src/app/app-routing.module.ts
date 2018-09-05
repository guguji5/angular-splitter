import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TamSplitterComponent } from './components/tam-splitter/tam-splitter.component';
import { SimpleSplitterComponent } from './pages/simple-splitter/simple-splitter.component';
import { NestedSplitterComponent } from './pages/nested-splitter/nested-splitter.component';

const routes: Routes = [
  { path: 'simple', component: SimpleSplitterComponent },
  { path: 'nested', component: NestedSplitterComponent },
  { path: '', component: SimpleSplitterComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
