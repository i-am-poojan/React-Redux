import React from 'react';
import { connect } from 'react-redux';
const Home = ({ theme, locale, changeTheme, changeLocale }) => {
  return (
    <div>
      <h1>{`Current Theme:${theme}`}</h1>
      <h1>{`current Locale:${locale}`}</h1>
      <button
        type="button"
        onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}
      >
        change Theme
      </button>
      <button
        type="button"
        onClick={() =>
          changeLocale(locale === 'english' ? 'gujarati' : 'english')
        }
      >
        change locale
      </button>
    </div>
  );
};
const mapStateToProps = ({ theme, locale }) => {
  return {
    theme,
    locale,
  };
};
const mapDispatchStateToProps = dispatch => {
  return {
    changeTheme: payload => dispatch({ type: 'TOGGLE_THEME', payload }),
    changeLocale: payload => dispatch({ type: 'TOGGLE_LOCALE', payload }),
  };
};

export default connect(mapStateToProps, mapDispatchStateToProps)(Home);
