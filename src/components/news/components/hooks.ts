import { useEffect, useState } from "react";

const Info = () => {
  const [countUsers, setCountUsers] = useState(0);
  const [countMasters, setCountMasters] = useState(0);
  useEffect(() => {
    const getStats = async () => {
      const response = await fetch(
        "https://" + process.env.REACT_APP_HOST + "/api/v2/stats"
      );
      if (response.status !== 200) return;
      const stats = await response.json();
      setCountUsers(stats.users_count);
      setCountMasters(stats.masters_count);
    };
    getStats();
  }, []);
  return {
    countUsers,
    countMasters,
  };
};
export { Info };
