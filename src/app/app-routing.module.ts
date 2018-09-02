import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TamSplitterComponent } from './components/tam-splitter/tam-splitter.component';

const routes: Routes = [
  { path: 'layout', component: TamSplitterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
