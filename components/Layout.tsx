import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Meta } from "./Meta";
import { Header } from "./Header";
import { ThemeContext } from "@/contexts/theme";
import { useState } from "react";

type LayoutProps = {
    children: ReactNode
}

/**
 * @param children
 * @returns The layout component with the header, navbar, main and footer components
 */
export default function Layout({ children }: LayoutProps) {
    const [theme, setTheme] = useState('dark');

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

    return (
        <>
            <Meta />
            <ThemeContext.Provider value={theme}>
                <div className="container mx-auto min-h-full">
                    <Header handleTheme={handleTheme}/>
                    <Navbar />
                    <main>
                        {children}
                    </main>
                </div>
                <Footer />
            </ThemeContext.Provider>
        </>
    )
}