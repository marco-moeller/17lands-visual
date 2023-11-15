import axios from "axios";

const BASE_URL = "https://www.17lands.com";
const EXPENSION = "card_ratings/data?expansion=";
const FORMAT = "&format=";
const START_DATE = "&start_date=";
const END_DATE = "&end-date=";

const client = axios.create({ baseURL: BASE_URL });

export const getCardRatings = async (expansion, format, start, end) => {
  const { data } = await client.get(
    EXPENSION +
      expansion +
      FORMAT +
      format +
      START_DATE +
      start +
      END_DATE +
      end
  );
  return data;
};
