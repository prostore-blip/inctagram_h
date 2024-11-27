export type CreateProfileRequestBody = {
  about: string
  city: string
  country: string
  dateOfBirth: string // '01.01.1991'
  firstName: string
  lastName: string
  userName: string
}

export type UpdateProfileRequestBody = CreateProfileRequestBody

export type ProfileDataType = {
  about?: string
  birthDate: string
  createdAt: string
  firstName: string
  id: string
  lastName: string
  location: {
    city: string
    country: string
  }
  userName: string
}

//responses

//already created profile for this userName (id in me ?)

// {
//   "statusCode": 403,
//     "timestamp": "2024-11-14T05:14:09.014Z",
//     "location": "FillOutProfileUseCase",
//     "error": "profile already exists",
//     "path": "/api/v1/users/profiles/create",
//     "errorName": "ForbiddenException"
// }
