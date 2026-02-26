import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GET_ANNONCES,
  GET_ANNONCE_BY_ID,
  GET_ANNONCES_BY_CATEGORY,
  GET_ANNONCES_BY_STATUS,
  GET_ANNONCES_BY_OWNER_ID,
} from '../graphql/annonce.query';

export interface Location {
  lat: number;
  lng: number;
  addr: string;
}

export interface Owner {
  id: number;
  displayName: string;
  email?: string;
  points?: number;
  badges?: string[];
}

export interface AnnonceData {
  id: number;
  ownerId: number;
  title: string;
  description?: string;
  category?: string;
  photos: string[];
  location?: Location;
  status: string; // 'expired', 'pending', 'unavailable'
  suggestedCategory?: string[];
  fraudScore?: number;
  createdAt: string;
  expiresAt?: string;
  quantity?: number;
  priceType: string; // 'free', 'unit', 'bulk'
  priceAmount?: number;
  owner?: Owner;
}

@Injectable({ providedIn: 'root' })
export class AnnonceDataService {
  constructor(private apollo: Apollo) {}

  getAnnonces(): Observable<AnnonceData[]> {
    return this.apollo
      .watchQuery({
        query: GET_ANNONCES,
      })
      .valueChanges.pipe(
        map((result: any) => {
          console.log('GraphQL Response:', result);
          return result.data?.annonces || [];
        })
      );
  }

  getAnnonceById(id: number): Observable<AnnonceData> {
    return this.apollo
      .watchQuery({
        query: GET_ANNONCE_BY_ID,
        variables: { id },
      })
      .valueChanges.pipe(map((result: any) => result.data?.annonce));
  }

  getAnnoncesByCategory(category: string): Observable<AnnonceData[]> {
    return this.apollo
      .watchQuery({
        query: GET_ANNONCES_BY_CATEGORY,
        variables: { category },
      })
      .valueChanges.pipe(map((result: any) => result.data?.annoncesByCategory || []));
  }

  getAnnoncesByStatus(status: string): Observable<AnnonceData[]> {
    return this.apollo
      .watchQuery({
        query: GET_ANNONCES_BY_STATUS,
        variables: { status },
      })
      .valueChanges.pipe(map((result: any) => result.data?.annoncesByStatus || []));
  }

  getAnnoncesByOwnerId(ownerId: number): Observable<AnnonceData[]> {
    return this.apollo
      .watchQuery({
        query: GET_ANNONCES_BY_OWNER_ID,
        variables: { ownerId },
      })
      .valueChanges.pipe(map((result: any) => result.data?.annoncesByOwnerId || []));
  }
}
