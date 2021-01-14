import "./Searchbar.css";
import "../../App.css";
import { useState } from "react";

const locationOptions = [
  // "Kaikki",
  "Uusimaa",
  "Varsinais-Suomi",
  "Satakunta",
  "Kanta-Häme",
  "Pirkanmaa",
  "Päijät-Häme",
  "Kymenlaakso",
  "Etelä-Karjala",
  "Etelä-Savo",
  "Pohjois-Savo",
  "Pohjois-Karjala",
  "Keski-Suomi",
  "Etelä-Pohjanmaa",
  "Pohjanmaa",
  "Keski-Pohjanmaa",
  "Pohjois-Pohjanmaa",
  "Kainuu",
  "Lappi",
  "Ahvenanmaa",
];

const locationAll = (
  <option key={1} value={"Kaikki"}>
    Kaikki
  </option>
);
const locationOptionsHtml = locationOptions.sort().map((o, i) => (
  <option key={i} value={o}>
    {o}
  </option>
));

const tuoteOptions = [
  "Kaikki",
  "Autot",
  "Puhelimet",
  "Kellot",
  "Pyorat",
  "Tietokoneet",
];
const tuoteOptionsHtml = tuoteOptions.map((o, i) => (
  <option key={i} value={o}>
    {o}
  </option>
));

const checkOptions = ["Myydään", "Ostetaan", "Yritys"];
const checkOptionsHtml = checkOptions.map((o, i) => (
  <div className="Container-checkbox-text" key={i}>
    {o}
    <input type="checkbox" name={o} className="Container-checkbox"></input>
  </div>
));

const Searchbar = ({ setFilters }) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchWord, setSearchWord] = useState("");

  return (
    <div className="Container">
      <form className="Wrapper-searchbar">
        <div className="Container-searchbar-upper">
          <input
            className="Container-input"
            type="text"
            value={searchWord}
            onInput={(e) => {
              setSearchWord(e.target.value);
              e.preventDefault();
            }}
            placeholder="Hakusana"
          ></input>
          <div className="Container-item">
            <select
              className="Container-select"
              onChange={(e) => setSearchLocation(e.target.value)}
            >
              {locationAll}
              {locationOptionsHtml}
            </select>
          </div>
          <div className="Container-item">
            <select className="Container-select">{tuoteOptionsHtml}</select>
          </div>
        </div>
        <div className="Container-searchbar-lower">
          <div className="Container-checkbox">{checkOptionsHtml}</div>
          <div>
            <button
              className="Container-button"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setFilters({
                  searchWord: searchWord,
                  location: searchLocation,
                });
                console.log("clickerino and ", searchWord);
              }}
            >
              Hae
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
