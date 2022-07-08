import { ReactComponent as Like } from '../../../images/like-color-30.svg';
import { ReactComponent as Favorite } from '../../../images/fav-color-30.svg';
import { ReactComponent as Dislike } from '../../../images/dislike-color-30.svg';

const EmojiPage = () => {
  return (
    <ul>
      <li>
        <a href="/">
          <Like />
        </a>
      </li>
      <li>
        <a href="/">
          <Favorite />
        </a>
      </li>
      <li>
        <a href="/">
          <Dislike />
        </a>
      </li>
    </ul>
  );
};

export default EmojiPage;
