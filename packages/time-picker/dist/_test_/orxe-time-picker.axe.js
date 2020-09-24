import { OrxeTimePicker } from '../';
import { axe, toHaveNoViolations } from '@orxe-devkit/axe';
expect.extend(toHaveNoViolations);
describe('orxe-time-picker-axe', () => {
    it('', () => {
        expect(true).toBeTruthy();
    });
    let OrxeProject;
    beforeEach(async () => {
        OrxeTimePicker;
        document.body.appendChild(document.createElement('OrxeProject'));
        OrxeProject = document.querySelector('OrxeProject');
    });
    afterEach(() => {
        OrxeProject.remove();
    });
    it('should support all WCAG Accessibility Rules. when default toolbar is rendered', async () => {
        const result = await axe(OrxeProject);
        expect(result).toHaveNoViolations();
    });
});
