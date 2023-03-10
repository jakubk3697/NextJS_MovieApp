import { ReactNode } from "react"
import {Navbar} from "./Navbar"
import {Footer} from "./Footer"
import {Meta} from "./Meta"

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Meta />
            <div>
                <Navbar />
                <main className="container mx-auto">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}