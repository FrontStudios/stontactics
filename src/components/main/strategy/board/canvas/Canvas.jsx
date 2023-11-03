import styles from './canvas.module.scss'

import rust from '../../../../../img/maps/Раст Т.svg'

const Canvas = () => {
  return (
      <img src={rust} alt="" className={styles.canvas} /> 
  )
}
export default Canvas;