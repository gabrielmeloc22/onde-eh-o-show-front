import { faker } from "@faker-js/faker";
import { graphql } from "msw";
import type { Event } from "../types";

const data: Event[] = new Array(15).fill(null).map(() => {
  const date = faker.date.future();
  return {
    id: faker.random.alphaNumeric(7),
    name: faker.lorem.words(3),
    link: faker.internet.url(),
    date,
    price: Number(faker.finance.amount(200, 1000, 2)),
    purchaseDueDate: faker.date.future(1, date),
    venue: faker.address.cityName(),
    artists: new Array(faker.datatype.number({ min: 1, max: 10 })).fill(null).map(() => ({
      id: faker.datatype.boolean() as any,
    })),
  };
});

export const eventsByArtist = [
  graphql.query("GetEventsByArtist", async (req, res, ctx) => {
    const artistsEvents = data.filter(({ artists }) => artists.filter(({ id }) => id));

    return res(ctx.data({ eventsByArtist: artistsEvents }));
  }),
];
