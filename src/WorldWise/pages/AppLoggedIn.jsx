import { Outlet } from "react-router";
import Sidebar from "../components/SideBar/Sidebar";
import Map from "../components/Map/Map";

function AppLoggedIn() {
  return (
    <div
      className="app"
      style={{
        display: "grid",
        gridTemplateColumns: "40rem 1fr",
      }}
    >
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLoggedIn;
