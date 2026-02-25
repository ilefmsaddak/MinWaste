import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Annonce {
  id: number;
  title: string;
  description: string;
  category: string;
  photo: string;
  location: {
    lat: number;
    lng: number;
    addr: string;
  };
  status: 'expired' | 'available' | 'unavailable';
  priceType: 'free' | 'unit' | 'bulk';
  priceAmount: number;
  quantity: number;
  createdAt: string;
  owner: {
    name: string;
    rating: number;
    totalRatings: number;
  };
  expiryDate?: string;
}

@Component({
  selector: 'app-annonce-cards',
  imports: [CommonModule],
  templateUrl: './annonce-cards.html',
  styleUrl: './annonce-cards.scss',
})
export class AnnonceCards {
  @Input() sectionTitle: string = 'Announcements';
  @Input() sectionId: string = '';
  annonces = signal<Annonce[]>([
  {
    id: 2,
    title: 'Fresh Sandwiches & Salads',
    description: 'Prepared this morning, still fresh! Selling at a low price to avoid food waste before closing time.',
    category: 'Food',
    photo: 'assets/sandwish.jpg',
    location: { lat: 36.79, lng: 10.16, addr: 'Tunis, Tunisia' },
    status: 'available',
    priceType: 'unit',
    priceAmount: 1,
    quantity: 8,
    createdAt: '2026-02-25T09:15:00Z',

    owner: {
      name: 'Ahmed B.',
      rating: 4.8,
      totalRatings: 37
    },

    expiryDate: '2026-02-26T18:00:00Z'
  },

  {
    id: 3,
    title: 'Clothing - Good Condition',
    description: 'Gently used clothes in good condition. Giving them away instead of throwing them — hope someone can benefit!',
    category: 'Clothing',
    photo: 'assets/dress.jpg',
    location: { lat: 36.81, lng: 10.12, addr: 'Ariana, Tunisia' },
    status: 'available',
    priceType: 'free',
    priceAmount: 0,
    quantity: 1,
    createdAt: '2026-02-24T14:20:00Z',

    owner: {
      name: 'Meriem T.',
      rating: 4.6,
      totalRatings: 22
    }
  },

  {
    id: 5,
    title: 'Rice Bag 5kg',
    description: '5kg rice bag, close to expiry but perfectly fine. Selling at a reduced price instead of wasting it.',
    category: 'Food',
    photo: 'assets/rice.jpg',
    location: { lat: 36.75, lng: 10.09, addr: 'Ariana, Tunisia' },
    status: 'available',
    priceType: 'unit',
    priceAmount: 2.0,
    quantity: 5,
    createdAt: '2026-02-25T08:00:00Z',

    owner: {
      name: 'Karim H.',
      rating: 4.9,
      totalRatings: 54
    },

    expiryDate: '2026-03-02T00:00:00Z'
  },

  {
    id: 7,
    title: 'Mixed Shoes Lot',
    description: 'Mixed shoes (some new, some lightly used). Selling as a bundle at a low price to clear space.',
    category: 'Clothing',
    photo: 'assets/shoes.avif',
    location: { lat: 36.8, lng: 10.1, addr: 'Tunis, Tunisia' },
    status: 'available',
    priceType: 'bulk',
    priceAmount: 50.0,
    quantity: 1,
    createdAt: '2026-02-25T06:45:00Z',

    owner: {
      name: 'Hatem D.',
      rating: 4.3,
      totalRatings: 18
    }
  },
  {
    id: 7,
    title: 'Mixed Shoes Lot',
    description: 'Mixed shoes (some new, some lightly used). Selling as a bundle at a low price to clear space.',
    category: 'Clothing',
    photo: 'assets/shoes.avif',
    location: { lat: 36.8, lng: 10.1, addr: 'Tunis, Tunisia' },
    status: 'available',
    priceType: 'bulk',
    priceAmount: 50.0,
    quantity: 1,
    createdAt: '2026-02-25T06:45:00Z',

    owner: {
      name: 'Hatem D.',
      rating: 4.3,
      totalRatings: 18
    }
  }
]);

  getStatusBadgeClass(status: string): string {
    return `status-${status}`;
  }

  getPriceLabel(priceType: string): string {
    const labels: { [key: string]: string } = {
      'free': 'Free',
      'unit': 'Per unit',
      'bulk': 'In bulk'
    };
    return labels[priceType] || priceType;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'available': 'Available',
      'expired': 'Expired',
      'unavailable': 'Unavailable'
    };
    return labels[status] || status;
  }

  isExpiringSoon(expiryDate?: string): boolean {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const hoursUntilExpiry = (expiry.getTime() - now.getTime()) / 3600000;
    return hoursUntilExpiry <= 24 && hoursUntilExpiry > 0;
  }

  isExpired(expiryDate?: string): boolean {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    return expiry < new Date();
  }

  getExpiryLabel(expiryDate?: string): string {
    if (!expiryDate) return '';
    const expiry = new Date(expiryDate);
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
