import { useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { useLocation } from "../../../hooks/useLocation";
import {
  selectPosition,
  setPosition,
} from "../../../features/worldWise/currPositionSlice";
import { selectCities } from "../../../features/worldWise/cityListSlice";
import { Flag } from "../Flag";
import {
  clearSession,
  selectUser,
} from "../../../features/worldWise/authSlice";
import { supabase } from "../../lib/supabaseClient";

// fly to clicked location on map
function LocationMarker({ dispatch, navigate }) {
  const map = useMapEvents({
    click(e) {
      const convertedPositionFormat = [e.latlng.lat, e.latlng.lng];
      dispatch(setPosition(convertedPositionFormat));
      map.flyTo(e.latlng, 4);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

// sync map with current position
function SyncMapLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 4);
  }, [position, map]);
}

function Map() {
  const position = useSelector(selectPosition);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading: isLoadingUserPosition,
    error,
    getUserLocation,
  } = useLocation();
  const cities = useSelector(selectCities);
  const user = useSelector(selectUser);
  ///
  // to fly to postion if CityItem is clicked
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const lng = searchParams.get("lng");
    const lat = searchParams.get("lat");
    if (lat && lng) dispatch(setPosition([parseFloat(lat), parseFloat(lng)]));
  }, [searchParams, dispatch]);

  //
  function handlePosition() {
    // When button is clicked, update position on Map.jsx via passing callback fn. That way we avoid create 2 separate position state
    getUserLocation((newPosition) => {
      dispatch(setPosition(newPosition));
    });
  }
  ///
  return (
    <div className="map-ctn" style={{ height: "100%", position: "relative" }}>
      <style>
        {`
            .custom-popup .leaflet-popup-content-wrapper {
              background: #242a2e;
              color: white;
              font-size: 2rem;
              border-left: 5px solid #00c46a;
              padding: 0.05rem;
           }

           
           `}
      </style>
      <div
        className="status"
        style={{
          height: "10rem",
          width: "40rem",
          background: "#42484d",
          position: "absolute",
          top: "1rem",
          right: "1rem",
          zIndex: "401",
          borderRadius: "2rem",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <img
          alt="profPic"
          src={`https://i.pravatar.cc/100?u=${user.id}`}
          style={{
            width: "auto",
            height: "-webkit-fill-available",
            borderRadius: "50%",
          }}
        />
        <p style={{ fontSize: "2.5rem", fontWeight: "600" }}>
          Welcome, {"Jack"}
        </p>
        <button
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            padding: "1rem",
            borderRadius: "2rem",
            cursor: "pointer",
            background: "#00c46a",
          }}
          onClick={async () => {
            await supabase.auth.signOut(); // clears Supabase session: this removes the session from localStorage and invalidates the token.
            dispatch(clearSession()); // update Redux state
            navigate("/");
          }}
        >
          LOGOUT
        </button>
      </div>
      <div id="map" style={{ height: "100%" }}>
        <MapContainer
          center={position}
          zoom={4}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cities.map((city) => (
            <Marker position={city.position} key={city.id}>
              <Popup className="custom-popup">
                <p
                  style={{
                    minWidth: "15rem",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Flag value={city.emoji} />
                  {city.cityName}
                  {/* {city.emoji} {city.cityName} */}
                </p>
              </Popup>
            </Marker>
          ))}
          <SyncMapLocation position={position} />
          <LocationMarker dispatch={dispatch} navigate={navigate} />
        </MapContainer>
      </div>
      <button
        style={{
          fontSize: "2rem",
          fontWeight: 600,
          padding: "2rem",
          background: "#00c46a",
          position: "absolute",
          bottom: "2rem",
          zIndex: "401",
          borderRadius: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={handlePosition}
      >
        {isLoadingUserPosition
          ? "Loading your position..."
          : "USE YOUR POSITION"}
      </button>
    </div>
  );
}

export default Map;
