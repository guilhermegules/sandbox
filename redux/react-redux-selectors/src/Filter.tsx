import { useDispatch, useSelector } from "react-redux";
import { changeFilters, selectUniqueColors } from "./store/products";
import React from "react";

const Filter = () => {
  const dispatch = useDispatch();
  const colors = useSelector(selectUniqueColors);
  const [selectedColors, setSelectedColors] = React.useState(
    new Array<string>()
  );
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  React.useEffect(() => {
    dispatch(changeFilters({ name: "colors", value: selectedColors }));
  }, [dispatch, selectedColors]);

  React.useEffect(() => {
    dispatch(
      changeFilters({
        name: "price",
        value: { min: Number(minPrice), max: Number(maxPrice) },
      })
    );
  }, [dispatch, minPrice, maxPrice]);

  const handleCheckboxChange = (target: EventTarget & HTMLInputElement) => {
    if (target.checked) {
      setSelectedColors([...selectedColors, target.value]);
      return;
    }

    setSelectedColors(selectedColors.filter((color) => color !== target.value));
  };

  const handleChecked = (color: string) => selectedColors.includes(color);

  return (
    <form>
      <input
        type="number"
        value={minPrice}
        onChange={({ target }) => setMinPrice(target.value)}
        placeholder="Min"
      />
      <input
        type="number"
        value={maxPrice}
        onChange={({ target }) => setMaxPrice(target.value)}
        placeholder="Max"
      />
      <div>
        {colors.map((color) => (
          <label key={color}>
            <input
              type="checkbox"
              value={color}
              checked={handleChecked(color)}
              onChange={({ target }) => handleCheckboxChange(target)}
            />
            {color}
          </label>
        ))}
      </div>
    </form>
  );
};

export default Filter;
