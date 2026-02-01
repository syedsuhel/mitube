import Home from "./pages/Homepage"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoPage from "./pages/VideoPage";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/video/:videoId",
      element: <VideoPage />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
