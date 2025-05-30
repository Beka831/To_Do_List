
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoApp from "./pages/TodoApp";
import NotFound from "./pages/NotFound";

import Chartbar from "./pages/Chartbar";
// import Pagess from "./pages/web/app/dashboard/page";
// import Page from "./pages/web/app/Dashboard";
import Dashboard from "./pages/web/app/dashboard/Dashboard";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/Chartbar" element={<Chartbar />} />
           <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
