/**
 * Class to manager rendering the attendee list
 */
class AttendeeList {
  #listElement;
  #orderBy;

  constructor(listElement, orderBy = 'name') {
    this.#listElement = listElement;
    this.#orderBy = orderBy;
    this.addNoAttendeeMessage();
  }

  addAttendee(payload, addOn = null) {
    this.removeNoAttendeeMessage();
    const listItem = document.createElement('li');
    // We only need things we allow sorting by in the data set
    listItem.dataset.name = payload.name;
    listItem.dataset.email = payload.email;
    const name = document.createElement('span');
    name.appendChild(document.createTextNode(`${payload.name} (${payload.email})`))
    listItem.appendChild(name);
    if(addOn !== null) {
      listItem.appendChild(addOn);
    }
    
    listItem.id = 'attendee-' + payload.id;
    this.#insertInOrder(listItem);
  }

  addNoAttendeeMessage() {
    const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode('No Attendees Yet.'));
    listItem.id = 'attendee--0';
    this.#listElement.appendChild(listItem);
  }

  clear() {
    this.#listElement.innerHTML = '';
    this.addNoAttendeeMessage();
  }

  removeAttendee(id) {
    document.getElementById('attendee-' + id)?.remove();
    if(this.#listElement.children.length == 0 && id !== '-0') {
      this.addNoAttendeeMessage();
    }
  }

  removeNoAttendeeMessage() {
    this.removeAttendee('-0');
  }

  #insertInOrder(item) {
    if(this.#listElement.children.length === 0) {
      this.#listElement.appendChild(item);
      return;
    }
    // Use a binary search to find the element we should insert next to
    const newCompare = item.dataset[this.#orderBy];
    let low = 0;
    let high = this.#listElement.children.length;
    let mid, middleElement, middleCompare;

    while(low < high) {
      mid = Math.floor((low + high) / 2);
      middleElement = this.#listElement.children[mid];
      middleCompare = middleElement.dataset[this.#orderBy];
      if(newCompare === middleCompare) {
        break;
      } else if (newCompare > middleCompare) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    if(newCompare < middleCompare) {
      middleElement.before(item);
    } else {
      middleElement.after(item);
    }
  }
}