import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { AnnonceData, AnnonceDataService } from '../../services/annonce-data.service';

@Component({
  selector: 'app-annonce-detail',
  imports: [CommonModule, NavBar],
  templateUrl: './annonce-detail.html',
  styleUrl: './annonce-detail.scss',
})
export class AnnonceDetail implements OnInit, OnDestroy {
  annonce: AnnonceData | null = null;
  selectedPhotoIndex = 0;
  isLoading = false;
  error: string | null = null;

  private routeSubscription: Subscription | null = null;
  private annonceSubscription: Subscription | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly annonceDataService: AnnonceDataService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      const id = idParam ? Number(idParam) : Number.NaN;

      if (!Number.isInteger(id) || id <= 0) {
        this.error = 'Invalid annonce id.';
        this.annonce = null;
        this.isLoading = false;
        return;
      }

      this.loadAnnonce(id);
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.annonceSubscription?.unsubscribe();
  }

  loadAnnonce(id: number): void {
    this.annonceSubscription?.unsubscribe();
    this.isLoading = true;
    this.error = null;

    this.annonceSubscription = this.annonceDataService.getAnnonceById(id).subscribe({
      next: (annonce) => {
        if (annonce) {
          this.annonce = annonce;
          this.selectedPhotoIndex = 0;
          this.isLoading = false;
          return;
        }

        this.loadAnnonceFromList(id);
      },
      error: (err: unknown) => {
        console.warn('Direct annonce query failed, trying list fallback...', err);
        this.loadAnnonceFromList(id);
      },
    });
  }

  private loadAnnonceFromList(id: number): void {
    this.annonceSubscription?.unsubscribe();

    this.annonceSubscription = this.annonceDataService.getAnnonces().subscribe({
      next: (annonces) => {
        const matchedAnnonce = annonces.find((item) => Number(item.id) === Number(id)) ?? null;
        this.annonce = matchedAnnonce;
        this.selectedPhotoIndex = 0;

        if (!matchedAnnonce) {
          this.error = 'Annonce not found.';
        }

        this.isLoading = false;
      },
      error: (err: unknown) => {
        const message = err instanceof Error ? err.message : 'Unknown error';
        this.error = `Failed to load annonce: ${message}`;
        this.annonce = null;
        this.isLoading = false;
      },
    });
  }

  getPhotoUrl(photos: string[]): string {
    return photos.length > 0 ? photos[0] : 'assets/placeholder.jpg';
  }

  selectPhoto(index: number): void {
    if (!this.annonce || !this.annonce.photos || index < 0 || index >= this.annonce.photos.length) {
      return;
    }

    this.selectedPhotoIndex = index;
  }

  getSelectedPhoto(): string {
    if (!this.annonce) {
      return 'assets/placeholder.jpg';
    }

    if (!this.annonce.photos || this.annonce.photos.length === 0) {
      return 'assets/placeholder.jpg';
    }

    return this.annonce.photos[this.selectedPhotoIndex] ?? this.annonce.photos[0];
  }

  getEffectiveStatus(annonce: AnnonceData): string {
    if (annonce.expiresAt) {
      const expiresAt = new Date(annonce.expiresAt);
      if (!Number.isNaN(expiresAt.getTime()) && expiresAt.getTime() < Date.now()) {
        return 'expired';
      }
    }

    return annonce.status.toLowerCase();
  }

  getStatusClass(annonce: AnnonceData): string {
    return `status-${this.getEffectiveStatus(annonce)}`;
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: 'Available',
      expired: 'Expired',
      unavailable: 'Unavailable',
    };

    return labels[status.toLowerCase()] ?? status;
  }

  getPriceLabel(priceType: string): string {
    const labels: Record<string, string> = {
      free: 'Free',
      unit: 'Per unit',
      bulk: 'In bulk',
    };

    return labels[priceType.toLowerCase()] ?? priceType;
  }

  getFraudLevel(fraudScore?: number): string {
    if (fraudScore === undefined || fraudScore === null) {
      return 'Unknown';
    }

    if (fraudScore < 20) {
      return 'Low';
    }

    if (fraudScore < 60) {
      return 'Medium';
    }

    return 'High';
  }

  getFraudPercent(fraudScore?: number): number {
    if (fraudScore === undefined || fraudScore === null) {
      return 0;
    }

    return Math.max(0, Math.min(100, Number(fraudScore)));
  }

  orderAnnonce(): void {
    if (!this.annonce) {
      return;
    }

    this.router.navigate(['/messages'], {
      queryParams: {
        action: 'order',
        annonceId: this.annonce.id,
        ownerId: this.annonce.ownerId,
      },
    });
  }

  contactOwner(): void {
    if (!this.annonce) {
      return;
    }

    const ownerEmail = this.annonce.owner?.email;
    if (ownerEmail) {
      const subject = encodeURIComponent(`About annonce #${this.annonce.id}: ${this.annonce.title}`);
      const body = encodeURIComponent('Hi, I am interested in your annonce.');
      window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
      return;
    }

    this.router.navigate(['/messages'], {
      queryParams: {
        action: 'contact',
        annonceId: this.annonce.id,
        ownerId: this.annonce.ownerId,
      },
    });
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    }

    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }

    return `${diffDays}d ago`;
  }
}
