import { LocaleType } from '@/locales/ru'

export const en: LocaleType = {
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
  },
  signUp: {
    confirmPass: 'Confirm Password',
    congratulations: 'Congratulations!',
    emailConfirmed: 'Your email has been confirmed',
    emailExpired: 'Email verification link expired',
    emailTitle: 'Email',
    expiredDescription:
      'Looks like the verification link has expired. Not to worry, we can send the link again',
    haveAcc: `Do you have an account?`,
    passTitle: 'Password',
    resendVerificationLink: 'Resend verification link',
    rules: ['I agree to the', 'Terms of Service', 'and', 'Privacy Policy'],
    signInButton: 'Sign In',
    signUp: 'Sign Up',
    title: 'Sign Up',
    userName: 'Username',
  },
}
