export type User = {
  id: number;
  code: string;
  name: string;
  avatar: string;
  email: string;
  socket_connection_token: string;
};

export enum Currency {
  Euro = 'EUR',
  USDollar = 'USD',
  RussianRuble = 'RUB',
  BrazilianReal = 'BRL',
  TurkishLira = 'TRY',
  BelarusianRuble = 'BYN',
  Tenge = 'KZT',
  Hryvnia = 'UAH'
}

export type DonationAlert = {
  id: number;
  name: string;
  username: string | null;
  message_type: 'text' | 'audio';
  /* text or link to audio */
  message: string;
  amount: number;
  amount_in_user_currency: number;
  currency: Currency;
  is_shown: number;
  created_at: string;
  shown_at: string | null;
  reason: string;
  recipient_name: string;
};

/**
amount: 10
amount_in_user_currency: 10
created_at: "2022-05-09 02:05:59"
currency: "RUB"
id: 96760721
is_shown: 0
message: "https://static.donationalerts.ru/audiodonations/114588/e61361d60ba1267f2af97043cba71562.wav"
message_type: "audio"
name: "Donations"
payin_system: {title: 'sberMyCom'}
reason: "default"
recipient_name: "bruhabruh"
shown_at: null
username: null
 */
