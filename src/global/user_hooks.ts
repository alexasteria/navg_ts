import { useEffect, useState } from "react";
import { User } from "./types";

const UserProfile: (stringParams: string) => { user: User | null } = (
  stringParams
) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetch(
      "https://" + process.env.REACT_APP_HOST + "/api/v2/profile" + stringParams
    )
      .then((res) => res.json())
      .then((res) => setUser(res))
      .catch((e) => console.log(e));
  }, [stringParams]);
  return {
    user,
  };
};
export default UserProfile;
