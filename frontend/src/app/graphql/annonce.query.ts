import { gql } from 'apollo-angular';

export const GET_ANNONCES = gql`
  query GetAnnonces {
    annonces {
      id
      ownerId
      title
      description
      category
      photos
      location {
        lat
        lng
        addr
      }
      status
      suggestedCategory
      fraudScore
      createdAt
      expiresAt
      quantity
      priceType
      priceAmount
      owner {
        id
        displayName
        email
        points
        badges
      }
    }
  }
`;

export const GET_ANNONCE_BY_ID = gql`
  query GetAnnonce($id: Int!) {
    annonce(id: $id) {
      id
      ownerId
      title
      description
      category
      photos
      location {
        lat
        lng
        addr
      }
      status
      suggestedCategory
      fraudScore
      createdAt
      expiresAt
      quantity
      priceType
      priceAmount
      owner {
        id
        displayName
        email
        points
        badges
      }
    }
  }
`;

export const GET_ANNONCES_BY_CATEGORY = gql`
  query GetAnnoncesByCategory($category: String!) {
    annoncesByCategory(category: $category) {
      id
      ownerId
      title
      description
      category
      photos
      location {
        lat
        lng
        addr
      }
      status
      suggestedCategory
      fraudScore
      createdAt
      expiresAt
      quantity
      priceType
      priceAmount
      owner {
        id
        displayName
        email
        points
        badges
      }
    }
  }
`;

export const GET_ANNONCES_BY_STATUS = gql`
  query GetAnnoncesByStatus($status: String!) {
    annoncesByStatus(status: $status) {
      id
      ownerId
      title
      description
      category
      photos
      location {
        lat
        lng
        addr
      }
      status
      suggestedCategory
      fraudScore
      createdAt
      expiresAt
      quantity
      priceType
      priceAmount
      owner {
        id
        displayName
        email
        points
        badges
      }
    }
  }
`;

export const GET_ANNONCES_BY_OWNER_ID = gql`
  query GetAnnoncesByOwnerId($ownerId: Int!) {
    annoncesByOwnerId(ownerId: $ownerId) {
      id
      ownerId
      title
      description
      category
      photos
      location {
        lat
        lng
        addr
      }
      status
      suggestedCategory
      fraudScore
      createdAt
      expiresAt
      quantity
      priceType
      priceAmount
      owner {
        id
        displayName
        email
        points
        badges
      }
    }
  }
`;
