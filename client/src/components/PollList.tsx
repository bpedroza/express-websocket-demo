import type { Poll as PollType} from '../types/Poll';
import Poll from './Poll';

function PollList({ polls }: { polls: PollType[] }) {

  return (
    <ul id="poll-list">
      {polls.length === 0 && <li>No Polls Yet.</li>}
      {polls.map((poll: PollType) =>
      (
        <li key={poll.id}>
          <Poll poll={poll} />
        </li>
      )
      )}
    </ul>
  )
}

export default PollList
