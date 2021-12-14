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
    expect(container).toHaveTextContent('ZingChart');
  });

});
