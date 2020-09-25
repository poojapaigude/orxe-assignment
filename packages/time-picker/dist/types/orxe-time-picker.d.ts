import { LitElement } from 'lit-element';
export default class OrxeTimePicker extends LitElement {
    timeInterval: string;
    selectedTimeRange: string;
    inputTitle: string;
    closed: boolean;
    placeholder: {
        display: boolean;
        text: string;
    };
    firstUpdated(): void;
    tempTimeSlot: string[];
    midnight: string;
    noon: string;
    index: Number;
    constructor();
    createTimeInterval(timeIntervalInMinutes: any): void;
    render(): import("lit-element").TemplateResult;
    toggleMenu(): void;
    updateSlot(target: any): void;
    static styles: import("lit-element").CSSResult;
}
