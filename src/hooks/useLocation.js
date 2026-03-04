import { useState } from "react";

export function useLocation() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //   const [userPosition, setUserPosition] = useState();

  function getUserLocation(onSuccess) {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPosition = [pos.coords.latitude, pos.coords.longitude];

        if (onSuccess) {
          setIsLoading(false);
          onSuccess(newPosition);
        }
      },
      (error) => {
        setIsLoading(false);
        setError(error.message);
      },
    );
  }
  return { isLoading, error, getUserLocation };
}
