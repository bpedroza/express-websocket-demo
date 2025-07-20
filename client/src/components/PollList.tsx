import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import type { Poll as PollType} from '../types/Poll';
import Poll from './Poll';
import PollResults from './PollResults';
const hasVoted = function(poll: PollType, userId: number): boolean {
  for(const ans of poll.answers) {
    if(ans.voters.indexOf(userId) !== -1) {
      return true;
    }
  }
  return false;
}

function PollList({ polls }: { polls: PollType[] }) {
  const user = useContext(UserContext);
  return (
    <ul id="poll-list">
      {polls.length === 0 && <li key={-1}>No Polls Yet.</li>}
      {polls.map((poll: PollType) =>
      (
        <li key={poll.id}>
          { hasVoted(poll, user.id) ? <PollResults poll={poll} /> : <Poll poll={poll} /> }
        </li>
      )
      )}
    </ul>
  )
}

export default PollList
