import { format } from "date-fns";
import { useDispatch } from "react-redux";
import styles from "./CityItem.module.css";

import { Link } from "react-router";
import { Flag } from "./Flag";
import { removeCity } from "../../features/worldWise/cityListSlice";

function CityItem({ city }) {
  // should recieve date in format "2027-10-31T15:59:59.138Z"
  const formattedDate = format(new Date(city.date), "MMMM dd, yyyy");

  const dispatch = useDispatch();

  return (
    <Link
      to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      style={{ textDecoration: "none", color: "inherit", width: "100%" }}
    >
      <li
        style={{
          minWidth: "100%",
          background: "#242a2e",
          border: "1px solid #00c46a",
          borderLeft: "5px solid #00c46a",
          height: "6rem",
          fontSize: "2rem",
          borderRadius: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem",
          cursor: "pointer",
        }}
      >
        <Flag value={city.emoji} />
        <span
          style={{
            flex: "1 1 20%", // Start at 20% width, can grow/shrink
            minWidth: "8rem",
            fontSize: "1.4rem",
          }}
        >
          {city.cityName}
        </span>
        <span
          style={{
            flex: "1 1 50%", // Start at 50% width
            minWidth: "12rem",
            fontSize: "1.4rem",
          }}
        >
          ({formattedDate})
        </span>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            dispatch(removeCity(city.id));
          }}
        >
          &times;
        </button>
      </li>
    </Link>
  );
}

export default CityItem;
