import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatasafeComponent } from './datasafe/datasafe.component';
const routes: Routes = [
  {path:'datasafe', component: DatasafeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
