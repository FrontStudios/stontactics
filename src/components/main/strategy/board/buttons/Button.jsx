import styles from './button.module.scss'

const Button = (props) => {
 return (
    <div className={`${styles.setting__button} ${props.secondClass}`} >
      <img src={props.ico} alt="" className={styles.button__img} />
    </div>
 )
}
export default Button