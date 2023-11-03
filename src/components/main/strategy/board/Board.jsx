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
             <p className={styles.stages__title}>этапы стратегии:</p>
          </div>
          <div className={styles.strategy__maps}>
             <p className={styles.map__title}>карта:</p>
             <div className={styles.maps}>
                <div className={styles.map}></div>
                <div className={styles.map}></div>
                <div className={styles.map}></div>
                <div className={styles.map}></div>
                <div className={styles.map}></div>
                <div className={styles.map}></div>
                <div className={styles.map}></div>
             </div>
          </div>
          <div className={styles.draw__setting}>
            <p className={styles.draw__title}>настройка кисти:</p>
          </div>
       </section>
    </section>
 )
}
export default Board;