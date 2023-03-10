import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const email = 'alguem@email.com';
const name = 'aleatório'

describe('Testa o componente Login', () => {
  test('se existe um input de email e name', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByTestId('input-player-name');
    expect(inputEmail).toBeInTheDocument();

    const inputName = screen.getByTestId('input-gravatar-email');
    expect(inputName).toBeInTheDocument();
  });

  test('se existe um button Play e seu estado é desabilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const btnPlay = screen.getByRole('button', { name: /play/i });
    expect(btnPlay).toBeInTheDocument();
    expect(btnPlay.disabled).toBe(true);
  });

  test('se ao digitar no input de email e name o botão é habilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByTestId('input-player-name');
    userEvent.type(inputEmail, email);

    const inputName = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputName, name);

    const btnPlay = screen.getByRole('button', { name: /play/i });
    expect(btnPlay).toBeInTheDocument();
    expect(btnPlay.disabled).toBe(false);
  });

  test('se existe um button Settings, e ao clicar nele é renderizado o componente correto', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    
    const btnSetting = screen.getByRole('button', { name: /settings/i });
    expect(btnSetting).toBeInTheDocument();
    userEvent.click(btnSetting);
    
    const { location: { pathname } } = history;
    expect(pathname).toBe('/settings');
  });

  test('se ao clicar no button play, o fetch é chamado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue({
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    })
  });

    const { history } = renderWithRouterAndRedux(<App />)
    
    const inputEmail = screen.getByTestId('input-player-name');
    userEvent.type(inputEmail, email);

    const inputName = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputName, name);

    const btnPlay = screen.getByRole('button', { name: /play/i });
    expect(btnPlay).toBeInTheDocument();
    userEvent.click(btnPlay);

    await waitForElementToBeRemoved(btnPlay);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/game')
  });
});
