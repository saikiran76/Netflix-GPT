import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Onboarding from "./Onboarding";
import Login from "./Login";
import Browse from "./Browse";
import BucketList from "./BucketList";
import Footer from "./footer";
import Profile from "./Profile"; // Already integrated

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Onboarding />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/bucket-list",
      element: <BucketList />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    // Removed /recommendation route
    {
      path: "*",
      element: <Onboarding />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
