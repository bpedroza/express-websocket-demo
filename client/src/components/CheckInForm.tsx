import { useActionState, useEffect } from "react";
import API from "../API";

async function addAttendeeAction(prevState: { success: boolean | null, message: string }, formData: FormData): Promise<{ success: boolean | null, message: string }> {

  try {
    const response = await API.postJSON('/attendee/check-in', {
      eventId: formData.get('eventId'),
      name: formData.get('name'),
      email: formData.get('email'),
      isAdmin: formData.get('isAdmin'),
    });

    if (response.status == 204) {
      return {
        success: true,
        message: 'All Good.'
      }
    } else {
      const json = await response.json();
      return {
        success: false,
        message: json.message ?? 'Oops! Something went wrong!'
      }
    }

  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: 'Oops! Something went wrong!'
    }
  }

}

function CheckInForm({ eventId, buttonText, showAdminCheck = false, onSuccess = () => { } }: { eventId: string, buttonText: string, showAdminCheck?: boolean, onSuccess?: Function }) {
  const [formState, formAction, isPending] = useActionState(addAttendeeAction, { success: null, message: '' });

  useEffect(() => {
    if (formState.success === true) {
      onSuccess();
    }
  }, [formState]);

  return (
    <form action={formAction}>
      <div id="error-alert" className={formState.success === false ? 'active' : ''}>
        {formState.message}
      </div>
      <input type="hidden" name="eventId" defaultValue={eventId} />
      <div className="input-group">
        <label htmlFor="email-input" className="form-label">Email address</label>
        <input type="email" name="email" required className="form-control" id="email-input" placeholder="name@example.com" />
      </div>
      <div className="input-group">
        <label htmlFor="name-input" className="form-label">Name</label>
        <input type="text" name="name" required className="form-control" id="name-input" placeholder="John Doe" />
      </div>
      {showAdminCheck && (
        <div className="input-group">
          <label htmlFor="admin-input" className="form-label">
            Log in as Admin?
            <input type="checkbox" name="isAdmin" className="form-control" id="admin-input" value="1" />
          </label>
        </div>
      )}
      <button disabled={isPending}>{buttonText}</button>
    </form>
  )
}

export default CheckInForm;