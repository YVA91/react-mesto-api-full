function AuthForm({ onSubmit, title, nameEmail, emailValue, namePassword, passwordValue, onChange, buttonText }) {
  return (
    <form className='authform' onSubmit={onSubmit}>
      <h2 className='authform__title'>{title}</h2> 
      <label className="authform__field">
        <input 
          name={nameEmail}
          className="authform__field-item" 
          id="email"
          type="email"  
          placeholder="Email"  
          required
          minLength="2"
          value={emailValue || ""}
          onChange={onChange}
        />
      <span className="popup__field-item-error" id="title-error"></span>
        </label>
      <label className="authform__field">
        <input 
          name={namePassword}
          className="authform__field-item" 
          id="password"
          type="password" 
          placeholder="Пароль"
          required
          minLength="2"
          value={passwordValue || ""}
          onChange={onChange} 
        />
        <span className="popup__field-item-error" id="link-error"></span>
      </label>
      <button className="authform__button" type="submit" aria-label={buttonText}>{buttonText}</button>
      <p></p>
    </form>
  );
}

export default AuthForm;