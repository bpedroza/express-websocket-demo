import type { Poll as PollType } from '../types/Poll';

function PollResults({ poll }: { poll: PollType }) {
  const total = poll.answers.reduce((acc, curr) => {
    return acc + curr.voters.length;
  }, 0);
  return (
    <div className='poll-wrapper'>
      <div className='poll-heading'>
        {poll.question}
      </div>
      <div className='poll-options-wrapper'>
        {poll.answers.map(({option, voters}) => (
          <div key={option}>
            <label>{option}</label><br />
            <progress  max={total} value={voters.length} className='poll-answer'>{voters.length}</progress>
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default PollResults;
