import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import { fetchAuth } from '../actions/auth';
import { IsLogin } from '../utils/authentication';
import { setToken } from '../utils/token';

function Login(props) {

  const [userValues, setUserValues] = useState({
    username: null,
    password: null
  });

  const changeValues = ({ target }) => {
    setUserValues({
      ...userValues,
      [target.name]: target.value
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    props.fetchAuth('login', userValues.username, userValues.password);
  };

  useEffect(() => {
    if (props.authToken.token != null) {
      setToken(props.authToken.token);
      Router.push('/');
    }
  }, [props.authToken]);

  return (
    <Layout title="Giriş Yap">
      <div className="login-photo">
        <div className="form-container">
          <div className="image-holder"></div>
          <form onSubmit={handleLogin}>
            <h2 className="text-center">
              <strong>Giriş Yap</strong>
            </h2>
            <div className="form-group">
              <input className="form-control" autoComplete="username" type="text" name="username" onChange={event => changeValues(event)} placeholder="Kullanıcı adı" required minLength="4" maxLength="10" />
            </div>
            <div className="form-group">
              <input className="form-control" autoComplete="password" type="password" name="password" onChange={event => changeValues(event)} placeholder="Şifre" required />
            </div>
            <div className="form-group">
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">Giriş Yap</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

Login.getInitialProps = async(context) => {
  IsLogin(context);
  return {};
}

const mapStateToProps = ({ authToken }) => ({
  authToken
});

const mapDispatchToProps = {
  fetchAuth
};

Login.propTypes = {
  fetchAuth: PropTypes.func,
  authToken: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
