import { useRouter } from "next/router"
import { useEffect } from "react"
import styles from '@styles/404.module.scss'
import Image from "next/image";
import { imageLoader } from "@/utils/imageLoader";
import image from "@public/404.png";

export default function Custom404() {
    const router = useRouter();

    return (
        <section className=" h-2/3 p-6 mt-10 w-fit">
            <h1 className="text-4xl font-semibold text-red-700 mb-6">404 - Page Not Found</h1>
            <Image
                src={'/404.gif'}
                alt="404 - Not Found"
                width={500}
                height={500}
                loader={imageLoader}
                unoptimized
                className="opacity-80 rounded-xl"
            />
           <button 
           type="button" 
           className="mt-3 font-semibold focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
           onClick={() => router.push('/')}
           >
            Back to Home 
            </button>

        </section> 
    )
}