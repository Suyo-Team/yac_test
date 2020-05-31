import { useEffect, useState } from 'react';
import Router from 'next/router';

const Login = (props: LoginProps) => {
  const [title, setTitle] = useState('Login');
  const [name, setName] = useState('');

  useEffect(() => {
    if (props.error) {
      alert(props.error);
      props.set_null_error();
    }
  }, [props.error]);

  useEffect(() => {
    if (props.code) {
      Router.push('/chat');
    }
  }, [props.code]);

  const changeTitleHandle = (value: string) => {
    setTitle(value);
  };

  const changeNameHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const formHandle = async () => {
    if (!name) {
      return alert('Field require');
    }
    if (title === 'Login') {
      await props.login({ name });
    } else {
      await props.register({ name });
    }
    setName('');
  };

  const validateText = (options: string[]) => {
    return title === 'Login' ? options[0] : options[1];
  };

  return (
    <div className="container">
      <div
        className="row justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="col-4">
          <div className="card card-login">
            <div className="card-header ">
              <div className="container-btn-login">
                <h3 className="text-white">{title}</h3>
                <button
                  type="button"
                  id="sendlogin"
                  className={`btn ${validateText([
                    'btn-secondary',
                    'btn-success',
                  ])}`}
                  onClick={() =>
                    changeTitleHandle(validateText(['Register', 'Login']))
                  }
                >
                  {validateText(['Register', 'Login'])}
                </button>
              </div>
            </div>
            <div className="card-body card-body-login">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={name}
                  onChange={changeNameHandle}
                />
              </div>
              <button
                type="button"
                id="sendlogin"
                className="btn btn-primary"
                onClick={formHandle}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
