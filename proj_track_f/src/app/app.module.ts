import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
// import { RegisterationComponent } from './registeration/registeration.component';
import { LoginComponent } from './login/login.component';
import {MatGridListModule} from '@angular/material/grid-list'
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ProjectFormComponent,
    DashboardComponent,
    // RegisterationComponent,
    LoginComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatGridListModule,
    HttpClientModule,
    // HomepageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
  
    
 