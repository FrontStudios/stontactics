import clsx from "clsx";

import styles from "./languagecontrolls.module.scss";

const LanguageControlls = () => {
  return (
    <section className={styles.language__controller}>
      <div className={clsx(styles.language, styles.choosen)}>RUS</div>
      <div className={styles.language}>ENG</div>
      <div className={styles.language}>POR</div>
      <div className={styles.language}>FRA</div>
    </section>
  );
};
export default LanguageControlls;
