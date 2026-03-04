import { Outlet, useSearchParams } from "react-router";

function Cities() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  return (
    <ul
      style={{
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "3rem",
        background: "#42484d",
        borderRadius: "2rem",
        width: "100%",
        height: lat ? "100%" : "", // cityList UI breaks if 100% and cityDetails UI breaks if !100%
      }}
    >
      <Outlet />
    </ul>
  );
}

export default Cities;
