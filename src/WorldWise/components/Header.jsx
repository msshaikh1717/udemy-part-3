import { Link, NavLink } from "react-router";

function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <style>
        {`
        .active {
        color:#00c46a !important; 
        }
        `}
      </style>
      <img src="/icon.png" style={{ height: "5rem", width: "5rem" }} />
      <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 style={{ fontSize: "4.8rem" }}>WorldWise</h1>
      </NavLink>
      <NavLink
        to="/product"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h3 style={{ margin: "0" }}>PRODUCT</h3>
      </NavLink>
      <NavLink
        to="/pricing"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h3 style={{ margin: "0" }}>PRICING</h3>
      </NavLink>
      <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
        <h3
          style={{
            margin: "0",
            background: "#00c46a",
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          LOGIN
        </h3>
      </Link>
    </header>
  );
}

export default Header;
