import { useActionState, useRef, useState} from "react";

async function addPollAction(prevState: { success: boolean | null, message: string, question: string }, formData: FormData): Promise<{ success: boolean | null, message: string, question: string }> {

  try {
    const response = await fetch("/api/poll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: formData.get('question'),
        options: formData.getAll('options'),
      }),
    });

    if (response.status == 204) {
      return {
        success: true,
        message: 'All Good.',
        question: ''
      }
    } else {
      const json = await response.json();
      return {
        success: false,
        message: json.message ?? 'Oops! Something went wrong!',
        question: formData.get('question')?.toString() ?? ''
      }
    }

  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: 'Oops! Something went wrong!',
      question: formData.get('question')?.toString() ?? ''
    }
  }

}

function PollsManager() {
  const [formState, formAction, isPending] = useActionState(addPollAction, { success: null, message: '', question: '' });
  const [options, setOptions] = useState<string[]>([]);
  const currQuestion = useRef<HTMLInputElement>(null);

  const handleAddQuestion = () => {
    if (currQuestion.current && currQuestion.current.value.trim().length > 0) {
      const val = currQuestion.current.value;
      setOptions(curr => [...curr, val]);
      currQuestion.current.value = '';
    }
  }
  return (
    <>
      <h2>Polls manager here!</h2>
      <form action={formAction}>
        <div className="input-group">
          <label>Poll Question</label>
          <input name="question" defaultValue={formState.question} required className="form-control" />
        </div>
        <h3>Options</h3>
        <input type="text" name="option" className="input" ref={currQuestion} />
        <button type="button" onClick={handleAddQuestion} style={{ marginLeft: '4px' }} className="sm outline">Add Option</button>
        {options.length == 0 && <p>Add an option.</p>}
        { options.map((option) => <input type="hidden" name="options[]" value={option} />) }
        <table>
          {options.map((option) =>
          (
            <tr key={option}>
              <td>{option}</td>
              <td><button type="button" className="danger sm">&times;</button></td>
            </tr>
          )
          )}
        </table>
        <button disabled={isPending}>Save Poll</button>
      </form>
    </>
  );
}

export default PollsManager;