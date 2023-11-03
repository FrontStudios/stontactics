import styles from './button.module.scss'

const Button = ({ ico,onClick,props }) => {
 return (
    <div className={styles.button}>
      <img src={ico} alt="" className={styles.button__img} />
    </div>
 )
}
export default Button