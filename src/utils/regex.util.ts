import { NIF_REGEX, PHONE_REGEX } from '../constants/regex.constant'

export function validPhone(country: string, phone: string): boolean {
  const regex = PHONE_REGEX[country]
  return regex.test(phone)
}

export function validEmail(email: string): boolean {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  return emailRegex.test(email)
}

export function validPassword(password: string): boolean {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return passwordRegex.test(password)
}

export function validSBODate(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  return dateRegex.test(date)
}

export function validNIF(country: string, nif: string): boolean {
  const regex = NIF_REGEX[country]
  return regex.test(nif)
}
