import {FilterType, FilterTypeDescriptions, UpdateType} from '../mock/const';
import Filters from '../view/filters';
import {render} from '../render';
import {remove, replace} from '../framework/render';


export default class FilterPresenter {
  #filterContainer = null;
  #modelFilter = null;
  #modelWaypoints = null;

  #filterComponent = null;

  constructor({filterContainer, modelFilter, modelWaypoints}) {
    this.#filterContainer = filterContainer;
    this.#modelFilter = modelFilter;
    this.#modelWaypoints = modelWaypoints;

    this.#modelWaypoints.addObserver(this.#handleModelEvent);
    this.#modelFilter.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return [FilterType.EVERYTHING, FilterType.FUTURE, FilterType.PAST].map((type) => ({ type, name: FilterTypeDescriptions[type]}));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new Filters({
      filters,
      currentFilterType: this.#modelFilter.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#modelFilter.filter === filterType) {
      return;
    }

    this.#modelFilter.setFilter(UpdateType.MAJOR, filterType);
  };
}
