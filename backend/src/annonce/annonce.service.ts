import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AnnonceStatus } from '@prisma/client';

@Injectable()
export class AnnonceService {
  constructor(private prisma: PrismaService) {}

  private transformAnnonce(annonce: any) {
    if (!annonce) return null;
    return {
      ...annonce,
      fraudScore: annonce.fraudScore ? parseFloat(annonce.fraudScore.toString()) : null,
      priceAmount: annonce.priceAmount ? parseFloat(annonce.priceAmount.toString()) : null,
    };
  }

  async findAll() {
    const annonces = await this.prisma.annonce.findMany({
      include: {
        owner: {
          select: {
            id: true,
            displayName: true,
            email: true,
            points: true,
            badges: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return annonces.map(a => this.transformAnnonce(a));
  }

  async findOne(id: number) {
    const annonce = await this.prisma.annonce.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            displayName: true,
            email: true,
            points: true,
            badges: true,
          },
        },
      },
    });
    return this.transformAnnonce(annonce);
  }

  async findByCategory(category: string) {
    const annonces = await this.prisma.annonce.findMany({
      where: { category },
      include: {
        owner: {
          select: {
            id: true,
            displayName: true,
            email: true,
            points: true,
            badges: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return annonces.map(a => this.transformAnnonce(a));
  }

  async findByStatus(status: AnnonceStatus) {
    const annonces = await this.prisma.annonce.findMany({
      where: { status },
      include: {
        owner: {
          select: {
            id: true,
            displayName: true,
            email: true,
            points: true,
            badges: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return annonces.map(a => this.transformAnnonce(a));
  }

  async findByOwnerId(ownerId: number) {
    const annonces = await this.prisma.annonce.findMany({
      where: { ownerId },
      include: {
        owner: {
          select: {
            id: true,
            displayName: true,
            email: true,
            points: true,
            badges: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return annonces.map(a => this.transformAnnonce(a));
  }
}
