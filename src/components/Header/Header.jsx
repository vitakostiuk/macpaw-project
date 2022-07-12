import SearchBar from './SearchBar';
import EmojiPage from './EmojiPage';
import s from './Header.module.css';

const Header = () => {
  return (
    <header className={s.Header}>
      <SearchBar />
      <EmojiPage />
    </header>
  );
};

export default Header;
