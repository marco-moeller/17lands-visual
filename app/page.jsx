"use client";

import { getCardRatings } from "@/API/17lands";
import FilterButtons from "@/components/FilterButtons";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import { expansionsData } from "@/data/expansions";
import { formatsData } from "@/data/formats";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [rarityFilter, setRarityFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const expansions = expansionsData;
  const [selectedExpansion, setSelectedExpansion] = useState(expansions[0]);
  const formats = formatsData;
  const [selectedFormat, setSelectedFormat] = useState(
    formats[0] || PremierDraft
  );
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
      G: "green"
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

  const handleExpansionChange = (event) => {
    setSelectedExpansion(event.target.value);
  };

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
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
          selectedFormat,
          "2019-01-01",
          getCurrentDate()
        )
      );
      setLoading(false);
    };
    setLoading(true);
    fetchCards();
  }, [selectedExpansion, selectedFormat]);

  useEffect(() => {
    setFilteredCards(cards);
  }, [cards]);

  return (
    <main>
      <nav>
        <select value={selectedExpansion} onChange={handleExpansionChange}>
          <option value="">-- Select Expansion --</option>
          {expansions.map((expansion) => (
            <option key={nanoid()} value={expansion}>
              {expansion}
            </option>
          ))}
        </select>
        <select value={selectedFormat} onChange={handleFormatChange}>
          <option value="">-- Select Format --</option>
          {formats.map((format) => (
            <option key={nanoid()} value={format}>
              {format}
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
