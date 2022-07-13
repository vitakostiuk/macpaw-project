import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { ReactComponent as Like } from 'images/like-color-20.svg';
import { ReactComponent as Favorite } from 'images/fav-color-20.svg';
import { ReactComponent as Dislike } from 'images/dislike-color-20.svg';
import s from './UserActionLogs.module.css';

const UserActionLogs = ({ time, id, emoji }) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [dislikeStatus, setDislikeStatus] = useState(false);
  const [favouriteStatus, setFavouriteStatus] = useState(false);

  useEffect(() => {
    if (emoji === 'Likes') {
      setLikeStatus(true);
    }

    if (emoji === 'Dislikes') {
      setDislikeStatus(true);
    }

    if (emoji === 'Favourites') {
      setFavouriteStatus(true);
    }
  }, [emoji]);

  return (
    <>
      <span className={s.Time}>{time}</span>
      <p className={s.Text}>
        Image ID: <span className={s.Id}>{id}</span> {`was added to ${emoji}`}
      </p>
      {likeStatus && <Like />}
      {dislikeStatus && <Dislike />}
      {favouriteStatus && <Favorite />}
    </>
  );
};

UserActionLogs.propTypes = {
  time: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
};

export default UserActionLogs;
