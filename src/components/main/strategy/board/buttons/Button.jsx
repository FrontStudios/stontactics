import styles from './button.module.scss'

const Button = (props) => {
 return (
    <div className={props.className} >
      <img src="" alt="" className={styles.button__img} />
    </div>
 )
}
export default Button