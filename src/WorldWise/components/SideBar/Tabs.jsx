import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setMapError } from "../../../features/worldWise/currPositionSlice";

function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div
      className="sidebar__tabs"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
      }}
    >
      <h4
        style={{
          background: location.pathname.startsWith("/app/cities")
            ? "#00c46a"
            : "#242a2e",
          borderRadius: "1rem",
          padding: "0.5rem",
          margin: "0",
          cursor: "pointer",
        }}
        onClick={() => {
          dispatch(setMapError(null));
          navigate("cities");
        }}
      >
        Cities
      </h4>
      <h4
        style={{
          background:
            location.pathname === "/app/countries" ? "#00c46a" : "#242a2e",
          borderRadius: "1rem",
          padding: "0.5rem",
          margin: "0",
          cursor: "pointer",
        }}
        onClick={() => {
          dispatch(setMapError(null));
          navigate("countries");
        }}
      >
        Countries
      </h4>
    </div>
  );
}

export default Tabs;
