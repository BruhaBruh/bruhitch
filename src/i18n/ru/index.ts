import type { Translation } from '../i18n-types';

const ru: Translation = {
  pageNames: {
    index: 'Bruhitch',
    another: 'Bruhitch › {0}'
  },
  authorization: 'Требуется авторизация',
  continueWithTwitch: 'Продолжить с Twitch',
  settings: {
    name: 'Настройки',
    theme: 'Тема',
    darkTheme: 'Темная',
    lightTheme: 'Светлая',
    language: 'Язык',
    deleteAccount: 'Удалить аккаунт',
    deleteAccountDescription: 'Это действие нельзя будет отменить, вы уверены?',
    accountDeleted: 'Аккаунт удален',
    accountNotDeleted: 'Аккаунт не удален',
    refreshToken: 'Обновить токен',
    refreshTokenDescription: 'После обновления обновите ссылки на виджеты, просто скопируйте',
    refreshError: 'Ошибка обновления токена',
    refreshSuccess: 'Токен обновлен',
    refreshSuccessDescription: 'Обновите свои ссылки на виджеты'
  },
  chat: {
    name: 'Чат',
    title: 'Генератор ссылки на виджет чата',
    incorrectUrl: 'Неверный url',
    preview: 'Предпросмотр чата',
    nickname: 'Ник',
    channel: 'Канал',
    chatType: 'Тип чата',
    default: 'Обычный',
    block: 'Блоки',
    alternativeBlock: 'Альтернативные блоки',
    hideRewards: 'Скрытие наград',
    hideRewardsDescription: 'Скрыть награды за баллы канала в чате',
    hiddenNicknames: 'Скрытые ники',
    defaultColor: 'Стандартный цвет',
    gradientOnlyToCustomNicknames: 'Градиент только для кастомных ников',
    customColorNicknames: 'Кастомные цвета ников',
    isGradient: 'Градиент?',
    font: 'Шрифт',
    fontSize: 'Размер шрифта',
    disablePadding: 'Выключить отступы',
    animation: 'Анимация',
    animationParams: {
      name: 'Параметры анимации',
      duration: 'продолжительность в мс',
      startScale: 'начальный размер',
      opacity: 'непрозрачность'
    },
    chatLink: 'Ссылка на виджет чата',
    loadConfigFromLink: 'Загрузить конфиг из ссылки'
  },
  donationAlerts: {
    name: 'Оповещения донатов'
  },
  followAlerts: {
    name: 'Оповещения отслеживаний',
    title: 'Настройка оповещений отслеживания',
    preview: 'Предпросмотр оповещений отслеживания',
    font: 'Шрифт',
    fontSize: 'Размер шрифта',
    disablePadding: 'Выключить отступы',
    pattern: 'Паттерн',
    patternDescription: '$username$ - показать ник. ![текст](ссылка) - изображение',
    textColor: 'Цвет текста',
    backgroundColor: 'Цвет фона',
    backgroundImage: 'Фоновое изображение',
    backgroundImageDescription: 'Ссылка на изображение',
    colorNickname: 'Цвет ника',
    isGradientNickname: 'Градиент на нике?',
    verticalAlign: 'Вертикальное выравнивание',
    horizontalAlign: 'Горизонтальное выравнивание',
    top: 'Верх',
    bottom: 'Низ',
    center: 'Центр',
    right: 'Право',
    left: 'Лево',
    widgetLink: 'Ссылка на виджет оповещений отслеживаний'
  },
  subscribeAlerts: {
    name: 'Оповещение подписок'
  },
  raidAlerts: {
    name: 'Оповещения рейдов'
  },
  bitsAlerts: {
    name: 'Оповещения битов'
  },
  copy: 'Скопировать',
  copied: 'Скопировано',
  load: 'Загрузить',
  loaded: 'Загружено',
  add: 'Добавить',
  save: 'Сохранить',
  saved: 'Сохранено',
  remove: 'Удалить',
  delete: 'Удалить',
  cancel: 'Отмена',
  wip: 'В разработке',
  errorOccurred: 'Произошла ошибка'
};

export default ru;
