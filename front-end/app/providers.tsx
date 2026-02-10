"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./lib/auth-context";
import { LanguageProvider } from "./lib/language-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LanguageProvider>
        <AuthProvider>{children}</AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
