import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { DatasafeComponent } from './datasafe/datasafe.component';
const routes: Routes = [
  {path:'datasafe', component: DatasafeComponent}
];
=======

const routes: Routes = [];
>>>>>>> 0d2bdccdf5fc1db72838d0533b7e40f4ac64aced

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
