import { useSelector } from "react-redux";
import { selectCities } from "../../features/worldWise/cityListSlice";
import CountryItem from "./CountryItem";

function Countries() {
  const cities = useSelector(selectCities);

  const uniqueCountries = [...new Set(cities.map((city) => city.country))].map(
    (countryName) => {
      const firstCity = cities.find((city) => city.country === countryName);
      return { country: countryName, emoji: firstCity.emoji };
    },
  );

  return (
    <ul
      style={{
        padding: "3rem",
        margin: "5rem 0",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        gap: "3rem",
        overflowY: "auto",
        background: "#42484d",
        borderRadius: "2rem",
        width: "100%",
      }}
    >
      {uniqueCountries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default Countries;
