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
  settings: {
    name: 'Настройки',
    theme: 'Тема',
    darkTheme: 'Темная',
    lightTheme: 'Светлая',
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
    }
  },
  donationAlerts: {
    name: 'Оповещения донатов',
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
      font: 'Шрифт',
      fontSize: 'Размер шрифта',
      disablePadding: 'Выключить отступы',
      animation: 'Анимация',
      animationParams: {
        name: 'Параметры анимации',
        startScale: 'начальный размер',
        duration: 'продолжительность в мс',
        opacity: 'непрозрачность'
      },
      verticalAlign: 'Вертикальное выравнивание',
      top: 'Верх',
      bottom: 'Низ',
      center: 'Центр',
      widgetLink: 'Ссылка на виджет донатов'
    }
  },
  followAlerts: {
    name: 'Оповещения отслеживаний',
    title: 'Настройка оповещений отслеживания',
    controls: {
      font: 'Шрифт',
      fontSize: 'Размер шрифта',
      disablePadding: 'Выключить отступы',
      animation: 'Анимация',
      animationParams: {
        name: 'Параметры анимации',
        startScale: 'начальный размер',
        opacity: 'непрозрачность'
      },
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
    }
  },
  subscribeAlerts: {
    name: 'Оповещение подписок',
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
      disablePadding: 'Выключить отступы',
      font: 'Шрифт',
      fontSize: 'Размер шрифта',
      image: 'Изображение',
      usernameColor: 'Цвет саба/дарителя',
      recipientColor: 'Цвет получателя',
      isGradientUsername: 'Градиент на сабе/дарителе?',
      isGradientRecipient: 'Градиент на получателе?',
      animation: 'Анимация',
      animationParams: {
        name: 'Параметры анимации',
        startScale: 'начальный размер',
        opacity: 'непрозрачность'
      },
      verticalAlign: 'Вертикальное выравнивание',
      top: 'Верх',
      bottom: 'Низ',
      center: 'Центр',
      widgetLink: 'Ссылка на виджет оповещений сабок'
    }
  },
  predictionWidget: {
    name: 'Виджет прогноза',
    title: 'Настройки виджета прогноза',
    controls: {
      textColor: 'Цвет текста',
      blueColor: 'Синий цвет',
      pinkColor: 'Розовый цвет',
      channelPointImage: 'Изображение поинтов канала',
      disablePadding: 'Выключить отступы',
      font: 'Шрифт',
      fontSize: 'Размер шрифта',
      hideDelay: 'Задержка скрытия',
      animation: 'Анимация',
      animationParams: {
        name: 'Параметры анимации',
        startScale: 'начальный размер',
        duration: 'продолжительность в мс',
        opacity: 'непрозрачность'
      },
      verticalAlign: 'Вертикальное выравнивание',
      top: 'Верх',
      bottom: 'Низ',
      center: 'Центр',
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
  wip: 'В разработке',
  errorOccurred: 'Произошла ошибка'
};

export default ru;
