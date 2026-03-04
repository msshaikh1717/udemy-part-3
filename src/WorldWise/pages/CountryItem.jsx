import { Flag } from "../components/Flag";

function CountryItem({ country }) {
  return (
    <li
      className="country-item"
      style={{
        width: "45%",
        background: "#242a2e",
        borderLeft: "5px solid #ffb545",
        height: "10rem",
        fontSize: "2rem",
        borderRadius: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <Flag value={country.emoji} />
      <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>{country.country}</p>
    </li>
  );
}

export default CountryItem;
