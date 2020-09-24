import { html, customElement, LitElement, property } from 'lit-element';
import styles from './time-picker-css';

@customElement('orxe-time-picker')
export default class OrxeTimePicker extends LitElement {
  timeSlotDiff: Number = 0;

  @property()
  set timeIntervalInMinutes(value: Number) {
    if (value === null || value === undefined) {
      value = 30;
    }
    this.timeSlotDiff = value;
    this.createTimeInterval(value);
  }

  @property() selectedTimeRange = null;

  @property({ type: String, reflect: true, attribute: 'inputTitle' })
  inputTitle = 'Select Time';

  @property({ type: Boolean, reflect: true, attribute: 'closed' })
  closed = true;

  @property({ reflect: true, attribute: 'placeholder' })
  placeholder = {
    display: true,
    text: 'select time range'
  };

  tempTimeSlot: string[] = [];
  midnight: string = 'Midnight';
  noon: string = 'Noon';

  constructor() {
    super();
    if (this.selectedTimeRange) {
      this.placeholder.display = false;
    }
  }

  createTimeInterval(timeIntervalInMinutes) {
    let x = Number(timeIntervalInMinutes); //input from user as minutes gap
    let startTime = 0; // starting time
    let ap = ['AM', 'PM'];

    for (let i = 0; startTime < 24 * 60; i++) {
      let hh = Math.floor(startTime / 60);
      let mm = (startTime % 60);
      this.tempTimeSlot[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)];
      if (this.tempTimeSlot[i] === '00:00AM') {
        this.tempTimeSlot[i] = this.midnight;
      }
      if (this.tempTimeSlot[i] === '00:00PM') {
        this.tempTimeSlot[i] = this.noon;
      }
      startTime = startTime + x;
    }
  }

  /**
   * Implement `render` to define a template for button element.
   */
  render() {
    return html`
    <div class='label'>${this.inputTitle}</div>

    <div class='head' @click='${this.toggleMenu}'>
      <div>${this.selectedTimeRange}</div>
      ${this.placeholder.display ? html`<span class="placeholder">${this.placeholder.text}</span>` :
        html``}
    </div>
    
    <div class="container ${this.closed ? 'closed' : 'open'}">
      ${this.tempTimeSlot.map(item => html`
        <div class="dropdown">
          <label class="list-item" for="${item}">
            <input type="radio" id="${item}" name="timeSlot" @click=${this.updateSlot}
              value="${item}">
            ${item}
          </label><br>
        </div>
      `)}
    </div>
    `;
  }

  toggleMenu() {
    this.closed = !this.closed;
  }

  updateSlot(target) {
    this.selectedTimeRange = target.srcElement.value;
    this.closed = !this.closed;
    if (this.selectedTimeRange) {
      this.placeholder.display = false;
    }
    const customEvent = new CustomEvent('selectionChanged', {
      detail: {
        option: this.selectedTimeRange
      }
    });
    this.dispatchEvent(customEvent);
  }

  /**
   *  Getting styles from components custom scss file
   */
  static styles = styles;
}
