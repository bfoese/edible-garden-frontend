import { Component } from '@angular/core';

import { AppNav } from './app-nav.enum';

@Component({
  selector: 'eg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public AppNav = AppNav;

  public isSidebarCollapsed = true;

  public toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
