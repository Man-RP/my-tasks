import styles from "./App.module.css";
import NewTask from "./components/NewTask";

function App() {
  return (
    <div role="main" className={styles.App}>
      <NewTask />
    </div>
  );
}

export default App;
