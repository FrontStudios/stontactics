import styles from './header.module.scss'

import logo from '../../img/logotype.png'

const Header = () => {
  return (
    <header>
      <div className={styles.wrapper}>
      <img src={logo} alt="" className={styles.img} />
        <nav className={styles.navigation}>
           <p className={`${styles.title} ${styles.choosen} ${styles.first}`}>Стратегия</p>
           <p className={styles.title}>Раскидки</p>
           <p className={styles.title}>Схемы игр</p>
           <p className={styles.title}>Комьюнити</p>
           <p className={styles.title}>Информация</p>
           <p className={styles.title}>Вход</p>
        </nav>
       <div className={styles.pro__wrap}>
        <div className={styles.pro}>
          PRO
         </div>
       </div>
      </div>
    </header>
  )
}

export default Header