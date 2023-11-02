import styles from './main.module.scss'

const Main = () => {
  return (
  <main>
    <div className={styles.content}>
      <section className={styles.language__controller}>
        <div className={`${styles.language} ${styles.choosen}`}>RUS</div>
        <div className={styles.language}>ENG</div>
        <div className={styles.language}>POR</div>
        <div className={styles.language}>FRA</div>
      </section>
    </div>
  </main>
  )
}

export default Main