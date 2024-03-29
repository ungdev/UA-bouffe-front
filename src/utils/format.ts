import { PaymentMethod } from '@/types';

const formatPrice = (price: number): string => {
  return `${(price / 100).toFixed(2)} €`;
};

const formatMethod = (method: PaymentMethod) => {
  if (method === PaymentMethod.Card) return 'Carte Bleue';
  else if (method === PaymentMethod.Cash) return 'Espèces';
  else if (method === PaymentMethod.Ticket) return 'Ticket bouffe';

  return null;
};

export { formatPrice, formatMethod };
