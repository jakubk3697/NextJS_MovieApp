import {BiCameraMovie} from 'react-icons/bi';
import Link from 'next/link';
import { HeaderSearchbar } from './elements/HeaderSearchbar';
import { ThemeButton } from './elements/ThemeButton';
import { ChangeEventHandler } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/theme';
import LoginBtn from './auth/LoginBtn';

/**
 * @description It renders the header component with the logo, searchbar and theme button. 
 * @description Searchbar can be used to search for movies by title.
 * @description Theme button can be used to toggle between light and dark theme.
 * @returns The header component with the logo, searchbar and theme button.
 */
export const Header = ({handleTheme}: {handleTheme: ChangeEventHandler<HTMLInputElement>}) => {
    const theme = useContext(ThemeContext);
    const themeBgColor = theme === 'dark' ? 'bg-black' : 'bg-gray-200 ';
    const themeTextColor = theme === 'dark' ? 'text-gray-300' : 'text-black';
    return(
        <header className={`${themeBgColor} bg-opacity-80 sticky top-0 z-10 flex items-center flex-wrap p-4 rounded-xl`}>
            <Link href={'/'} className="flex pr-4 hover:opacity-90 transition-opacity">
                    <BiCameraMovie className={`${themeTextColor} mr-1 text-4xl`} />
                    <h1 className={`${themeTextColor} text-3xl font-semibold tracking-wider`}>Movie App</h1>
            </Link>
            <div className="flex items-center justify-center gap-x-2 sm:ml-auto md:order-3">
                <LoginBtn/>
                <ThemeButton handleTheme={handleTheme}/>
            </div>
            <HeaderSearchbar />
        </header>
    );
}