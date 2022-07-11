import Section from '../common/Section';
import Button from '../common/Button';
import userActionsLogs from '../../data/userActionsLogs.json';
import catImg from 'images/image-cat.png';
import { ReactComponent as ArrowLeftBtn } from 'images/back-20.svg';

const VotingBlock = () => {
  return (
    <div>
      <Section>
        <button type="button">
          <ArrowLeftBtn />
        </button>
        <Button>VOTING</Button>
        <img src={catImg} alt="cat"></img>
        <ul className="emojiList">
          <li>Like</li>
          <li>Favorite</li>
          <li>Dislike</li>
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
      </Section>
    </div>
  );
};

export default VotingBlock;
