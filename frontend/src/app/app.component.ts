import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  isModalOpen = false;

  constructor(private router: Router) {

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
          this.isModalOpen = event.url.includes('modal') && !event.url.includes('redirectTo');
      }
    });
    
  }

  navigateToForm() {
    this.router.navigate([{outlets: {modal: `form`}}]) 
  }

  navigateToList() {
    this.router.navigate([{outlets: {modal: null}}]).then(
      () => this.router.navigate(['list'])
    )
  }
}