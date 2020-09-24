import { LitElement } from 'lit-element';
export default class OrxeTimePicker extends LitElement {
    index: Number;
    set timeIntervalInMinutes(value: string | number);
    selectedTimeRange: string;
    inputTitle: string;
    closed: boolean;
    placeholder: {
        display: boolean;
        text: string;
    };
    tempTimeSlot: string[];
    midnight: string;
    noon: string;
    constructor();
    createTimeInterval(timeIntervalInMinutes: any): void;
    render(): import("lit-element").TemplateResult;
    toggleMenu(): void;
    updateSlot(target: any): void;
    static styles: import("lit-element").CSSResult;
}
