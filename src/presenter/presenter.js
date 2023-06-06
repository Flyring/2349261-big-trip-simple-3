import CreationForm from '../view/creationForms';
import EditingForm from '../view/editForms';
import Sorting from '../view/sorting';
import EventItem from '../view/eventItem';
import EventList from '../view/eventList';
import {render} from '../render';

export default class BoardPresenter {
  waypointListComponent = new EventList();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new Sorting(), this.boardContainer);
    render(this.waypointListComponent, this.boardContainer);
    render(new CreationForm(), this.waypointListComponent.getElement());
    render(new EventItem(), this.waypointListComponent.getElement());
    render(new EditingForm(), this.waypointListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventItem(), this.waypointListComponent.getElement());
    }
  }
}
