import { ReactNode } from "react"
import {Navbar} from "./Navbar"
import {Footer} from "./Footer"
import {Meta} from "./Meta"
import { Header } from "./Header"

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Meta />
            <div className="container mx-auto h-screen">
                <Header />
                <main>
                    {children}
                </main>
            </div>
                <Footer />
        </>
    )
}