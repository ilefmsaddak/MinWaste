import { Component, Input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnonceDataService, AnnonceData } from '../../services/annonce-data.service';

@Component({
  selector: 'app-annonce-cards',
  imports: [CommonModule],
  templateUrl: './annonce-cards.html',
  styleUrl: './annonce-cards.scss',
})
export class AnnonceCards implements OnInit {
  @Input() sectionTitle: string = 'Announcements';
  @Input() sectionId: string = '';
  
  annonces = signal<AnnonceData[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private annonceDataService: AnnonceDataService) {}

  ngOnInit() {
    this.loadAnnonces();
  }

  loadAnnonces() {
    this.isLoading.set(true);
    this.error.set(null);

    console.log('📡 Fetching announcements from GraphQL...');

    this.annonceDataService.getAnnonces().subscribe({
      next: (data) => {
        console.log('✅ Announcements loaded:', data);
        this.annonces.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('❌ Error loading annonces:', err);
        console.error('Error message:', err.message);
        console.error('Network error:', err.networkError);
        console.error('GraphQL errors:', err.graphQLErrors);
        
        this.error.set(`Failed to load announcements: ${err.message || 'Unknown error'}`);
        this.isLoading.set(false);
      },
    });
  }

  getPhotoUrl(photos: string[]): string {
    return photos && photos.length > 0 ? photos[0] : 'assets/placeholder.jpg';
  }

  getStatusBadgeClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'pending': 'Available',
      'expired': 'Expired',
      'unavailable': 'Unavailable'
    };
    return labels[status.toLowerCase()] || status;
  }

  getPriceLabel(priceType: string): string {
    const labels: { [key: string]: string } = {
      'free': 'Free',
      'unit': 'Per unit',
      'bulk': 'In bulk'
    };
    return labels[priceType.toLowerCase()] || priceType;
  }

  isExpiringSoon(expiresAtDate?: string): boolean {
    if (!expiresAtDate) return false;
    const expiry = new Date(expiresAtDate);
    const now = new Date();
    const hoursUntilExpiry = (expiry.getTime() - now.getTime()) / 3600000;
    return hoursUntilExpiry <= 24 && hoursUntilExpiry > 0;
  }

  isExpired(expiresAtDate?: string): boolean {
    if (!expiresAtDate) return false;
    const expiry = new Date(expiresAtDate);
    return expiry < new Date();
  }

  getExpiryLabel(expiresAtDate?: string): string {
    if (!expiresAtDate) return '';
    const expiry = new Date(expiresAtDate);
    const now = new Date();
    const diffHours = Math.floor((expiry.getTime() - now.getTime()) / 3600000);
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 0) return 'Expired';
    if (diffHours < 1) return 'Expires in < 1h';
    if (diffHours < 24) return `Expires in ${diffHours}h`;
    return `Expires in ${diffDays}d`;
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  }
}
