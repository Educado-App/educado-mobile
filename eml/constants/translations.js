import { LANGUAGE } from '../config/environment'

/**
 * Translates a predefined string in english into the given language.
 * @param {String} text the text to be translated
 * @param {String} language [Optional] the language (as a two letter language code) to translate to. Defaults to the app language.
 */
export function translate(text, language = LANGUAGE) {
  let translation;
  if (!translations[text]) {
    throw new Error(`No translation found for text:\n '${text}'`);
  }

  if (language == 'en') {
    // Set translation to the key
    translation = text;
  } else {
    translation = translations[text][language];
  }

  if (translation) {
    return translation;
  } else {
    throw new Error(`No translation found for text:\n '${text}' \nin language '${language}'`);
  }
}


const translations = {
  'Hello': {
    'br': 'Olá',
  },

  // Form labels and placeholders
  'Firstname': {
    'br': 'Primeiro nome',
  },
  'Lastname': {
    'br': 'Sobrenome',
  },
  'Email': {
    'br': 'Email',
  },
  'Password': {
    'br': 'Senha',
  },
  'Confirm Password': {
    'br': 'Confirmar senha',
  },
  'Login': {
    'br': 'Entrar',
  },
  'Sign Up': {
    'br': 'Cadastrar',
  },
  'Forgot Password?': {
    'br': 'Esqueceu a senha?',
  },
  'Don\'t have an account yet?': {
    'br': 'Ainda não tem conta?',
  },
  'Sign up now': {
    'br': 'Cadastre-se agora',
  },
  'Already have an account?': {
    'br': 'Já tem uma conta?',
  },
  'Enter your password': {
    'br': 'Digite sua senha',
  },

  // Form alerts
  'This field is required': {
    'br': 'Este campo é obrigatório!',
  },
  'Invalid email': {
    'br': 'Email inválido!',
  },
  'Passwords do not match': {
    'br': 'As senhas não conferem!',
  },
  'No user exists with this email!': {
    'br': 'Não existe nenhum usuário com este email!',
  },
  'Password is incorrect!': {
    'br': 'Senha incorreta!',
  },
  'Error connecting to server!': {
    'br': 'Erro de conexão com o servidor!',
  },



}