import axios from "axios";

const BASE_URL = "https://www.17lands.com";
const EXPANSION = "card_ratings/data?expansion=";
const FORMAT = "&format=";
const START_DATE = "&start_date=";
const END_DATE = "&end-date=";

const client = axios.create({ baseURL: BASE_URL });

export const getCardRatings = async (expansion, format, start, end) => {
  try {
    const { data } = await client.get(
      EXPANSION +
        expansion +
        FORMAT +
        format +
        START_DATE +
        start +
        END_DATE +
        end
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
