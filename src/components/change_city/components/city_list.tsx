import { Cell, List, Placeholder, Separator, Spinner } from "@vkontakte/vkui";
import React from "react";
import { useGetCities } from "./use_get_cities";
import { City, Country } from "../../../global/types";

const CityList: React.FC<{
  nameFilter: string;
  onSelect: (city: City) => void;
  country: Country | null;
}> = ({ nameFilter, onSelect, country }) => {
  const { cities, loading } = useGetCities(nameFilter, country);
  if (loading) return <Placeholder header={<Spinner />} />;
  if (!cities)
    return (
      <Placeholder header="Не найдено">
        Попробуйте изменить критерии поиска
      </Placeholder>
    );
  return (
    <List>
      {cities.map((city) => {
        return (
          <div key={city.id}>
            <Cell
              description={city.region || city.area || ""}
              onClick={() => onSelect(city)}
              key={city.id}
            >
              {city.name}
            </Cell>
            <Separator />
          </div>
        );
      })}
    </List>
  );
};

export default CityList;
