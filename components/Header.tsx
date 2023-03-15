import styles from '@/styles/Header.module.scss'
import {BiCameraMovie} from 'react-icons/bi';
import Link from 'next/link';
import { HeaderSearchbar } from './elements/HeaderSearchbar';
import { ThemeButton } from './elements/ThemeButton';

export const Header = () => {
    return(
        <header className="flex items-center flex-wrap p-4">
            <Link href={'/'} className="flex pr-4 hover:opacity-90 transition-opacity">
                    <BiCameraMovie className="mr-1 text-4xl" />
                    <h1 className="text-3xl font-semibold tracking-wider">Movie App</h1>
            </Link>
            <ThemeButton/>
            <HeaderSearchbar />
        </header>
    );
}