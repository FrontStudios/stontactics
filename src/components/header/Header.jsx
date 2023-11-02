import styles from './header.module.scss'

import logo from '../../img/logotype.png'

const Header = () => {
  return (
    <header>
       <div className={styles.header__wrapper}>
         <img src={logo} alt="" className={styles.header__img} />
         <nav className={styles.header__navigation}>
           <p className={`${styles.navigation__title} ${styles.choosen}`}>Стратегия</p>
           <p className={styles.navigation__title}>Раскидки</p>
           <p className={styles.navigation__title}>Схемы игр</p>
           <p className={styles.navigation__title}>Комьюнити</p>
           <p className={styles.navigation__title}>Информация</p>
           <p className={styles.navigation__title}>Вход</p>
        </nav>


       <div className={styles.pro__wrap}>
        <div className={styles.pro}>
          PRO
         </div>

            <div className={styles.burger}>
              <span></span>
            </div>
          </div>
       </div> 
    </header>
  )
}

export default Header