import eventManager from "./EventManager.ts";

export default class EventSeeder {
  public static seed() {
    const events = {
      1: {
        name: 'Hike through the Grand Canyon',
        maxAttendeeId: 22,
        maxPollId: 1,
        polls: [{
          id: 1,
          question: 'Are you having fun?',
          options: ['Yes', 'No', 'I\'m getting there'],
          answers: [{option: 'Yes', voters: [1,12,19]}, {option: 'No', voters: [22]}, {option: 'I\'m getting there', voters: [3]}]
        }],
        attendees: [{
          id: 1,
          email: 'johndoe@example.com',
          name: 'John Doe',
        },
        {
          id: 3,
          email: 'bgates@example.com',
          name: 'Bill Gates',
        },
        {
          id: 12,
          email: 'sjobs@example.com',
          name: 'Steve Jobs',
        },
        {
          id: 19,
          email: 'scooby@example.com',
          name: 'Scooby Doo',
        },
        {
          id: 22,
          email: 'bbuilder@example.com',
          name: 'Bobby The Builder',
        },
        ]
      },
      2: {
        name: 'Technology and Java - Morning Coffee Tech Talks',
        maxAttendeeId: 2,
        maxPollId: 0,
        attendees: [{
          id: 2,
          email: 'janedoe@example.com',
          name: 'Jane Doe',
        }]
      }
    };

    for(const eventId in events) {
      eventManager.addEvent(parseInt(eventId), events[eventId]);
    }
  }
}