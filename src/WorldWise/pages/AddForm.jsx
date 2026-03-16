import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useSearchParams } from "react-router";
import { getCity } from "../../hooks/useGetCity";
import { useDispatch, useSelector } from "react-redux";
import {
  selectClickedCityObj,
  setClickedCityObj,
  setMapError,
} from "../../features/worldWise/currPositionSlice";
import { createCity } from "../../features/worldWise/cityListSlice";
import { Flag } from "../components/Flag";
import { format } from "date-fns";

function AddForm() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const clickedCityObj = useSelector(selectClickedCityObj);
  const [isLoading, setIsLoading] = useState(false);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const cityToAdd = {
      city_name: data.cityName,
      country: clickedCityObj.countryName,
      emoji: clickedCityObj.countryCode,
      notes: data.notes,
      position: {
        lat,
        lng,
      },
      date: format(data.date, "yyyy-MM-dd"),
    };
    console.log(cityToAdd, "<== cityToAdd");
    dispatch(createCity(cityToAdd));
    navigate("/app/cities");
  }

  // api call to convert lat,lng to cityName from url
  useEffect(() => {
    async function fetchCityData() {
      if (!lat || !lng) return;
      setIsLoading(true);
      try {
        const newCityObj = await getCity(lat, lng);
        if (!newCityObj.city) {
          dispatch(
            setMapError(
              "👋 That doesn't seem to be a city. Click somewhere else 😉",
            ),
          );
        } else {
          dispatch(setClickedCityObj(newCityObj));
          setValue("cityName", newCityObj.city);
        }
      } catch (err) {
        dispatch(
          setMapError("Failed to ftch city: Check Internet Connection", err),
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchCityData();
  }, [searchParams, lat, lng, setValue, dispatch]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        padding: "3rem",
        background: "#242a2e",
        borderRadius: "2rem",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        margin: "3rem 0",
        gap: "1rem",
      }}
      className="sidebar__add-form"
    >
      <p style={{ fontSize: "2.5rem" }}>
        City Name:
        <span style={{ padding: "0rem 2rem" }}>
          <Flag value={clickedCityObj?.countryCode} />
        </span>
      </p>
      <input
        style={{ height: "4rem", width: "100%" }}
        defaultValue={clickedCityObj.city}
        {...register("cityName")}
      />
      <p style={{ fontSize: "2.5rem" }}>
        When did you go to {clickedCityObj.city}?
      </p>
      {/* DATE PICKER with react-hook-form */}
      <Controller
        name="date"
        control={control}
        defaultValue={new Date()} // Initial value
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            customInput={
              <input
                style={{
                  height: "4rem",
                  width: "100%",
                  fontSize: "1.6rem",
                  padding: "0.5rem",
                }}
              />
            }
          />
        )}
      />

      <p style={{ fontSize: "2.5rem" }}>
        Notes about your trip to {clickedCityObj.city}
      </p>
      <input
        style={{ height: "4rem", width: "100%" }}
        defaultValue=""
        {...register("notes", { required: true })}
      />
      <div
        className="addform__btns"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          style={{ padding: "0.75rem 0", width: "6rem", borderRadius: "1rem" }}
          disabled={isLoading}
        >
          {isLoading ? "Loading city name..." : "Add"}
        </button>

        <button
          type="button"
          style={{ padding: "0.75rem 0", width: "6rem", borderRadius: "1rem" }}
          onClick={() => navigate("/app/cities")}
        >
          Back
        </button>
      </div>
    </form>
  );
}

export default AddForm;
