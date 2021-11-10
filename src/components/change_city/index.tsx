import React, { useState } from "react";
import SelectCountry from "./components/select_country";
import { PanelHeader, Div, Search, PanelHeaderBack } from "@vkontakte/vkui";
import CityList from "./components/city_list";
import { useDispatch, useSelector } from "react-redux";
import { goBack } from "../../store/route/route_actions";
import { City, Country, User } from "../../global/types";
import { RootReducer } from "../../store/rootReducer";

const ChangeCity: React.FC<{
  selectCity: (
    city: City,
    user: User,
    launchParams: { [k: string]: string }
  ) => void;
}> = ({ selectCity }) => {
  const userCountry = useSelector(
    (state: RootReducer) => state.usersState.user?.city?.country || null
  );
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<Country | null>(
    userCountry ? userCountry : { id: 1, name: "Россия" }
  );
  const dispatch = useDispatch();
  const user = useSelector((state: RootReducer) => state.usersState.user);
  const launchParams = useSelector(
    (state: RootReducer) => state.usersState.launchParams
  );
  if (!user) return null;
  const onSelect = (city: City) => {
    selectCity(city, user, launchParams);
  };
  const changeCountry = (country: Country | undefined) => {
    if (!country) return;
    setCountry(country);
  };
  return (
    <>
      <PanelHeader
        left={<PanelHeaderBack onClick={() => dispatch(goBack())} />}
      >
        Выбор города
      </PanelHeader>
      <Div>
        <SelectCountry country={country} changeCountry={changeCountry} />
      </Div>
      <Search
        placeholder="Начните вводить название города"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <CityList nameFilter={cityName} onSelect={onSelect} country={country} />
    </>
  );
};

export default ChangeCity;
