import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  userMenuOpen = signal(false);

  navItems = [
    { label: 'Home', route: '/', icon: 'home' },
    { label: 'Map', route: '/map', icon: 'map' },
    { label: 'Sell', route: '/sell', icon: 'add' },
    { label: 'Messages', route: '/messages', icon: 'message' }
  ];

  toggleUserMenu() {
    this.userMenuOpen.set(!this.userMenuOpen());
  }

  getIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      home: '🏠',
      map: '🗺️',
      add: '➕',
      message: '💬',
      profile: '👤',
      settings: '⚙️',
      logout: '🚪'
    };
    return icons[iconName] || '•';
  }
}
