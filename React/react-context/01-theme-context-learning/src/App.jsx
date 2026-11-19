import Layout from "@/Layout/Layout";
import { ThemeProvider } from "@/context/ThemeProvider";

export function App() {
return <div className="app">
  <ThemeProvider>
    <Layout/> 
  </ThemeProvider>
</div>;
}
