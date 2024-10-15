export const ru = {
  buzzWords: {
    ok: 'ДА',
  },
  common: {
    incorrectEmail: 'Введите корректный адрес',
    recaptchaCheckFailed:
      'Не удалось выполнить проверку, что запрос не является автоматизированным. Попробуйте повторить',
    requiredField: 'Поле не должно быть пустым',
    save: 'Сохранить',
    selectFromComputer: 'Выбрать с диска',
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
  modal: {
    modalConfirmButtons: {
      no: 'Нет',
      yes: 'Да',
    },
  },
  profile: {
    avatar: {
      deletePhotoModalDescription: 'Ты действительно хочешь удалить фото?',
      deletePhotoModalTitle: 'Удалить фото',
    },
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
    wrongCredentials: 'Неверные email или пароль. Попробуйте снова.',
  },
  signUp: {
    confirmPass: 'Подтвердите пароль',
    congratulations: 'Поздравляем!',
    emailConfirmed: 'Ваша почта была подтверждена',
    emailExpired: 'Время жизни ссылки подтверждения истекло',
    emailSent: 'Письмо отправлено',
    emailSentText: (email: string) =>
      `Мы отправили ссылку для подтверждения вашего адреса электронной почты на ${email}`,
    emailTitle: 'Почта',
    emailType: 'Адрес почты должен соответствовать формату example@example.com',
    errors: {
      emailAlreadyConfirmed: 'Пользователь с таким email уже подтверждён',
      userNameAlreadyConfirmed: 'Пользователь с таким именем уже подтверждён',
    },
    expiredDescription:
      'Похоже что время жизни ссылки истекло. Не переживайте, мы можем выслать ссылку повторно',
    haveAcc: `Уже есть аккаунт?`,
    maxCharsNumber: (maxChars: number) => `Максимальное количество символов  ${maxChars}`,
    minCharsNumber: (minChars: number) => `Минимальное количество символов ${minChars}`,
    passTitle: 'Пароль',
    passwordMatch: 'Пароли должны совпадать',
    passwordMustContain:
      'Пароль должен содержать a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~"',
    passwordRecovery: 'Восстановление пароля',
    passwordRequirements: (minChars: number, maxChars: number) =>
      `Ваш пароль должен содержать от ${minChars} до ${maxChars} символов`,
    resendVerificationLink: 'Повторно отправить ссылку для проверки почты',
    rules: ['Я согласен с', 'Условиями обслуживания', 'и', 'Политикой конфиденциальности'],
    signInButton: 'Войти',
    signUp: 'Создать аккаунт',
    title: 'Страница регистрации',
    userName: 'Имя пользователя',
    userNameContains: 'Имя пользователя должно содержать 0-9; A-Z; a-z; _; -',
  },
}

export type LocaleType = typeof ru
