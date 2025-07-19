import type { Poll as PollType } from '../types/Poll';

function Poll({ poll }: { poll: PollType }) {

  return (
    <div className='poll-wrapper'>
      <div className='poll-heading'>
        {poll.question}
      </div>
      <div className='poll-options-wrapper'>
        {poll.options.map((opt: string) => (
          <div role="button" className='poll-option'>{opt}</div>
        ))}
      </div>
    </div>
  )
}

export default Poll
