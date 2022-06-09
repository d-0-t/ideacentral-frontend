 // eslint-disable-next-line
export const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
 // eslint-disable-next-line
export const urlRegex = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;
 // eslint-disable-next-line
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const whiteSpaceOnly = /^\s+$/;

export const ageLimit = 13;
export const minBirthDate: number = new Date("1890").getTime();
export const maxBirthDate: number = new Date((new Date().getFullYear() - ageLimit).toString()).getTime();

export function lengthCheckWithoutWhitespace(
  minLength: number, text: string
  ): boolean {
    let cleanString = text.replaceAll(/\s+/g, "");
    if (cleanString.length < minLength) return false;
  return true;
}

export type LengthType = {
  [key: string]: { min: number; max: number };
};

export const length: LengthType = {
  username: { min: 3, max: 30 },
  email: { min: 5, max: 254 },
  password: { min: 8, max: 256 },
  "login.username": { min: 5, max: 30 },
  "login.email": { min: 5, max: 254 },
  "login.password": { min: 8, max: 256 },

  avatar: { min: 0, max: 500 },
  "personal.avatar": { min: 0, max: 500 },

  firstName: { min: 0, max: 35 },
  lastName: { min: 0, max: 35 },
  "personal.name.firstName": { min: 0, max: 35 },
  "personal.name.lastName": { min: 0, max: 35 },

  birthday: { min: 10, max: 10 },
  "personal.birthday.date": { min: 10, max: 10 },

  country: { min: 0, max: 50 },
  "personal.location.country.name": { min: 0, max: 50 },

  bio: { min: 0, max: 1000 },
  "personal.bio": { min: 0, max: 1000 },

  phone: { min: 0, max: 20 },
  "personal.contacts.phone": { min: 0, max: 20 },
  "personal.contacts.email": { min: 0, max: 254 },
  "personal.contacts.links.url": { min: 0, max: 500 },
  "personal.contacts.links.title": { min: 0, max: 30 },

  link: { min: 0, max: 500 },
  title: { min: 3, max: 100 },
  description: { min: 0, max: 1000 },
  comment: { min: 1, max: 500 },
  message: { min: 1, max: 1000 },
};
