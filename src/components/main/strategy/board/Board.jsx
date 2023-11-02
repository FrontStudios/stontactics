import styles from './board.module.scss'

const Board = () => {
 return (
    <section className={styles.board}>
      <section className={styles.map__instruments}>
        {/* <div className={styles.closer}>
           <div className={styles.path}></div>
        </div> */}
      </section>

        <div className={styles.canvas__wrapper}>
             {/* component */}
        </div> 
       <div className={styles.other__instruments}>

       </div>
       <div className={styles.drawing__instruments}>

       </div>
    </section>
 )
}
export default Board;