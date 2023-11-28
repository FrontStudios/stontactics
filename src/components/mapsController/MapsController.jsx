import clsx from "clsx";

import styles from "./mapscontroller.module.scss";

const MapsController = ({ map, mapName, secondClass, selectMap }) => {
  return (
    <div className={clsx(styles.map, styles[mapName], styles[secondClass])} onClick={() => selectMap(mapName)}>
      <p className={styles.map__name}>{map}</p>
    </div>
  );
};
export default MapsController;
