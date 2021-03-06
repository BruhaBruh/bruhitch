import type { Translation } from '../i18n-types';

const ru: Translation = {
  pageNames: {
    index: 'Bruhitch',
    another: 'Bruhitch › {0}'
  },
  authorization: 'Требуется авторизация',
  continueWithTwitch: 'Продолжить с Twitch',
  logout: 'Выйти',
  dontShowLinkAnyone: 'Никому не показывайте ссылку',
  preview: 'Ссылка на виджет предварительного просмотра',
  actionCanNotBeUndone: 'Это действие нельзя будет отменить, вы уверены?',
  controls: {
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
    alignment: {
      vertical: 'Вертикальное выравнивание',
      horizontal: 'Горизонтальное выравнивание',
      top: 'Верх',
      bottom: 'Низ',
      center: 'Центр',
      right: 'Право',
      left: 'Лево'
    }
  },
  index: {
    aboutProject: 'О проекте',
    idea: {
      title: 'Идея',
      description: 'Я хотел создать собственные виджеты в одной стилистике и гибкими настройками'
    },
    structure: {
      title: 'Структура проекта',
      client: 'Клиент',
      server: 'Сервер'
    },
    links: {
      title: 'Ссылки',
      clientGitHub: 'GitHub клиента',
      serverGitHub: 'GitHub сервера',
      creatorsTelegram: 'Telegram создателя',
      creatorsTwitch: 'Twitch создателя',
      creatorsDonationAlerts: 'DonationAlerts создателя'
    }
  },
  settings: {
    name: 'Настройки',
    darkTheme: 'Темная тема',
    language: 'Язык',
    deleteAccount: 'Удалить аккаунт',
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
    controls: {
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
      chatLink: 'Ссылка на виджет чата',
      loadConfigFromLink: 'Загрузить конфиг из ссылки'
    }
  },
  donationAlerts: {
    name: 'Донаты',
    title: 'Настройка оповещений доната',
    controls: {
      usernameColor: 'Цвет ника',
      isGradientUsername: 'Градиент на нике?',
      currencyColor: 'Цвет символа валюты',
      isGradientCurrency: 'Градиент на символе валюты?',
      soundColor: 'Цвет иконки звука',
      textColor: 'Цвет текста',
      anonymous: 'Аноним',
      image: 'Изображение',
      hideDelay: 'Задержка скрытия',
      hideDelayDescription: 'Звуковое оповещение будет удалено, но звук продолжит работать',
      volume: 'Громкость звука',
      widgetLink: 'Ссылка на виджет донатов'
    }
  },
  followAlerts: {
    name: 'Отслеживания',
    title: 'Настройка оповещений отслеживания',
    controls: {
      pattern: 'Паттерн',
      patternDescription: '$username$ - показать ник. ![текст](ссылка) - изображение',
      textColor: 'Цвет текста',
      backgroundColor: 'Цвет фона',
      backgroundImage: 'Фоновое изображение',
      backgroundImageDescription: 'Ссылка на изображение',
      colorNickname: 'Цвет ника',
      isGradientNickname: 'Градиент на нике?',
      widgetLink: 'Ссылка на виджет оповещений отслеживаний'
    }
  },
  subscribeAlerts: {
    name: 'Подписки',
    title: 'Настройка оповещений подписок',
    controls: {
      subPattern: 'Шаблон сабки/ресабки',
      subPatternDescription: '$username$ - новый саб. ![](ссылка) - изображение',
      giftPattern: 'Шаблон подарка',
      giftPatternDescription:
        '$username$ - даритель. $recipient$ - новый саб. ![](ссылка) - изображение',
      giftMultiMonthPattern: 'Шаблон подарка с несколькими месяцами',
      giftMultiMonthPatternDescription:
        '$username$ - даритель. $recipient$ - новый саб. $duration$ - месяцы. ![](ссылка) - изображение',
      anonymous: 'Аноним',
      anonymousDescription: 'Заменяет $username$ при анонимном подарке',
      image: 'Изображение',
      usernameColor: 'Цвет саба/дарителя',
      recipientColor: 'Цвет получателя',
      isGradientUsername: 'Градиент на сабе/дарителе?',
      isGradientRecipient: 'Градиент на получателе?',
      widgetLink: 'Ссылка на виджет оповещений сабок'
    }
  },
  predictionWidget: {
    name: 'Прогнозы',
    title: 'Настройки виджета прогноза',
    controls: {
      textColor: 'Цвет текста',
      blueColor: 'Синий цвет',
      pinkColor: 'Розовый цвет',
      channelPointImage: 'Изображение поинтов канала',
      hideDelay: 'Задержка скрытия',
      widgetLink: 'Ссылка на виджет прогноза'
    }
  },
  raidAlerts: {
    name: 'Оповещения рейдов'
  },
  bitsAlerts: {
    name: 'Оповещения битов'
  },
  copy: 'Скопировать',
  copied: 'Скопировано',
  refresh: 'Обновить',
  load: 'Загрузить',
  loaded: 'Загружено',
  add: 'Добавить',
  save: 'Сохранить',
  saved: 'Сохранено',
  remove: 'Удалить',
  delete: 'Удалить',
  cancel: 'Отмена',
  close: 'Закрыть',
  wip: 'В разработке',
  errorOccurred: 'Произошла ошибка'
};

export default ru;
