export type Artist = {
  id: string
  name?: string
  image?: string
  events?: Event[]
}

export type Event = {
  id: string;
  name: string;
  link: string;
  date: Date;
  price: number;
  purchaseDueDate: Date;
  venue: string;
  artists: Artist[];
};
