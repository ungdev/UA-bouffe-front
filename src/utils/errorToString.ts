export default (error: string) => {
  switch (error) {
    case 'INVALID_FORM':
      return 'Formulaire invalide';

    case 'INVALID_PIN':
      return 'Code PIN invalide';

    case 'UNAUTHENTICATED':
      return "Vous n'êtes pas connecté";
    case 'UNAUTHORIZED':
      return "Vous n'avez pas la permission";

    case 'NOT_IN_LOCAL_NETWORK':
      return "Vous n'êtes pas connectée au réseau local";

    case 'UNKNOWN':
      return 'Une erreur est survenue';

    default:
      return error;
  }
};
