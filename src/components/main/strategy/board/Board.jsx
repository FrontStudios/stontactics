import styles from './board.module.scss'

import Button from './buttons/Button';

import Canvas from './canvas/Canvas';
import MapsController from './mapsController/MapsController';
import StrategyController from './strategyController/StrategyController';

const Board = () => {
 return (
    <section className={styles.board}>
      <section className={styles.map__instruments}>
        <div className={styles.map__wrapper}>
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
        </div>
      </section>

        <section className={styles.canvas__wrapper}>
            <Canvas />
        </section> 
       <section className={styles.other__instruments}>
         <div className={styles.other__wrap}>
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         <Button className = {styles.setting__button} />
         </div>
       </section>
       <section className={styles.drawing__instruments}>
           <div className={styles.strategy__stages}>
             <p className={styles.stages__title}>этапы стратегии:</p>
              <div className={styles.stages}>
                 <StrategyController number = "1" status = {styles.first} />
                 <StrategyController number = "2" />
                 <StrategyController number = "3" />
                 <StrategyController number = "4" />
                 <StrategyController number = "5" />
                 <StrategyController number = "6" />
                 <StrategyController number = "7" />
                 <StrategyController number = "8" />
              </div>
          </div>
          <div className={styles.strategy__maps}>
             <p className={styles.map__title}>карта:</p>
             <div className={styles.maps}>
              <MapsController map = {styles.rust} mapName = "rust"  />
              <MapsController map = {styles.province} mapName = "province"  />
              <MapsController map = {styles.sandstone} mapName = "sandstone" />
              <MapsController map = {styles.sakura} mapName = "sakura"  />
              <MapsController map = {styles.dune} mapName = "dune"  />
              <MapsController map = {styles.breeze} mapName = "breeze"  />
              <MapsController map = {styles.zone} mapName = "zone 9 "  />
             </div>
          </div>
          <div className={styles.draw__setting}>
            <p className={styles.draw__title}>настройка кисти:</p>
            
            <div className={styles.line__types}>
            <Button className = {styles.setting__button} />
            <Button className = {styles.setting__button} />
            <Button className = {styles.setting__button} />
            <Button className = {styles.setting__button} />
            <Button className = {styles.setting__button} />
            <Button className = {styles.setting__button} />
            </div>
          </div>
       </section>
    </section>
 )
}
export default Board;