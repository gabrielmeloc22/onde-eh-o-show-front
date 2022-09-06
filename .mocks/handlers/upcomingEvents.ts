import { faker } from "@faker-js/faker";
import { graphql } from "msw";
import { Event } from "../types";

const data = (): Omit<Event, "artists"> => {
  const date = faker.date.future();
  return {
    id: faker.random.alphaNumeric(7),
    name: faker.lorem.words(3),
    link: faker.internet.url(),
    date,
    price: Number(faker.finance.amount(200, 1000, 2)),
    purchaseDueDate: faker.date.future(1, date),
    venue: faker.address.cityName(),
  };
};

export const getUpcomingEvent = [
  graphql.query("GetUpcomingEvent", async (req, res, ctx) => {
    const { artistId } = req.variables;
    const noEvents = faker.datatype.boolean();

    return res(ctx.data({ upcomingEvent: noEvents === true ? data() : null }));
  }),
];
