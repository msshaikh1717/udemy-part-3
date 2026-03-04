import { Outlet, useSearchParams } from "react-router";
import Logo from "./Logo";
import Tabs from "./Tabs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCities,
  selectCities,
  selectCitiesError,
  selectCitiesLoading,
} from "../../../features/worldWise/cityListSlice";
import { selectMapError } from "../../../features/worldWise/currPositionSlice";
import { useEffect } from "react";
import SimpleSpinner from "../../../assets/SimpleSpinner";
import Spinner from "../../../assets/Spinner";

function Sidebar() {
  const [searchParams] = useSearchParams();
  const cities = useSelector(selectCities);
  const cityLoading = useSelector(selectCitiesLoading);
  const cityError = useSelector(selectCitiesError);
  const mapError = useSelector(selectMapError);
  const lat = searchParams.get("lat");
  const dispatch = useDispatch();

  // Fetch cities when Sidebar mounts (right after login)
  // No need to do async await as we are not doing anything after city data is loaded.
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  return (
    <div
      className="sidebar"
      style={{
        background: "#2d3439",
        height: "100vh",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div className="sidebar__logoTab" style={{ maxHeight: "25%" }}>
        <Logo />
        <Tabs />
      </div>
      <div
        className="sidebar__content"
        style={{
          flex: 1,
          overflowY: "auto",
          maxHeight: "70%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ALL POSSIBLE CASES FOR SIDEBAR CONTENT*/}
        {/* Case 1: Map Error*/}
        {mapError && (
          <h3 style={{ marginTop: "10rem", color: "#ff6b6b" }}>{mapError}</h3>
        )}

        {/* Case 2: City fetch Error*/}
        {cityError && (
          <h3 style={{ marginTop: "10rem", color: "#6bfff8" }}>{cityError}</h3>
        )}

        {/* Case 3: city loading*/}
        {cityLoading && <Spinner />}

        {/* Case 4: Form when lat exists and no error */}
        {!mapError && !cityError && lat && !cityLoading && <Outlet />}

        {/* Case 5: Empty state when no cities, no lat, no error */}
        {!mapError &&
          !cityError &&
          !cityLoading &&
          !lat &&
          cities.length === 0 && (
            <h3 style={{ marginTop: "10rem" }}>
              👋 Add your first city by clicking on a city on the map
            </h3>
          )}

        {/* Case 6: Cities list when cities exist but no lat */}
        {!mapError &&
          !cityError &&
          !lat &&
          cities.length > 0 &&
          !cityLoading && <Outlet />}
      </div>

      <footer style={{ fontSize: "1.5rem", textAlign: "center" }}>
        © Copyright 2026 by WorldWise Inc.
      </footer>
    </div>
  );
}

export default Sidebar;
