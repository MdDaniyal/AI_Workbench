import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
<<<<<<< HEAD
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NavigatorComponent } from './navigator/navigator.component';
import { DatasafeComponent } from './datasafe/datasafe.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    DatasafeComponent,
=======
@NgModule({
  declarations: [
    AppComponent
>>>>>>> 0d2bdccdf5fc1db72838d0533b7e40f4ac64aced
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
<<<<<<< HEAD
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
=======
>>>>>>> 0d2bdccdf5fc1db72838d0533b7e40f4ac64aced
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
