import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/* Initialize React Query client */
const queryClient = new QueryClient();

/**
 * Root application component
 * - Provides React Query client via QueryClientProvider
 * - Wraps the app in TooltipProvider
 * - Adds Toaster components for notifications
 * - Sets up client-side routing with React Router
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toast notifications */}
      <Toaster />
      <Sonner />

      {/* Client-side routing */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Catch-all route for 404 pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
