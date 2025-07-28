import { useContext } from 'react';
import type { Poll as PollType } from '../types/Poll';
import { UserContext } from '../context/UserContext';
import API from '../API';

function Poll({ poll }: { poll: PollType }) {
  const user = useContext(UserContext);
  console.log(poll);
  const handleVote = (answer: string) => {
    API.postJSON("/poll/vote", {
      pollId: poll.id,
      answer: answer
    });
  }

  return (
    <div className='poll-wrapper'>
      <div className='poll-heading'>
        {poll.question}
      </div>
      <div className='poll-options-wrapper'>
        {poll.options.map((opt: string) => (
          <div key={opt} role="button" onClick={() => handleVote(opt)} className='poll-option'>{opt}</div>
        ))}
      </div>
    </div>
  )
}

export default Poll
