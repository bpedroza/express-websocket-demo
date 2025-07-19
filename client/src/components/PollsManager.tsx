import { useActionState, useRef, useState } from "react";
import API from "../API";

async function addPollAction(prevState: { success: boolean | null, message: string, question: string }, formData: FormData): Promise<{ success: boolean | null, message: string, question: string }> {

  try {
    const response = await API.postJSON("/poll", {
      question: formData.get('question'),
      options: formData.getAll('options'),
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

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddQuestion();
      e.preventDefault();
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
        <input type="text" name="option" onKeyDown={handleEnterPress} className="input" ref={currQuestion} />
        <button type="button" onClick={handleAddQuestion} style={{ marginLeft: '4px' }} className="sm outline">Add Option</button>
        {options.length == 0 && <p>Add an option.</p>}
        {options.map((option) => <input key={option} type="hidden" name="options[]" value={option} />)}
        <table>
          <tbody>
            {options.map((option) =>
            (
              <tr key={option}>
                <td>{option}</td>
                <td><button type="button" className="danger sm">&times;</button></td>
              </tr>
            )
            )}
          </tbody>
        </table>
        <button disabled={isPending}>Save Poll</button>
      </form>
    </>
  );
}

export default PollsManager;