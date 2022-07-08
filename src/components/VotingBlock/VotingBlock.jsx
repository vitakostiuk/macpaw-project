import Paper from '../common/Paper';
import Button from '../Button';
import userActionsLogs from '../../data/userActionsLogs.json';

const VotingBlock = () => {
  return (
    <div>
      <Paper>
        <button type="button"></button>
        <Button>VOTING</Button>
        <img src="" alt="cat"></img>
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
      </Paper>
    </div>
  );
};

export default VotingBlock;
