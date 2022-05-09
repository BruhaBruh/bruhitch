import { Currency } from '$types/donate';

const getCurrencySymbol = (currency: Currency): string => {
  switch (currency) {
    case Currency.Euro:
      return '€';
    case Currency.USDollar:
      return '$';
    case Currency.RussianRuble:
      return '₽';
    case Currency.BrazilianReal:
      return 'R$';
    case Currency.TurkishLira:
      return '₺';
    case Currency.BelarusianRuble:
      return 'Br';
    case Currency.Tenge:
      return 'лв';
    case Currency.Hryvnia:
      return '₴';
  }
};

export default getCurrencySymbol;
