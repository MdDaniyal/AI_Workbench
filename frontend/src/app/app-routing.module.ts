import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatasafeComponent } from './datasafe/datasafe.component';
import { ModelworkspaceComponent } from './modelworkspace/modelworkspace.component';
import { ExpSummaryComponent } from './exp-summary/exp-summary.component';
const routes: Routes = [
  {path:'datasafe', component: DatasafeComponent},
  {path:'modelworkspace', component: ModelworkspaceComponent},
  {path: 'exp-summary', component: ExpSummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
