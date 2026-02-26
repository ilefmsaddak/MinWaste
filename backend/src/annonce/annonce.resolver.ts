import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { AnnonceService } from './annonce.service';
import { Annonce } from './annonce.entity';
import { AnnonceStatus } from '@prisma/client';

@Resolver(() => Annonce)
export class AnnonceResolver {
  constructor(private annonceService: AnnonceService) {}

  @Query(() => [Annonce], { name: 'annonces' })
  async getAnnonces() {
    return this.annonceService.findAll();
  }

  @Query(() => Annonce, { nullable: true, name: 'annonce' })
  async getAnnonce(@Args('id', { type: () => Int }) id: number) {
    return this.annonceService.findOne(id);
  }

  @Query(() => [Annonce], { name: 'annoncesByCategory' })
  async getAnnoncesByCategory(@Args('category') category: string) {
    return this.annonceService.findByCategory(category);
  }

  @Query(() => [Annonce], { name: 'annoncesByStatus' })
  async getAnnoncesByStatus(@Args('status') status: AnnonceStatus) {
    return this.annonceService.findByStatus(status);
  }

  @Query(() => [Annonce], { name: 'annoncesByOwnerId' })
  async getAnnoncesByOwnerId(@Args('ownerId', { type: () => Int }) ownerId: number) {
    return this.annonceService.findByOwnerId(ownerId);
  }
}
