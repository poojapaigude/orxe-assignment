import '../orxe-time-picker';


describe('orxe-time-picker', () => {
  let timePicker;
  beforeEach(async () => {
    document.body.appendChild(document.createElement('orxe-time-picker'));
    timePicker = document.querySelector('orxe-time-picker');
    await Promise.resolve();
  });

  it('should exist', () => {
    expect(timePicker).toBeTruthy();
  });

  afterEach(async function () {
    await timePicker.remove();
  });

  it('default closed should be true', () => {
    expect(timePicker.closed).toEqual(true);
  });

  it('default placeholder should be displayed true', () => {
    expect(timePicker.placeholder.display).toEqual(true);
  });

  it('default value to inputTitle should be displayed', () => {
    timePicker['inputTitle'] = 'Select Time';
    expect(timePicker.inputTitle).toEqual('Select Time');
  });

  it('it should toggleMenu on click of div', () => {
    timePicker['closed'] = true;
    timePicker.toggleMenu();
    expect(timePicker['closed']).toBeDefined();
  });

  it('it should update time selected', () => {
    const target = {
      srcElement: {
        value: 'test'
      }
    };
    timePicker.updateSlot(target);
    expect(timePicker.selectedTimeRange).toEqual(target.srcElement.value);
    timePicker.closed = true;
    expect(timePicker.closed).toBeTruthy();
    timePicker.placeholder.display = true;
    expect(timePicker.placeholder.display).toBeTruthy();
    const customEvent = new CustomEvent('selectionChanged', {
      detail: {
        option: 'test'
      }
    });
  });
