import styles from "../styles/Home.module.css";
import MenuComponent from "../components/MenuComponent";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <MenuComponent></MenuComponent>
      </main>
    </div>
  );
}
