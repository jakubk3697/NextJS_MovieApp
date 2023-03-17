import { ReactNode } from "react"
import {Navbar} from "./Navbar"
import {Footer} from "./Footer"
import {Meta} from "./Meta"
import { Header } from "./Header"

type LayoutProps = {
    children: ReactNode
}

/**
 * @param children
 * @returns The layout component with the header, navbar, main and footer components
 */
export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Meta />
            <div className="container mx-auto min-h-full">
                <Header />
                <Navbar/>
                <main>
                    {children}
                </main>
            </div>
                <Footer />
        </>
    )
}