import React from 'react'

const Input = React.memo(
  ({label, name, value, error, onChange, onBlur, type = 'text'}) => (
    <div style={{marginBottom: 16}}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
      />
      {error && <div style={{color: 'red', fontSize: 12}}>{error}</div>}
    </div>
  ),
)

export default Input
