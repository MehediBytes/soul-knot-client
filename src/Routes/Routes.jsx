import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <h3>Main</h3>,
      children: [
        {
            path: '/',
            element: <h3>Home page</h3>
        },
      ]
    },
  ]);