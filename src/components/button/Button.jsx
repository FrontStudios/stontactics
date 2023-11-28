import clsx from "clsx";
import styles from "./button.module.scss";

const Button = ({ ico, secondClass, onClick = () => null}) => {
  return (
    <button
      className={clsx(styles.setting__button, styles[secondClass])}
      onClick={onClick}
    >
      <img src={ico} alt="" />
    </button>
  );
};
export default Button;
