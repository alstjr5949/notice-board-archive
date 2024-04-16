import { useNavigate } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  const navigate = useNavigate();

  const handleBoardListClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    navigate(`/report/${parseInt(e.currentTarget.innerText)}`);
  };

  return (
    <>
      <header className={styles["header"]}>
        <h1 className={styles["title"]}>Notice Board Archive</h1>
      </header>
      <main className={styles["main"]}>
        <ul className={styles["board-list-section"]}>
          <li onClick={handleBoardListClick}>1</li>
          <li onClick={handleBoardListClick}>2</li>
          <li onClick={handleBoardListClick}>3</li>
          <li onClick={handleBoardListClick}>4</li>
          <li onClick={handleBoardListClick}>5</li>
          <li onClick={handleBoardListClick}>6</li>
          <li onClick={handleBoardListClick}>7</li>
          <li onClick={handleBoardListClick}>8</li>
          <li onClick={handleBoardListClick}>9</li>
          <li onClick={handleBoardListClick}>10</li>
          <li onClick={handleBoardListClick}>11</li>
          <li onClick={handleBoardListClick}>12</li>
        </ul>
      </main>
    </>
  );
}

export default App;
