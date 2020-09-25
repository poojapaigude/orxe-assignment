var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { html, customElement, LitElement, property } from 'lit-element';
import styles from './time-picker-css';
let OrxeTimePicker = class OrxeTimePicker extends LitElement {
    constructor() {
        super();
        this.timeInterval = '30';
        this.selectedTimeRange = '';
        this.inputTitle = 'Pick Your Time';
        this.closed = true;
        this.placeholder = {
            display: true,
            text: 'select time range'
        };
        this.tempTimeSlot = [];
        this.midnight = 'Midnight';
        this.noon = 'Noon';
        this.index = 0;
        if (this.selectedTimeRange) {
            this.placeholder.display = false;
        }
        if (!this.timeInterval) {
            this.createTimeInterval('30');
        }
    }
    firstUpdated() {
        this.createTimeInterval(this.timeInterval);
    }
    createTimeInterval(timeIntervalInMinutes) {
        let x = Number(timeIntervalInMinutes);
        let startTime = 0;
        let ap = ['AM', 'PM'];
        let store = 0;
        const d = new Date();
        const hr = d.getHours();
        const min = d.getMinutes();
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
            const selectedInterval = this.tempTimeSlot[i];
            if (hr === hh) {
                if (min >= store && min >= mm) {
                    this.index = i;
                    this.selectedTimeRange = selectedInterval;
                }
                store = mm;
            }
        }
    }
    render() {
        return html `
    <div class='label'>${this.inputTitle}</div>

    <div class='head' @click='${this.toggleMenu}'>
      <div>${this.selectedTimeRange}</div>
      ${this.placeholder.display && !this.selectedTimeRange ? html `<span class="placeholder">${this.placeholder.text}</span>` :
            html ``}
    </div>
    
    <div class="container ${this.closed ? 'closed' : 'open'}">
      ${this.tempTimeSlot.map((item, index) => html `
        <div class="dropdown ${index === this.index ? 'checked' : ''}">
          <label class="list-item " for="${item}">
            <input type="radio" id="${item}" name="timeSlot" @click=${this.updateSlot}
              value="${item}" ?checked=${index === this.index}>
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
        const idx = this.tempTimeSlot.findIndex(el => el === target.srcElement.value);
        if (idx !== -1) {
            this.index = idx;
        }
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
};
OrxeTimePicker.styles = styles;
__decorate([
    property({ type: String, reflect: true, attribute: 'interval' }),
    __metadata("design:type", Object)
], OrxeTimePicker.prototype, "timeInterval", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], OrxeTimePicker.prototype, "selectedTimeRange", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'inputtitle' }),
    __metadata("design:type", Object)
], OrxeTimePicker.prototype, "inputTitle", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'closed' }),
    __metadata("design:type", Object)
], OrxeTimePicker.prototype, "closed", void 0);
__decorate([
    property({ reflect: true, attribute: 'placeholder' }),
    __metadata("design:type", Object)
], OrxeTimePicker.prototype, "placeholder", void 0);
OrxeTimePicker = __decorate([
    customElement('orxe-time-picker'),
    __metadata("design:paramtypes", [])
], OrxeTimePicker);
export default OrxeTimePicker;
