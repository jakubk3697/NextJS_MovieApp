import Image from "next/image";
import styles from '@/styles/Header.module.scss'
import {BiCameraMovie} from 'react-icons/bi'
import Link from 'next/link'

export const Header = () => {
    return(
        <header>
            <Link className={styles.Link} href={'/'}>
                <div className={styles.leftAreaBox}>
                    <BiCameraMovie className={styles.logoIcon} />
                    <h1 className={styles.logoText}>FilmFiesta</h1>
                </div>
            </Link>
        </header>
    );
}