export const ru = {
  common: {
    cancel: 'Отменить',
    email: 'Почта',
    firstName: 'Имя',
    lastName: 'Фамилия',
    password: 'Пароль',
    save: 'Сохранить',
    selectFromComputer: 'Выбрать с диска',
    signIn: 'Войти',
    signOut: 'Выйти',
    username: 'Логин', //?
  },
  forgotPassword: {
    common: {
      inProgress: 'Отправка запроса...',
    },
    expiredLink: {
      expiredErrorHint:
        'Похоже, время жизни ссылки для сброса пароля истекло. Не\u00A0переживайте, мы можем отправить новую',
      expiredErrorTitle: 'Время жизни ссылки истекло',
      resendButtonCaption: 'Отправить повторно',
      unknownErrorHint:
        'Не\u00A0удалось проверить данные для сброса пароля, поробуйте обновить страницу или запросите новую ссылку',
      unknownErrorTitle: 'Произошла неизвестная ошибка',
    },
    newPassword: {
      confirmPassword: 'Повторите пароль',
      createNewPassword: 'Создать новый пароль',
      errorDialogText: 'Не удалось изменить Ваш пароль',
      errorDialogTitle: 'Ошибка',
      hint: 'Пароль должен быть длиной минимум 6 и максимум 20 символов, а также содержать заглавные буквы и символы',
      passwordsMustMatch: 'Пароли не совпадают',
      successDialogText:
        'Пароль был изменен, нажмите "ОК" и Вы будете перенаправленына страницу входа',
      successDialogTitle: 'Пароль изменен',
      title: 'Создать новый пароль',
      tooSmallError: 'Пароль должен быть не менее 6 символов',
    },

    startPage: {
      backToSignIn: 'Вернуться на страницу логина',
      emailNotFound: 'Пользователь с таким адресом не найден',
      errorDialogText: 'Письмо не было отправлено, попробуйте снова',
      errorDialogTitle: 'Что-то пошло не так',
      hint: 'Введите Ваш email и мы отправим дальнейшие инструкции',
      inProgress: 'Отправка запроса...',
      linkSent:
        'Ссылка отправлена на Ваш адрес. Если Вы не получили email, нажмите "Отправить еще раз"',
      sendLink: 'Отправить ссылку',
      sendLinkAgain: 'Отправить еще раз',
      somethingWrong: 'Что-то пошло не так',
      success: 'Мы отправили ссылку на Вашу почту',
      successDialogText: 'Мы отправили письмо на Вашу почту',
      successDialogTitle: 'Письмо отправлено',
      title: 'Сброс пароля',
    },
  },
  header: {
    signInButton: 'Войти',
    signUpButton: 'Регистрация',
  },
  profile: {
    common: {
      saveChanges: 'Сохранить изменения',
    },
    settings: {
      aboutMe: 'Обо мне',
      aboutMePlaceholder: 'Расскажите о себе',
      accountManagement: 'Управление акаунтом',
      addProfilePhoto: 'Добавить фото профиля',
      birthDate: 'Дата рождения',
      birthDatePlaceholder: 'дд.мм.ГГГГ',
      devices: 'Устройства',
      generalInformation: 'Общая информация',
      imageSizeExceeded: 'Фото должно быть меньше 10 МБ!',
      myPayments: 'Мои платежи',
      saveChangeButton: 'Сохранить изменения',
      selectYourCity: 'Выберите Ваш город',
      selectYourCityPlaceholder: 'Город',
      selectYourCountry: 'Выберите Вашу страну',
      selectYourCountryPlaceholder: 'Страна',
      toast: {
        error: 'Ошибка! Сервер недоступен',
        success: 'Ваши настройки успешно сохранены',
      },
      wrongFileFormat: 'Поддеживаются только изображения \nPNG и JPG',
    },
  },
  publicPage: {
    title: 'Главная страница',
  },
  signIn: {
    dontHaveAcc: 'Ещё нет аккаунта?',
    emailTitle: 'Почта',
    forgotPass: 'Забыли пароль',
    passTitle: 'Пароль',
    signInButton: 'Войти',
    signUp: 'Создать аккаунт',
    title: 'Страница входа',
  },
  signUp: {
    confirmPass: 'Подтвердите пароль',
    congratulations: 'Поздравляем!',
    emailConfirmed: 'Ваша почта была подтверждена',
    emailExpired: 'Время жизни ссылки подтверждения истекло',
    emailTitle: 'Почта',
    expiredDescription:
      'Похоже что время жизни ссылки истекло. Не переживайте, мы можем выслать ссылку повторно',
    haveAcc: `Уже есть аккаунт?`,
    passTitle: 'Пароль',
    resendVerificationLink: 'Повторно отправить ссылку для проверки почты',
    rules: ['Я согласен с', 'Условиями обслуживания', 'и', 'Политикой конфиденциальности'],
    signInButton: 'Войти',
    signUp: 'Создать аккаунт',
    title: 'Страница регистрации',
    userName: 'Имя пользователя',
  },
}

export type LocaleType = typeof ru
