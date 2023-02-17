import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from '@testing-library/user-event'
import App from "../App";

describe('testa o componente FeedBack', () => {
    const player = {
        player: {
            name: 'Gabriel Matos Boubee',
            assertions: 3,
            score: 4,
            gravatarEmail: 'tryber@teste.com'
        }
    }

    const player2 = {
        player: {
            name: 'Gabriel Matos Boubee',
            assertions: 1,
            score: 0,
            gravatarEmail: 'tryber@teste.com'
        }
    }

    test('se existe um btn que leva para o login', () => {
        const { history, getByRole } = renderWithRouterAndRedux(<App />, player, '/feedback')
        const btnPlayAgain = getByRole('button', { name: /Play Again/i })
        userEvent.click(btnPlayAgain)
        const { location: { pathname } } = history
        expect(pathname).toBe('/')
    })
    test('se existe btn que leva para o ranking', () => {
        const { history, getByRole } = renderWithRouterAndRedux(<App />, player, '/feedback')
        const btnRanking = getByRole('button', { name: /ranking/i })
        userEvent.click(btnRanking)
        const { location: { pathname } } = history
        expect(pathname).toBe('/ranking')
    })

    test('testa se imprime Well done na tela', () => {
        const { getByText } = renderWithRouterAndRedux(<App />, player, '/feedback')
        const wellDone = getByText(/well done!/i)
        expect(wellDone).toBeInTheDocument()
      })
    
      test('testa se imprime Could Be better na tela', () => {
        const { getByText } = renderWithRouterAndRedux(<App />, player2, '/feedback')
        const couldBeBetter = getByText(/could be better.../i)
        expect(couldBeBetter).toBeInTheDocument()
      })
})