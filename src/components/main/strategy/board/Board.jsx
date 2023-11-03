import styles from './board.module.scss'

import Button from './buttons/Button';

import rust from '../../../../img/maps/Раст Т.svg'
import Canvas from './canvas/Canvas';

const Board = () => {
 return (
    <section className={styles.board}>
      <section className={styles.map__instruments}>
        <div className={styles.map__wrapper}>
         <Button />
         <Button />
         <Button />
         <Button />
         <Button />
         <Button />
         <Button />
         <Button />
         <Button />
         <Button />
         <Button />
         <Button />
        </div>
        {/* <div className={styles.closer}>
           <div className={styles.path}></div>
        </div> */}
      </section>

        <section className={styles.canvas__wrapper}>
            <Canvas />
        </section> 
       <section className={styles.other__instruments}>
         <div className={styles.other__wrap}>
           <Button />
           <Button />
           <Button />
           <Button />
           <Button />
           <Button />
         </div>
       </section>
       <section className={styles.drawing__instruments}>
           <div className={styles.strategy__stages}>
             
          </div>
          <div className={styles.strategy__maps}>
             
          </div>
          <div className={styles.draw__setting}>

          </div>
       </section>
    </section>
 )
}
export default Board;