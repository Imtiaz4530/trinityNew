import { BeatLoader } from "react-spinners";

import styles from "./loading.module.css"

const Loading = () => {
  return (
      <div className={styles.loaderContainer}>
        <BeatLoader color="#007bff" size={15} margin={3} />
        <p>Loading story...</p>
      </div>
  )
}

export default Loading
