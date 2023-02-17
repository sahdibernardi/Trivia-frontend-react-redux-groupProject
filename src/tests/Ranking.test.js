import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa o componente Ranking', () => {
  const player = {
    rank: [{
        name: 'Gabriel Matos Boubee',
        assertions: 1,
        score: 27,
        gravatarEmail: 'tryber@teste.com'
    }]
}
  test('se existe um h1 com o valor "Ranking"', () => {
    const { getByRole, getByText, history, findByRole, getByTestId } = renderWithRouterAndRedux(<App />, player, "/feedback");

    const btnRanking = getByRole('button', { name: /ranking/i })
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking);

    const btnHome = getByTestId('btn-go-home')
    expect(btnHome).toBeInTheDocument();
    userEvent.click(btnHome);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
});
});
