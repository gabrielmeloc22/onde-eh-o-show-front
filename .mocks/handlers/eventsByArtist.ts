import { faker } from "@faker-js/faker";
import Leite from "leite";
import { graphql } from "msw";
import type { Event } from "../types";

const leite = new Leite();

const data: Event[] = new Array(10).fill(null).map((_, i) => {
  const date = faker.date.future();
  return {
    id: faker.random.alphaNumeric(7),
    name: faker.lorem.words(3),
    link: faker.internet.url(),
    date,
    price: Number(faker.finance.amount(200, 1000, 2)),
    purchaseDueDate: faker.date.future(1, date),
    venue: leite.localizacao.cidade(),
    artists: [
      {
        id: (i + 1).toString(),
      },
    ],
  };
});

export const eventsByArtist = [
  graphql.query("GetEventsByArtist", async (req, res, ctx) => {
    const { artistId } = req.variables;
    console.log(artistId);

    const artistsEvents = data.filter(
      ({ artists }) => artists.filter(({ id }) => id === artistId).length > 0
    );

    return res(ctx.data({ eventsByArtist: artistsEvents }));
  }),
];
