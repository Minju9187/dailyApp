import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <h1>안녀어어어어ㅓ엉</h1>
      <h2>하하</h2>
    </ThemeProvider>
  );
}

export default App;
