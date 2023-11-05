import styles from './board.module.scss'

import Button from './buttons/Button';

import Canvas from './canvas/Canvas';
import MapsController from './mapsController/MapsController';
import StrategyController from './strategyController/StrategyController';

// img
import pencil from '../../../../img/icons/Subtract-6.svg'
import eraser from '../../../../img/icons/Vector 296 (Stroke).svg'
import dialog from '../../../../img/icons/Subtract-7.svg'
import image from '../../../../img/icons/Union-3.svg'
import video from '../../../../img/icons/Subtract-8.svg'
import warning from '../../../../img/icons/warning-fill.svg'
import shield from '../../../../img/icons/shield.svg'
import bomb from '../../../../img/icons/Union-4.svg'
import location from '../../../../img/icons/Subtract-9.svg'
import scope from '../../../../img/icons/Union-5.svg'
import star from '../../../../img/icons/Star 3.svg'
import flag from '../../../../img/icons/Union-6.svg'
import clock from '../../../../img/icons/clock-fill.svg'
import fullScreen from '../../../../img/icons/Union-2.svg'
import back from '../../../../img/icons/Vector (Stroke)-1.svg'
import forward from '../../../../img/icons/Vector (Stroke).svg'
import trash from '../../../../img/icons/Subtract-5.svg'
import axis from  '../../../../img/icons/Vector-3.svg'
import folder from '../../../../img/icons/Subtract-4.svg'
import brushOne from '../../../../img/icons/burshOne.svg'
import brushTwo from '../../../../img/icons/BrushTwo.svg'
import brushThree from '../../../../img/icons/BrushThree.svg'
import brushFour from '../../../../img/icons/brushFour.svg'
import brushFive from '../../../../img/icons/brushFive.svg'
import brushSix from '../../../../img/icons/brushSix.svg'


const Board = () => {
 return (
    <section className={styles.board}>
      <section className={styles.map__instruments}>
        <div className={styles.map__wrapper}>
         <Button ico ={pencil}/>
         <Button ico ={eraser}/>
         <Button ico ={dialog}/>
         <Button ico ={image}/>
         <Button ico ={video}/>
         <Button ico ={warning}/>
         <Button ico ={shield}/>
         <Button ico ={bomb}/>
         <Button ico ={location}/>
         <Button ico ={scope}/>
         <Button ico ={star}/>
         <Button ico ={flag}/>
         <Button ico ={clock}/>
        </div>
      </section>

        <section className={styles.canvas__wrapper}>
            <Canvas />
        </section> 
       <section className={styles.other__instruments}>
         <div className={styles.other__wrap}>
          <Button ico ={fullScreen} />
          <Button ico ={back} />
          <Button ico ={forward} />
          <Button ico ={trash} />
          <Button ico ={axis} />
          <Button ico ={folder} />
         </div>
       </section>
       <section className={styles.drawing__instruments}>
           <div className={styles.strategy__stages}>
             <p className={styles.stages__title}>этапы стратегии:</p>
              <div className={styles.stages}>
                 <StrategyController number = "1" status ={styles.first} />
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
              <MapsController map ={styles.rust} mapName = "rust"  />
              <MapsController map ={styles.province} mapName = "province"  />
              <MapsController map ={styles.sandstone} mapName = "sandstone" />
              <MapsController map ={styles.sakura} mapName = "sakura"  />
              <MapsController map ={styles.dune} mapName = "dune"  />
              <MapsController map ={styles.breeze} mapName = "breeze"  />
              <MapsController map ={styles.zone} mapName = "zone 9 "  />
             </div>
          </div>
          <div className={styles.draw__setting}>
            <p className={styles.draw__title}>настройка кисти:</p>
            
            <div className={styles.line__types}>
            <Button ico={brushOne}/>
            <Button ico={brushTwo}/>
            <Button ico={brushThree}/>
            <Button ico={brushFour}/>
            <Button ico={brushFive}/>
            <Button ico={brushSix}/>
            </div>
          </div>
       </section>
    </section>
 )
}
export default Board;