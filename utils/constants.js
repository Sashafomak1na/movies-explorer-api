const EMAIL_REGEX = /.+@.+\..+/;
const PASSWORD_REGEX = /^(?=.*[A-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const LOCAL_HOST = 'localhost:3000';
const LOCAL_HOST_HTTP = 'http://localhost:3000';
const SERVER_HOST_HTTP = 'http://api.sashka.nomoredomainsmonster.ru';
const SERVER_HOST_HTTPS = 'https://api.sashka.nomoredomainsmonster.ru';
const CONNECTION_WITH_BD = 'Подключено к БД';
const ERROR_CONNECTION_WITH_DB = 'Ошыбка подкючения к БД';

const PAGE_NOT_FOUND = 'Страницы по запрошенному URL не существует';
const APP_ON_PORT = 'App listening on port';
const PREFIX_FOR_TOKEN = 'Bearer ';
const PASSWORD_PREFIX = '+password';
const DELET_FILM = 'Фильм успешно удалён';
const AUTHORIZATION = 'Успешная авторизация';

const CAST_ERROR = 'CastError';
const CONFLICT_ERROR = 'ConflictError';
const ERROR_11000 = 11000;
const VALIDATION_ERROR = 'ValidationError';
const FILM_NOT_FOUND = 'Фильм с указанным id не найден';
const USER_NOT_FOUND = 'Пользователь с указанным id не найден';
const FORBIDDEN_DELETE_FILM_ERROR = 'Недостаточно прав для удаления данного фильма';
const USER_EMAIL_EXISTS = 'Пользователь с таким адресом электронной почты уже существует';
const ERROR_URL = 'Передан некорректный URL-адрес';
const ERROR_USER_ID = 'Передан некорректный id пользователя';
const ERROR_AUTHORIZATION_DATA = 'Введены некорректные данные для авторизации';
const ERROR_DATA_ADD_FILM = 'Переданы некорректные данные для добавления фильма';
const ERROR_DATA_DELETE_FILM = 'Переданы некорректные данные для удаления фильма';
const ERROR_DATA_UPDATE_USER = 'Переданы некорректные данные для обнавления информации о пользователе';
const ERROR_DATA_CREATE_USER = 'Переданы некорректные данные для создания пользователя';
const ERROR_EMAIL = 'Передан некорректный адрес электронной почты';

module.exports = {
  ERROR_CONNECTION_WITH_DB,
  PAGE_NOT_FOUND,
  APP_ON_PORT,
  PREFIX_FOR_TOKEN,
  DELET_FILM,
  AUTHORIZATION,
  ERROR_11000,
  PASSWORD_PREFIX,
  URL_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  LOCAL_HOST,
  LOCAL_HOST_HTTP,
  SERVER_HOST_HTTP,
  SERVER_HOST_HTTPS,
  CONNECTION_WITH_BD,

  CONFLICT_ERROR,
  VALIDATION_ERROR,
  CAST_ERROR,
  ERROR_URL,
  ERROR_AUTHORIZATION_DATA,
  ERROR_DATA_ADD_FILM,
  ERROR_DATA_DELETE_FILM,
  ERROR_DATA_UPDATE_USER,
  ERROR_DATA_CREATE_USER,
  ERROR_EMAIL,
  ERROR_USER_ID,
  FILM_NOT_FOUND,
  USER_NOT_FOUND,
  USER_EMAIL_EXISTS,
  FORBIDDEN_DELETE_FILM_ERROR,
};
