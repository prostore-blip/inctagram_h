export type User = {
  id: string
  meta: {
    about: string
    avatar: null | string
    birthday: string
    city: null | string
    country: null | string
    name: string
    surname: string
  }
  providers: [
    {
      email: string
      id: string
      login: string
    },
  ]
}
