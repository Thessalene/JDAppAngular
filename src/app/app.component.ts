import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'JDApp';
  isShowing = true;
  isExpanded = true;
  showSubMenu = true;

  constructor() {
  }
  
  @ViewChild('drawer', { static: false }) 
  drawer: MatSidenav;


}



