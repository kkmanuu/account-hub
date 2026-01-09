import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/**
 * Entry point of the application.
 * - Selects the root DOM element.
 * - Renders the main <App /> component using React 18's createRoot API.
 * - Imports global CSS styles.
 */
createRoot(document.getElementById("root")!).render(<App />);
