export const randomNumber = () => {
  let result = '';
  const characters = '0123456789';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
