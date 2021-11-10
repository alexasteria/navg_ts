import { CustomSelect } from "@vkontakte/vkui";
import { Country } from "../../../global/types";
import React from "react";

const SelectCountry: React.FC<{
  country: Country | null;
  changeCountry: (value: Country | undefined) => void;
}> = ({ country, changeCountry }) => {
  const countries: Country[] = [
    { id: 1, name: "Россия" },
    { id: 2, name: "Украина" },
    { id: 3, name: "Беларусь" },
    { id: 4, name: "Казахстан" },
    { id: 6, name: "Армения" },
  ];
  const countryProps = {
    value: country ? String(country.id) : "1",
    options: countries.map((s) => {
      return { value: String(s.id), label: s.name };
    }),
  };
  return (
    <CustomSelect
      placeholder="Не выбрано"
      {...countryProps}
      onChange={(option) =>
        changeCountry(
          countries.find((item) => +item.id === +option.target.value)
        )
      }
    />
  );
};

export default SelectCountry;
