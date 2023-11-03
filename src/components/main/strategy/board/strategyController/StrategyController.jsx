import styles from './strategycontroller.module.scss'

const StrategyController = (props) => {
  return (
    <div className={`${styles.strategy__controller} ${props.status}`}>
     {props.number}
    </div>
  )
}
export default StrategyController;