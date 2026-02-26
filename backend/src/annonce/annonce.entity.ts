import { ObjectType, Field, Float, Int, registerEnumType } from '@nestjs/graphql';
import { AnnonceStatus, PriceType } from '@prisma/client';

// Register Prisma enums for GraphQL
registerEnumType(AnnonceStatus, {
  name: 'AnnonceStatus',
});

registerEnumType(PriceType, {
  name: 'PriceType',
});

@ObjectType()
export class Location {
  @Field()
  lat: number;

  @Field()
  lng: number;

  @Field()
  addr: string;
}

@ObjectType()
export class Owner {
  @Field(() => Int)
  id: number;

  @Field()
  displayName: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => Int, { nullable: true })
  points?: number;

  @Field(() => [String], { nullable: true })
  badges?: string[];
}

@ObjectType()
export class Annonce {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  ownerId: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  category?: string;

  @Field(() => [String])
  photos: string[];

  @Field(() => Location, { nullable: true })
  location?: Location;

  @Field(() => AnnonceStatus)
  status: AnnonceStatus;

  @Field(() => [String], { nullable: true })
  suggestedCategory?: string[];

  @Field(() => Float, { nullable: true })
  fraudScore?: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  expiresAt?: Date;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => PriceType)
  priceType: PriceType;

  @Field(() => Float, { nullable: true })
  priceAmount?: number;

  @Field(() => Owner, { nullable: true })
  owner?: Owner;
}
