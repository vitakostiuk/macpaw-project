import { BallTriangle } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import UserActionLogs from '../UserActionLogs';
import { ReactComponent as Like } from 'images/like-white-30.svg';
import { ReactComponent as Favorite } from 'images/fav-white-30.svg';
import { ReactComponent as Dislike } from 'images/dislike-white-30.svg';
import { ReactComponent as ArrowLeftBtn } from 'images/back-20.svg';
import * as api from '../../services/api-cat';
import s from './Voting.module.css';

const getTime = () => {
  const date = new Date().toLocaleTimeString();
  console.log(date.slice(0, 5));
  // return date.slice(3, date.length);
  return date.slice(0, 5);
};

const VotingBlock = () => {
  const [oneRandonCat, setOneRandonCat] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [actionLogs, setActionLogs] = useState([]);
  const [isClickVoting, setIsClickVoting] = useState(true);
  const [isClickLike, setIsClickLike] = useState(false);
  const [isClickDislike, setIsClickDislike] = useState(false);
  const [isClickFavourite, setIsClickFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // First fetch random cat and fetch after each click on button VOTING
  useEffect(() => {
    const fetchRandomCat = async () => {
      try {
        setIsLoading(true);
        if (isClickVoting) {
          const cat = await api.getData('images/search');
          setOneRandonCat(cat);
          setImageUrl(cat[0].url);
          console.log(cat);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsClickVoting(false);
        setIsLoading(false);
      }
    };
    fetchRandomCat();
  }, [isClickVoting]);

  // Add LIKE
  useEffect(() => {
    if (!isClickLike) return;

    const voteRequestBodyLike = {
      image_id: oneRandonCat[0].id,
      value: 1,
      sub_id: 'User-Vita',
    };

    const addLike = async () => {
      try {
        if (isClickLike) {
          const result = await api.addVote('votes', voteRequestBodyLike);
          console.log(result);
          setActionLogs(prevActionLogs => [
            { time: getTime(), id: oneRandonCat[0].id, emoji: 'Likes' },
            ...prevActionLogs,
          ]);
          setIsClickLike(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsClickVoting(false);
      }
    };
    addLike();
  }, [isClickLike, oneRandonCat]);

  // Add DISLIKE
  useEffect(() => {
    if (!isClickDislike) return;

    const voteRequestBodyDislike = {
      image_id: oneRandonCat[0].id,
      value: 0,
      sub_id: 'User-Vita',
    };

    const addDislike = async () => {
      try {
        if (isClickDislike) {
          const result = await api.addVote('votes', voteRequestBodyDislike);
          console.log(result);
          setActionLogs(prevActionLogs => [
            { time: getTime(), id: oneRandonCat[0].id, emoji: 'Dislikes' },
            ...prevActionLogs,
          ]);
          setIsClickDislike(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsClickVoting(false);
      }
    };
    addDislike();
  }, [isClickDislike, oneRandonCat]);

  // Add FAVOURITE
  useEffect(() => {
    if (!isClickFavourite) return;

    const voteRequestBodyFavourite = {
      image_id: oneRandonCat[0].id,
      sub_id: 'User-Vita',
    };

    const addFavourite = async () => {
      try {
        if (isClickFavourite) {
          const result = await api.addVote(
            'favourites',
            voteRequestBodyFavourite,
          );
          console.log(result);
          setActionLogs(prevActionLogs => [
            { time: getTime(), id: oneRandonCat[0].id, emoji: 'Favourites' },
            ...prevActionLogs,
          ]);
          setIsClickFavourite(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsClickVoting(false);
      }
    };
    addFavourite();
  }, [isClickFavourite, oneRandonCat]);

  return (
    <div className={s.Paper}>
      <div className={s.BtnWrapper}>
        <button type="button" className={s.LeftArrowBtn}>
          <ArrowLeftBtn />
        </button>
        <button
          type="button"
          onClick={() => setIsClickVoting(true)}
          className={s.BigButton}
        >
          VOTING
        </button>
      </div>

      <div className={s.ImgWrapper}>
        {isLoading && (
          <BallTriangle
            height="100"
            width="100"
            color="#ff868e"
            ariaLabel="loading"
          />
        )}
        {!isLoading && <img src={imageUrl} alt="cat" className={s.Img}></img>}
      </div>

      <ul className={s.EmojiPage}>
        <li className={s.Item}>
          <button
            type="button"
            className={s.EmojiBtn}
            onClick={() => setIsClickLike(true)}
          >
            <Like />
          </button>
        </li>
        <li className={s.Item}>
          <button
            type="button"
            className={s.EmojiBtn}
            onClick={() => setIsClickFavourite(true)}
          >
            <Favorite />
          </button>
        </li>
        <li className={s.Item}>
          <button
            type="button"
            className={s.EmojiBtn}
            onClick={() => setIsClickDislike(true)}
          >
            <Dislike />
          </button>
        </li>
      </ul>

      {
        <ul className={s.ActionList}>
          {actionLogs.map(({ time, id, emoji }) => (
            <li key={id} className={s.ActionItem}>
              <UserActionLogs time={time} id={id} emoji={emoji} />
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default VotingBlock;
