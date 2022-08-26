import React from "react";
import {
  useLocation
} from "react-router-dom";

export const useNavQuery = (name: string) => {
  const { search } = useLocation();

  const query = React.useMemo(() => new URLSearchParams(search), [search]);

  return {
    [name]: query.get(name) || ''
  };
}