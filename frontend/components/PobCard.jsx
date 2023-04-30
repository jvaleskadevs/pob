import styles from "../styles/Pobs.module.css";
export default function PobCard({ title, image, balance }) {
  return (
    <div className={styles.card_container}>
      <div className={styles.image_container}>
        <img src={image}></img>
      </div>
      <div className={styles.info_container}>
        <div className={styles.title_container}>
          <h3>{title}</h3>
        </div>
        <p>Balance: {balance}</p>
      </div>
    </div>
  );
}
