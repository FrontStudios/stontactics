import styles from './mapscontroller.module.scss'

const MapsController = (props) => {
 return (
   <div className={`${styles.map} ${props.map}`}>
    <p className={styles.map__name}>{props.mapName}</p>
  </div>
 )
}
export default MapsController