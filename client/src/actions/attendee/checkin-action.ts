import API from "../../API";
import type { User } from "../../types/User";

export type CheckInState = {
  success: boolean | null;
  message: string;
  user: User | null;
};

export const checkInAction = async function (prevState: CheckInState, formData: FormData): Promise<CheckInState> {

  try {
    const response = await API.postJSON('/attendee/check-in', {
      eventId: formData.get('eventId'),
      name: formData.get('name'),
      email: formData.get('email'),
      isAdmin: formData.get('isAdmin'),
    });

    if (response.status == 200) {
      const user = await response.json();
      return {
        success: true,
        message: 'All Good.',
        user: user
      }
    } else {
      const json = await response.json();
      return {
        success: false,
        message: json.message ?? 'Oops! Something went wrong!',
        user: null
      }
    }

  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: 'Oops! Something went wrong!',
      user: null
    }
  }
}