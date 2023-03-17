import styles from '@/styles/Header.module.scss'
import {BiCameraMovie} from 'react-icons/bi';
import Link from 'next/link';
import { HeaderSearchbar } from './elements/HeaderSearchbar';
import { ThemeButton } from './elements/ThemeButton';

/**
 * @description It renders the header component with the logo, searchbar and theme button. 
 * @description Searchbar can be used to search for movies by title.
 * @description Theme button can be used to toggle between light and dark theme.
 * @returns The header component with the logo, searchbar and theme button.
 */
export const Header = () => {
    return(
        <header className="sticky top-0 bg-black bg-opacity-70 z-10 flex items-center flex-wrap p-4">
            <Link href={'/'} className="flex pr-4 hover:opacity-90 transition-opacity">
                    <BiCameraMovie className="mr-1 text-4xl" />
                    <h1 className="text-3xl font-semibold tracking-wider">Movie App</h1>
            </Link>
            <ThemeButton/>
            <HeaderSearchbar />
        </header>
    );
}