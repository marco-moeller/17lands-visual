import { colorsData } from "@/data/colors";
import { nanoid } from "nanoid";

const RARITIES = ["common", "uncommon", "rare", "mythic"];
const COLORS = colorsData;

const FilterButtons = ({
  toggleRarityFilter,
  toggleColorFilter,
  colorFilter,
  rarityFilter,
}) => {
  const getRarityButtonClass = (rarity) => {
    return rarityFilter.indexOf(rarity) >= 0 ? "selected" : "unselected";
  };

  const getColorButtonClass = (color) => {
    return colorFilter.indexOf(color) >= 0 ? "selected" : "unselected";
  };

  return (
    <div className="filter-buttons">
      <div className="rarity-btns btns">
        {RARITIES.map((rarity) => (
          <button
            className={"btn filter " + getRarityButtonClass(rarity)}
            onClick={() => toggleRarityFilter(rarity)}
            key={nanoid()}
          >
            {rarity}
          </button>
        ))}
      </div>
      <div className="color-btns btns">
        {COLORS.map((color) => (
          <button
            className={"btn filter " + getColorButtonClass(color.name)}
            onClick={() => toggleColorFilter(color.name)}
            key={nanoid()}
          >
            {color.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
