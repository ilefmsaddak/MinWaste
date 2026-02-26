import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AnnonceModule } from './annonce/annonce.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      path: '/graphql',
      context: ({ req }) => ({ req }),
      introspection: true,
      playground: true,
      formatError: (error) => {
        console.error('❌ GraphQL Error:', error.message);
        console.error('Error details:', error);
        return error;
      },
    }),
    PrismaModule,
    AnnonceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
