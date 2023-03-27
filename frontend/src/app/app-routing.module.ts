import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatasafeComponent } from './datasafe/datasafe.component';
import { ModelworkspaceComponent } from './modelworkspace/modelworkspace.component';
const routes: Routes = [
  {path:'datasafe', component: DatasafeComponent},
  {path:'modelworkspace', component: ModelworkspaceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
