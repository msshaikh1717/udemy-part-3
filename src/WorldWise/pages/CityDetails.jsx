import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { selectCities } from "../../features/worldWise/cityListSlice";
import { format } from "date-fns";
import { Flag } from "../components/Flag";

function CityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const cities = useSelector(selectCities);
  const selectedCity = cities.find((city) => city.id.toString() === id); //id might contain letters so conv id to number might give error

  const formattedDate = selectedCity
    ? format(new Date(selectedCity?.date), "eeee, MMMM dd, yyyy")
    : "";

  return (
    <div
      className="city-details"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="header">
        <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#aaa" }}>
          CITY NAME
        </p>

        <span>
          <Flag value={selectedCity?.emoji} />
          <h3 style={{ padding: "0 2rem", display: "inline" }}>
            {selectedCity?.cityName}
          </h3>
        </span>
      </div>
      <div className="went-to">
        <p
          style={{ fontSize: "1.5rem", fontWeight: 700, color: "#aaa" }}
        >{`YOU WENT TO ${selectedCity?.cityName.toUpperCase()} ON`}</p>
        <p style={{ fontSize: "1.5rem" }}>{formattedDate}</p>
      </div>

      <div className="notes">
        <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#aaa" }}>
          YOUR NOTES
        </p>
        <p style={{ fontSize: "1.5rem" }}>{selectedCity?.notes}</p>
      </div>

      <div className="learn-more">
        <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#aaa" }}>
          LEARN MORE
        </p>
        <a
          style={{ color: "#ffb545", fontSize: "1.5rem" }}
          href={`https://en.wikipedia.org/wiki/${selectedCity?.cityName}`}
        >{`Check out ${selectedCity?.cityName} on Wikipedia →`}</a>
      </div>
      <button
        style={{
          display: "block",
          border: "1px solid #FFF",
          background: "none",
          color: "#FFF",
          padding: "1rem",
          borderRadius: "0.75rem",
          cursor: "pointer",
        }}
        onClick={() => navigate("/app/cities")}
      >
        ← Back
      </button>
    </div>
  );
}

export default CityDetails;
