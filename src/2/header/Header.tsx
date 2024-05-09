import styles from "./Header.module.css";

interface IProps {
  onSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header = (props: IProps) => {
  const { onSearchInputChange } = props;

  return (
    <header className={styles["report-header"]}>
      <h1 className={styles["title"]}>Report2</h1>
      <div className={styles["search-input-wrapper"]}>
        <input
          className={styles["search-input"]}
          type="search"
          placeholder="제목으로 검색하기"
          onChange={onSearchInputChange}
        />
        <button className={styles["search-button"]}>검색</button>
      </div>
    </header>
  );
};

export default Header;
