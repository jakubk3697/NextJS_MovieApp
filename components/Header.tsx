import styles from '@/styles/Header.module.scss'
import {BiCameraMovie} from 'react-icons/bi'
import Link from 'next/link'

export const Header = () => {
    return(
        <header>
            <Link className="" href={'/'}>
                <div>
                    <BiCameraMovie />
                    <h1>FilmFiesta</h1>
                </div>
            </Link>
        </header>
    );
}