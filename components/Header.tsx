import styles from '@/styles/Header.module.scss'
import {BiCameraMovie} from 'react-icons/bi';
import Link from 'next/link';
import { HeaderSearchbar } from './elements/HeaderSearchbar';
import { ThemeButton } from './elements/ThemeButton';

export const Header = () => {
    return(
        <header className="flex items-center p-4 flex-wrap  ">
            <Link href={'/'} className="flex hover:opacity-90 transition-opacity pr-4">
                    <BiCameraMovie className="text-4xl mr-1" />
                    <h1 className="text-3xl font-semibold tracking-wider">Movie App</h1>
            </Link>
            <ThemeButton/>
            <HeaderSearchbar />
        </header>
    );
}