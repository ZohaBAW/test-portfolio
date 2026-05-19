import { createBrowserRouter } from "react-router";
import PuzzleLogin from "./pages/PuzzleLogin";
import Dashboard from "./pages/Dashboard";
import MiniGames from "./pages/MiniGames";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PuzzleLogin,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      { index: true, Component: MiniGames },
      { path: "about", Component: About },
      { path: "experience", Component: Experience },
      { path: "skills", Component: Skills },
      { path: "projects", Component: Projects },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);