import styles from '@/styles/ThemeButton.module.scss'
import { ChangeEvent, ChangeEventHandler } from 'react';

/**
 * 
 * @param param0 props which contains the handleTheme function which is used to change the theme by context
 * @returns ThemeButton component which is used to change the theme of the app
 */
export const ThemeButton = ({handleTheme}: {handleTheme: ChangeEventHandler<HTMLInputElement>}) => { 
    return(
      <label className={`${styles.switch}`}>
        <input type="checkbox" onChange={handleTheme}/>
        <span className={styles.slider}></span>
     </label>
    );
 }
