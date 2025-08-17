// import React from 'react'


type ButtonProps = {
    children:string,
    buttonType:'primary' | 'secondary' ,
    className?:string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const customStyle  = {
    primary:'bg-[var(--secondary-color)] text-[var(--light-color)] px-7 py-2 rounded-3xl hover:opacity-75 cursor-pointer ',
    secondary:'bg-[var(--light-color)] text-[var(--secondary-color)] px-7 py-2 rounded-3xl cursor-pointer '
}


const Button = ({children,buttonType,className = "",...rest}:ButtonProps) => {
  return (
    <button className={`${customStyle[buttonType]+ " " + className}`} {...rest}>{children}</button>
  )
}

export default Button