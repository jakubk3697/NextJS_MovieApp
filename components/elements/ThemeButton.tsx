import styles from '@/styles/ThemeButton.module.scss'

export const ThemeButton = () => { 
    return(
      <label className={`${styles.switch} md:order-2`}>
        <input type="checkbox" />
        <span className={styles.slider}></span>
     </label>
    );
 }
