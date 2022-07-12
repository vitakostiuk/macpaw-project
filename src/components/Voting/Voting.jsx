import { useState, useEffect } from 'react';
import userActionsLogs from '../../data/userActionsLogs.json';
import { ReactComponent as Like } from 'images/like-white-30.svg';
import { ReactComponent as Favorite } from 'images/fav-white-30.svg';
import { ReactComponent as Dislike } from 'images/dislike-white-30.svg';
import { ReactComponent as ArrowLeftBtn } from 'images/back-20.svg';
import * as api from '../../services/api-cat';
import s from './Voting.module.css';

const VotingBlock = () => {
  const [oneRandonCat, setOneRandonCat] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [isClickVoting, setIsClickVoting] = useState(true);
  const [isClickLike, setIsClickLike] = useState(false);

  // First fetch random cat and fetch after each click on button VOTING
  useEffect(() => {
    const fetchRandomCat = async () => {
      try {
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
      }
    };
    fetchRandomCat();
  }, [isClickVoting]);

  // Add LIKE to image cat
  useEffect(() => {
    if (!isClickLike) return;

    const voteRequestBody = {
      image_id: oneRandonCat[0].id,
      value: 1,
      sub_id: 'User-Vita',
    };

    const addLike = async () => {
      try {
        if (isClickLike) {
          const result = await api.addVote('votes', voteRequestBody);
          console.log(result);
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
        <img src={imageUrl} alt="cat" className={s.Img}></img>
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
          <button type="button" className={s.EmojiBtn}>
            <Favorite />
          </button>
        </li>
        <li className={s.Item}>
          <button type="button" className={s.EmojiBtn}>
            <Dislike />
          </button>
        </li>
      </ul>

      <ul className="userActionLogs">
        {userActionsLogs.map(({ time, id, emoji }) => (
          <li key={id}>
            <div>{time}</div>
            <p>{`Image ID: ${id} was added to ${emoji}`}</p>
            <img src="" alt="emoji"></img>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VotingBlock;
