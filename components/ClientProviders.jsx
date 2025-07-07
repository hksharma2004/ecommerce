'use client';

import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

export default function ClientProviders({ children }) {
  return (
    <AppContextProvider>
      <Toaster />
      {children}
    </AppContextProvider>
  );
}