/** NOTE
 *  "loading" is a reserved file name.
 *
 *  this will automatically will be displayed by next js
 *  when a sibling file or a nested file is loading data
 * 
 * but this does not provide better customization, hence using suspense
 */

import styles from "./loading.module.css";

export default function Loading() {
  return <p className={styles.loading}>Fetching meals....</p>;
}
