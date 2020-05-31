interface Objects {
  [key as string]: string;
}

type Method = 'POST' | 'GET';

interface LoginProps {
  error: string;
  code: string;
  set_null_error: () => null;
  login: (data: Object) => void;
  register: (data: Object) => void;
}

interface ChatProps {
  user: ReducerUser;
  messages: Message[];
  addMessage: (data: Object) => void;
  loadMessageSuccess: (data?: Object) => void;
  logOut: () => void;
}

interface ReducerUser {
  name: string;
  key: string;
  error: string | null;
}

interface ChatReducer {
  messages: Message[];
}

interface Message {
  code: string;
  date: number;
  msg: property;
  name: string;
}
