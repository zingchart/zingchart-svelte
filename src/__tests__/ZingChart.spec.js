import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import ZingChart from './ZingChart.spec.svelte';

const config = {
  type: 'bar',
  series: [{
    values: [4,5,3,4,5,3,5,4,11]
  }]
}

function renderZingChart(props = {}) {
  const { container } = render(ZingChart, { ...props, });
  return container.firstChild.firstChild;
}

describe('<ZingChart />', () => {

  test('it renders a bar chart', () => {
    const container = renderZingChart({ data: config });
    expect(container).toHaveTextContent('© ZingChart 1990 Dave Lunny');
  });

  test('it spreads the rest of the props correctly', () => {
    const mockCustomClass = 'custom-class';
    const container = renderZingChart({ class: mockCustomClass });
    expect(container.classList.contains('custom-class')).toBe(true);
  });

});
