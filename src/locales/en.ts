import { LocaleType } from '@/locales/ru'

export const en: LocaleType = {
  buzzWords: {
    ok: 'OK',
  },
  common: {
    incorrectEmail: 'The email must match the format example@example.com',
    recaptchaCheckFailed: '"I am not a robot" check failed. Try again',
    requiredField: 'Fill in the field',
    save: 'Save',
    selectFromComputer: 'Select from computer',
  },
  forgotPassword: {
    common: {
      inProgress: 'Sending the request...',
    },
    expiredLink: {
      expiredErrorHint:
        'Looks like the verification link has expired. Not to worry, we can send the link again',
      expiredErrorTitle: 'Email verification link expired',
      resendButtonCaption: 'Resend link',
      unknownErrorHint:
        "We couldn't verify the data for resetting the password. Try refresh the page or request a new link",
      unknownErrorTitle: 'Something went wrong',
    },
    newPassword: {
      confirmPassword: 'Confirm password',
      createNewPassword: 'Create new password',
      errorDialogText: 'Error changing your password',
      errorDialogTitle: 'Something went wrong',
      hint: 'Your password must be between 6 and 20 characters and contain at least one capital letter and at least one special character',
      passwordsMustMatch: 'The passwords must match',
      successDialogText:
        'Your password has been successfully changed, press "OK", to close the dialog and proceed to login',
      successDialogTitle: 'Password changed successfully',
      title: 'Create new password',
      tooSmallError: 'Password has to be at least 6 characters long',
    },

    startPage: {
      backToSignIn: 'Back to Sign-in page',
      emailNotFound: "User with this email doesn't exist",
      errorDialogText: 'Error sending an email, try later',
      errorDialogTitle: 'Something went wrong',
      hint: 'Enter your email address and we will send you further instructions',
      inProgress: 'Sending the request...',
      linkSent: 'The link has been sent by email.\n If you don’t receive an email send link again',
      sendLink: 'Send link',
      sendLinkAgain: 'Send link again',
      somethingWrong: 'Something went wrong',
      success: 'We have sent a link to confirm your email to',
      successDialogText: 'We have sent an email to your address',
      successDialogTitle: 'Email sent',
      title: 'Forgot password',
    },
  },
  header: {
    signInButton: 'Log In',
    signUpButton: 'Sign up',
  },
  modal: {
    modalConfirmButtons: {
      no: 'No',
      yes: 'Yes',
    },
  },
  profile: {
    avatar: {
      deletePhotoModalDescription: 'Are you sure you want to delete the photo?',
      deletePhotoModalTitle: 'Delete Photo',
    },
    common: {
      saveChanges: 'Save changes',
    },
    settings: {
      aboutMe: 'About me',
      aboutMePlaceholder: 'Tell about yourself',
      accountManagement: 'Account management',
      addProfilePhoto: 'Add profile photo',
      birthDate: 'Date of birth',
      birthDatePlaceholder: 'mm.dd.YYYY',
      devices: 'Devices',
      generalInformation: 'General information',
      imageSizeExceeded: 'Photo size must be less than 10 MB!',
      myPayments: 'My payments',
      saveChangeButton: 'Save change',
      selectYourCity: 'Choose your city',
      selectYourCityPlaceholder: 'City',
      selectYourCountry: 'Choose your country',
      selectYourCountryPlaceholder: 'Country',
      toast: {
        error: 'Error! Server is not available',
        success: 'Your settings are saved',
      },
      wrongFileFormat: 'Error! The format of the uploaded photo must be \nPNG and JPEG',
    },
  },
  publicPage: {
    title: 'Public Page',
  },
  signIn: {
    dontHaveAcc: `Don't have an account?`,
    emailTitle: 'Email',
    forgotPass: 'Forgot Password',
    passTitle: 'Password',
    signInButton: 'Sign In',
    signUp: 'Sign Up',
    title: 'Sign In',
    wrongCredentials: 'The email or password are incorrect. Try again please',
  },
  signUp: {
    confirmPass: 'Confirm Password',
    congratulations: 'Congratulations!',
    emailConfirmed: 'Your email has been confirmed',
    emailExpired: 'Email verification link expired',
    emailSent: 'Email sent',
    emailSentText: (email: string) => `We have sent a link to confirm your email to ${email}`,
    emailTitle: 'Email',
    emailType: 'The email must match the format example@example.com',
    errors: {
      emailAlreadyConfirmed: 'User with email already confirmed',
      userNameAlreadyConfirmed: 'User with userName already confirmed',
    },
    expiredDescription:
      'Looks like the verification link has expired. Not to worry, we can send the link again',
    haveAcc: `Do you have an account?`,
    maxCharsNumber: (maxChars: number) => `Maximum number of characters ${maxChars}`,
    minCharsNumber: (minChars: number) => `Minimum number of characters ${minChars}`,
    passTitle: 'Password',
    passwordMatch: 'The passwords must match',
    passwordMustContain:
      'Password must contain a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~"',
    passwordRecovery: 'Password recovery',
    passwordRequirements: (minChars: number, maxChars: number) =>
      `Your password must be between ${minChars} and ${maxChars} characters`,
    resendVerificationLink: 'Resend verification link',
    rules: ['I agree to the', 'Terms of Service', 'and', 'Privacy Policy'],
    signInButton: 'Sign In',
    signUp: 'Sign Up',
    title: 'Sign Up',
    userName: 'Username',
    userNameContains: 'Username may contain 0-9; A-Z; a-z; _; -',
  },
}
