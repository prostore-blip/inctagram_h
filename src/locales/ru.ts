export const ru = {
  forgotPassword: {
    backToSignIn: 'Вернуться на страницу логина',
    emailNotFound: 'Пользователь с таким адресом не найден',
    hint: 'Введите Ваш email и мы отправим дальнейшие инструкции',
    linkSent:
      'Ссылка отправлена на Ваш адрес. Если Вы не получили email, нажмите "Отправить еще раз"',
    sendLink: 'Отправить ссылку',
    sendLinkAgain: 'Отправить еще раз',
    somethingWrong: 'Что-то пошло не так',
    success: 'Мы отправили ссылку на Вашу почту',
    title: 'Сброс пароля',
  },
  header: {
    signInButton: 'Войти',
    signUpButton: 'Регистрация',
  },
  newPassword: {
    confirmPassword: 'Повторите пароль',
    createNewPassword: 'Создать новый пароль',
    hint: 'Пароль должен быть длиной минимум 6 и максимум 20 символов',
    passwordsMustMatch: 'Пароли не совпадают',
    title: 'Создать новый пароль',
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
