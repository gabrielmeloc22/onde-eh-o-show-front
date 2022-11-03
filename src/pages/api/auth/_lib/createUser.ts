import { fetcher } from "../../../../graphql/fetcher";

type User = {
  user: { id: string } | null;
};

type UserWhereInput = {
  where: {
    spotifyId: {
      equals: string;
    };
  };
};

const createUserQuery = `
mutation CreateUser($data: UserCreateInput!) {
  createUser(data: $data) {
    id
  }
}
`;

const getUseQuery = `query GetUser($where: UserWhereInput!){
  user(where: $where) {
    id
  }
}`;

export const createUser = async (spotifyId: string) => {
  const { user } = await fetcher<User, UserWhereInput>(getUseQuery, {
    where: {
      spotifyId: {
        equals: spotifyId,
      },
    },
  })();

  const createUser = fetcher(createUserQuery, {
    data: {
      spotifyId,
    },
  });

  if (!user) {
    await createUser();
  }
};
