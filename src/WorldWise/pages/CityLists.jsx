import { useSelector } from "react-redux";
import { selectCities } from "../../features/worldWise/cityListSlice";
import CityItem from "../components/CityItem";

function CityLists() {
  const cities = useSelector(selectCities);

  return cities.map((city) => <CityItem city={city} key={city.id} />);
}

export default CityLists;
