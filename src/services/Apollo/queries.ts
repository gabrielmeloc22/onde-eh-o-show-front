import { gql } from "@apollo/client";

export const EVENTS_BY_ARTIST = gql`
  query GetEventsByArtist($artistId: String!) {
    eventsByArtist(artistId: $artistId) {
      id
      name
      link
      date
      price
      purchaseDueDate
      venue
    }
  }
`;

export const GET_UPCOMING_EVENT = gql`
  query GetUpcomingEvent($artistId: String!) {
    upcomingEvent(artistId: $artistId) {
      id
      name
      link
      date
      price
      purchaseDueDate
      venue
    }
  }
`;
