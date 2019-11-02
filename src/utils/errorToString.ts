// Axios renvoie un any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (res: any) => {
  switch (res.error) {
    case 'INVALID_FORM':
      return 'Formulaire invalide';
    case 'INVALID_PIN':
      return 'Code PIN invalide';
    case 'UNAUTHORIZED':
      return "Vous n'avez pas la permission";
    case 'UNKNOWN':
      return 'Une erreur est survenue';
    default:
      return res.error;
  }
};
