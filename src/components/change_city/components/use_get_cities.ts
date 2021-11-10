import { City, Country } from "../../../global/types";
import { useEffect, useState } from "react";

type UseGetCitiesInput = (
  filterName: string,
  country: Country | null
) => { cities: City[]; loading: boolean };

const useGetCities: UseGetCitiesInput = (filterName, country) => {
  const [cities, setCities] = useState<City[]>([]);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    clearTimeout(timer);
    const timerId = window.setTimeout(() => loadCities(filterName), 200);
    setTimer(timerId);
    // eslint-disable-next-line
  }, [filterName, country]);
  const loadCities: (filterName: string) => void = async (filterName) => {
    setLoading(true);
    if (!country) return;
    const response = await fetch(
      "https://" +
        process.env.REACT_APP_HOST +
        "/api/v2/cities?country_id=" +
        country.id +
        "&name=" +
        encodeURI(filterName)
    );
    const res = await response.json();
    if (response.status !== 200) {
      setLoading(false);
      return;
    }
    setCities(res.items);
    setLoading(false);
  };
  return {
    cities,
    loading,
  };
};
export { useGetCities };
