import { createBrowserRouter } from "react-router";
export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <p>error</p>,
    element: <div>Hello World</div>,
  },
]);