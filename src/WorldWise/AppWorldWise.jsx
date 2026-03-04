import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import "./index.css";
import NotFound from "./pages/NotFound";
import AppLoggedIn from "./pages/AppLoggedIn";
import Cities from "./pages/Cities";
import Countries from "./pages/Countries";
import AddForm from "./pages/AddForm";
import CityDetails from "./pages/CItyDetails";
import CityLists from "./pages/CityLists";

function AppWorldWise() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="home" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* APP ROUTE */}
        <Route path="app" element={<AppLoggedIn />}>
          {/* Redirect /app to /app/cities */}
          <Route index element={<Navigate to="cities" replace />} />

          {/* Child routes */}
          <Route path="cities" element={<Cities />}>
            <Route index element={<CityLists />} />
            <Route path=":id" element={<CityDetails />} />
          </Route>
          <Route path="countries" element={<Countries />} />
          <Route path="form" element={<AddForm />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWorldWise;
