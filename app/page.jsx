"use client";

import { getCardRatings } from "@/API/17lands";
import FilterButtons from "@/components/FilterButtons";
import Loading from "@/components/Loading";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [rarityFilter, setRarityFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [expansions, setExpansions] = useState([]);
  const [selectedExpansion, setSeletedExpansion] = useState("WOE");
  const [loading, setLoading] = useState(false);

  const sortByGIHWR = (array) => {
    return array.sort((a, b) => b.ever_drawn_win_rate - a.ever_drawn_win_rate);
  };

  const filterByColor = (array) => {
    if (array.length === 0 || colorFilter.length === 0) {
      return array;
    }

    return array.filter((card) => isColor(card.color));
  };

  const filterByRarity = (array) => {
    if (array.length === 0 || rarityFilter.length === 0) {
      return array;
    }
    return array.filter((card) => isRarity(card.rarity));
  };

  const isColor = (cardColor) => {
    const colorShorts = {
      W: "white",
      U: "blue",
      B: "black",
      R: "red",
      G: "green",
    };
    if (cardColor === "") {
      return colorFilter.indexOf("colorless") >= 0;
    }
    if (cardColor.length === 1) {
      return colorFilter.indexOf(colorShorts[cardColor]) >= 0;
    }
    if (cardColor.length > 1) return colorFilter.indexOf("multicolor") >= 0;
  };

  const isRarity = (rarity) => {
    return rarityFilter.indexOf(rarity) >= 0;
  };

  const toggleRarityFilter = (rarity) => {
    setRarityFilter((prevState) =>
      rarityFilter.indexOf(rarity) < 0
        ? [...prevState, rarity]
        : prevState.filter((oldRarity) => oldRarity !== rarity)
    );
  };

  const toggleColorFilter = (color) => {
    setColorFilter((prevState) =>
      colorFilter.indexOf(color) < 0
        ? [...prevState, color]
        : prevState.filter((oldColor) => oldColor !== color)
    );
  };

  const handleChange = (event) => {
    setSeletedExpansion(event.target.value);
  };

  function getCurrentDate() {
    const today = new Date();

    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = today.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  useEffect(() => {
    const applyFilter = () => {
      setFilteredCards(filterByRarity(filterByColor(cards)));
    };
    applyFilter();
  }, [rarityFilter, colorFilter]);

  useEffect(() => {
    setCards([]);
    setFilteredCards([]);
    setColorFilter([]);
    setRarityFilter([]);
    const fetchCards = async () => {
      setCards(
        await getCardRatings(
          selectedExpansion,
          "PremierDraft",
          "2022-01-01",
          getCurrentDate()
        )
      );
      setLoading(false);
    };
    setLoading(true);
    fetchCards();
  }, [selectedExpansion]);

  useEffect(() => {
    setFilteredCards(cards);
  }, [cards]);

  useEffect(() => {
    fetch("https://www.17lands.com/data/expansions", {
      header: { Accept: "text/html" },
    })
      .then((response) => response.json())
      .then((data) => setExpansions(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      <nav>
        <select value={selectedExpansion} onChange={handleChange}>
          <option value="">-- select Expansion --</option>
          {expansions.map((expansion) => (
            <option key={nanoid()} value={expansion}>
              {expansion}
            </option>
          ))}
        </select>
      </nav>
      <FilterButtons
        toggleColorFilter={toggleColorFilter}
        toggleRarityFilter={toggleRarityFilter}
        rarityFilter={rarityFilter}
        colorFilter={colorFilter}
      />
      {loading && <Loading />}
      <section>
        {sortByGIHWR(filteredCards).map((card) => {
          return (
            <div className="card-container" key={nanoid()}>
              <h2 className="win-rate">
                {(card.ever_drawn_win_rate * 100).toFixed(2)}%
              </h2>
              <img className="card-img" src={card.url} alt="card" />
            </div>
          );
        })}
      </section>
    </main>
  );
}
