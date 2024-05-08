import React from 'react'

const Input = ({icon,onChange,value,placeholder,inputStyle,containerStyle,type}) => {
  return (
    <div style={{display:'flex',alignItems:"center",...containerStyle}}>
    {icon}
    <input type={type} placeholder={placeholder} style={{margin:15,...inputStyle}} value={value} onChange={onChange}/>
  </div>
  )
}

export default Input