export type User = {
  id: string
  meta: {
    about: string
    avatar: null | string
    birthday: string
    city: string
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
