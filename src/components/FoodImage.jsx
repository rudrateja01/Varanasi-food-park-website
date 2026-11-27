
import { useEffect, useState } from "react";

// Category fallback images
const CATEGORY_FALLBACK = {
  "Tiffins & Breakfast": "/menu/category-breakfast.jpg",
  "Pesarattu Specials": "/menu/category-breakfast.jpg",
  "Regular Dosas": "/menu/category-tiffin.jpg",
  "Special Dosas": "/menu/category-tiffin.jpg",
  "Lunch": "/menu/category-lunch.jpg",
  "Sunday Specials": "/menu/category-lunch.jpg",
  "Evening Snacks": "/menu/category-snacks.jpg",
  "Evening Special (Non-Veg)": "/menu/category-evening-special.jpg",
  "Beverages": "/menu/category-tea.jpg",
  "Extras": "/menu/category-tiffin.jpg"
};

const GENERIC_FALLBACK = "/Logo.jpg";

export default function FoodImage({ item, alt, ...props }) {
  const [stage, setStage] = useState(0);

  // Reset fallback whenever the dish or its image changes.
  useEffect(() => {
    setStage(0);
  }, [item?.id, item?.image, item?.category]);

  const sources = [
    item?.image,
    CATEGORY_FALLBACK[item?.category],
    GENERIC_FALLBACK
  ].filter(Boolean);

  const currentSrc = sources[Math.min(stage, sources.length - 1)];

  const handleImageError = () => {
    setStage((current) =>
      Math.min(current + 1, sources.length - 1)
    );
  };

  return (
    <img
      src={currentSrc}
      alt={alt || item?.name || "Food item"}
      loading="lazy"
      decoding="async"
      data-stand-in={stage > 0 ? "true" : undefined}
      onError={handleImageError}
      {...props}
    />
  );
}
