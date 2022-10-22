import { faker } from "@faker-js/faker";
import { graphql } from "msw";
import { GetUpcomingEventQuery, GetUpcomingEventQueryVariables } from "../../generated/graphql";

const data = () => {
  const date = faker.date.future().toISOString();
  return {
    id: faker.datatype.uuid(),
    name: faker.lorem.words(3),
    price: Number(faker.finance.amount(200, 1000, 2)),
    url: faker.internet.url(),
    description: faker.lorem.paragraphs(3),
    availableTickets: faker.datatype.number({ min: 0, max: 1500 }),
    date,
    venue: {
      name: faker.lorem.words(3),
      location: {
        city: faker.address.city(),
        state: faker.address.state(),
        street: faker.address.streetAddress(),
      },
    },
  };
};

export const GetUpcomingEvent = [
  graphql.query<GetUpcomingEventQuery, GetUpcomingEventQueryVariables>(
    "GetUpcomingEvent",
    (req, res, ctx) => {
      const { artistId } = req.variables;
      const noEvents = faker.datatype.boolean();
      console.log(artistId);

      return res(ctx.data({ getArtistUpcomingEvent: noEvents ? null : data() }));
    }
  ),
];
