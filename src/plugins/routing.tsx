import type { RouteObject } from "react-router-dom";
import NoMatch from '@pages/errors/404'
import MainSearch from '@pages/search'
import Profile from '@pages/profile'
import SearchList from '@components/search/SearchList'

/**
 * @documentation https://reactrouter.com/en/main
 */
const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainSearch />,
    children: [
      { path: "/search/:category", index: true, element: <SearchList /> },
    ],
  },
  {
    path: "/:category/:id",
    element: <Profile />,
  },
  {
    path: "*",
    element: <NoMatch />
  }
]

export default routes;