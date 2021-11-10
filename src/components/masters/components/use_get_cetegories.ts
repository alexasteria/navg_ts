import { useEffect, useState } from "react";
import { Category, Skill } from "../../../global/types";

const UseGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  useEffect(() => {
    fetch("https://" + process.env.REACT_APP_HOST + "/api/v2/categories")
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.items);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    fetch("https://" + process.env.REACT_APP_HOST + "/api/v2/skills")
      .then((res) => res.json())
      .then((res) => {
        setSkills(res.items);
      })
      .catch((e) => console.log(e));
  }, []);
  return {
    categories,
    skills,
  };
};
export { UseGetCategories };
