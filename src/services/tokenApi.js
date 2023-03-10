import { getToken } from '../localStorage';

export const tokenApi = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const reponse = await fetch(url);
  const result = reponse.json();
  return result;
};

export const getCards = async () => {
  const token = getToken();
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

export const getQuestionsWithDificult = async (dificult) => {
  const token = getToken();
  const url = `https://opentdb.com/api.php?amount=5&token=${token}&difficult=${dificult}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result;
};

export const getQuestionsWithtype = async (type) => {
  const token = getToken();
  const url = `https://opentdb.com/api.php?amount=5&token=${token}&type=${type}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  console.log('deu certo');
  return result;
};

export const getQuestionsWithCategory = async (category) => {
  const token = getToken();
  const url = `https://opentdb.com/api.php?amount=5&token=${token}&category=${category}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result;
};

export const getQuestionsWithCategorywithDificult = async (category, dificult) => {
  const token = getToken();
  const url = `https://opentdb.com/api.php?amount=5&token=${token}&category=${category}&dificult${dificult}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result;
};

export const getQuestionsWithCategorywithType = async (category, type) => {
  const token = getToken();
  const url = `https://opentdb.com/api.php?amount=5&token=${token}&type=${type}&category=${category}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result;
};

export const getQuestionsWithDificultWithType = async (dificult, type) => {
  const token = getToken();
  const url = `https://opentdb.com/api.php?amount=5&token=${token}&type=${type}&dificult${dificult}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result;
};

export const getQuestionsWithDificultWithTypeWithCategory = async (
  dificult,
  type,
  category,
) => {
  const token = getToken();
  const url = `https://opentdb.com/api.php?amount=5&token=${token}&type=${type}&dificult${dificult}&category=${category}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result;
};
