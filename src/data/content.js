export const MAP_URL = "https://maps.app.goo.gl/iH1xtXcvjQXDAvik8";
export const IG_URL = "https://www.instagram.com/varanasi_thefoodpark/";


export const photos = {
  // Hero section
  hero: "/Hero.jpg",

  // Food sections
  tiffin: "/Tiffin.jpg",
  breakfast: "/Breakfast.jpg",
  lunch: "/Lunch.jpg",
  juice: "/Juice.jpg",
  food: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85",

  // Restaurant ambience
  ambience: "/Media1.jpg",
  ambience2: "/Media2.jpg",
  teahut: "/Teahut2.jpg",
  outsideview: "/Courtyard.jpg",

  // Snacks and beverages
  Snacks: "/Snacks3.jpg",
  tea: "/Tea.jpg",
  newsnack: "/Snack4.jpg",

  // Restaurant and family
  family: "/Family.jpg",
  hut: "/Hut.jpg",
  freshmade: "/Freshmade.jpg",
  house: "/House.jpg",
  enterence: "/Enterence.jpg",
};


export const navLinks = [
  ["Our story", "#story"], ["Food moments", "#experiences"], ["Menu", "#menu"],
  ["Gallery", "#gallery"], ["Visit us", "#visit"]
];

export const experiences = [
  { num: "01", title: "Morning tiffins", desc: "A delicious start to your day.", img: photos.breakfast, className: "exp-tall", icon: "soup" },
  { num: "02", title: "Tea & refreshment", desc: "Pause, sip, and slow down.", img: photos.teahut, className: "", icon: "coffee" },
  { num: "03", title: "Lunch", desc: "Make room for a satisfying meal.", img: photos.lunch, className: "exp-tall", icon: "utensils" },
  { num: "04", title: "Evening snacks", desc: "Little bites. Big happiness.", img: photos.Snacks, className: "", icon: "heart" },
  { num: "05", title: "Juices & dinner", desc: "Fresh sips and relaxed evenings.", img: photos.juice, className: "", icon: "glass" }
];

export const menuCategories = ["Breakfast & tiffins", "Tea & coffee", "Lunch", "Snacks", "Fresh juices", "Dinner"];

export const reasons = [
  { icon: "clock", title: "All-day food moments", desc: "From morning refreshments to lunch, snacks, juices and dinner." },
  { icon: "heart", title: "A place to unwind", desc: "A welcoming stop to pause, relax and enjoy your food moments." },
  { icon: "utensils", title: "Something for every craving", desc: "Explore different food and refreshment categories throughout the day." },
  { icon: "pin", title: "Right on your route", desc: "Find us on Mumbai Highway, at Malkapur, Telangana." }
];
