import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { GedComponent } from './ged/ged.component';
import { GestdocComponent } from './gestdoc/gestdoc.component';
import { SettingsComponent } from './settings/settings.component';
import { TreeComponent } from './tree/tree.component';
import { UploadFileComponent } from './upload/upload-file/upload-file.component';

const routes : Routes = [
  { path : '', component : DashboardComponent},
  { path : 'dashboard', component : DashboardComponent},
  { path : 'tree', component : TreeComponent},
  { path : 'dragdrop', component : DragDropComponent},
  { path : 'list', component : EmployeeListComponent},
  { path : 'settings', component : SettingsComponent},
  { path : 'ged', component : GedComponent},
  { path : 'gestdoc', component : GestdocComponent},
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'upload', component: UploadFileComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
