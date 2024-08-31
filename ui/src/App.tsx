import { ThemeProvider } from "@/components/theme-provider"
import Dashboard from "./pages/dashboard"
import { config } from "./wagmi-config";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Dashboard />
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
