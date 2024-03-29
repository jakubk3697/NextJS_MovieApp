import Image from 'next/image';
import { imageLoader } from '@/utils/imageLoader';
import linkedin from '@/public/images/linkedin.png';
import github from '@/public/images/github.png';

/**
 * @description Footer always on the bottom of the page. It contains a copyright and links to my LinkedIn and GitHub profiles.
 * @returns A footer with a copyright and links to my LinkedIn and GitHub profiles
 */
export const Footer = () => {
    return (
        <footer className="flex justify-center items-center mt-10 w-full h-10 opacity-90 tracking-widest bg-black">
            <p>COPYRIGHT© 2023 MovieApp</p>
            <div className='flex pl-3 space-x-3'>
                <a href="https://www.linkedin.com/in/jkaminski97/" target="_blank" rel="noreferrer">
                    <Image 
                        src={linkedin} 
                        alt="LinkedIn" 
                        width={20}
                        height={20}
                        loader={imageLoader}
                        unoptimized
                        className='hover:scale-110'
                    />
                </a>
                <a href="https://github.com/jakubk3697" target="_blank" rel="noreferrer">
                    <Image 
                        src={github} 
                        alt="GitHub" 
                        width={20}
                        height={20}
                        loader={imageLoader}
                        unoptimized
                        className="text-white bg-gray-50 rounded-full hover:scale-110"
                    />
                </a>

            </div>
        </footer>
    )
}