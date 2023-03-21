import styles from '@/styles/ThemeButton.module.scss'
import { ChangeEvent, ChangeEventHandler } from 'react';

export const ThemeButton = ({handleTheme}: {handleTheme: ChangeEventHandler<HTMLInputElement>}) => { 
    return(
      <label className={`${styles.switch} md:order-2`}>
        <input type="checkbox" onChange={handleTheme}/>
        <span className={styles.slider}></span>
     </label>
    );
 }
