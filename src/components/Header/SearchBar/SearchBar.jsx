import { ReactComponent as SearchSvg } from 'images/search-20.svg';
import s from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={s.Wrapper}>
      <input placeholder="Search for breeds by name" className={s.Input} />
      <button className={s.Btn}>
        <SearchSvg />
      </button>
    </div>
  );
};

export default SearchBar;
