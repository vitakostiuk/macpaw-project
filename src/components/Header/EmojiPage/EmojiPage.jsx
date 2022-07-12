import { ReactComponent as Like } from '../../../images/like-color-30.svg';
import { ReactComponent as Favorite } from '../../../images/fav-color-30.svg';
import { ReactComponent as Dislike } from '../../../images/dislike-color-30.svg';
import s from './EmojiPage.module.css';

const EmojiPage = () => {
  return (
    <ul className={s.EmojiPage}>
      <li className={s.Item}>
        <a href="/" className={s.Link}>
          <Like />
        </a>
      </li>
      <li className={s.Item}>
        <a href="/" className={s.Link}>
          <Favorite />
        </a>
      </li>
      <li className={s.Item}>
        <a href="/" className={s.Link}>
          <Dislike />
        </a>
      </li>
    </ul>
  );
};

export default EmojiPage;
