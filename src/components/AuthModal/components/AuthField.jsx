const AuthField = ({ label, name, type = "text", value, onChange }) => (
  <div className="auth-field">
    <label>{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default AuthField;