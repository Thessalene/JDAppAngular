import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatButtonModule} from '@angular/material/button';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { EmployeeListComponent } from '../app/employee-list/employee-list.component';
import { NavigationComponent } from '../app/navigation/navigation.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { TreeComponent } from './tree/tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes : Routes = [
  { path : '', component : DashboardComponent},
  { path : 'dashboard', component : DashboardComponent},
  { path : 'tree', component : TreeComponent},
  { path : 'dragdrop', component : DragDropComponent},
  { path : 'list', component : EmployeeListComponent},
]

@NgModule({
  declarations: [
    AppComponent, DashboardComponent, NavigationComponent, EmployeeListComponent, TreeComponent, DragDropComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule, 
    MatButtonModule,
    MatPaginatorModule,
    MatGridListModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatMenuModule,
    LayoutModule,
    MatTreeModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
