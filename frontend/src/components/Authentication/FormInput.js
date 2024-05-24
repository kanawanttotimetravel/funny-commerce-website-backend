import {Montserrat} from "next/font/google";

const montserrat = Montserrat({subsets: ['latin']})

const FormInput = ({name, type, placeholder}) => {
  return (
    <div style={PlaceHolderStyle}>
      <input style={InputStyle} name={name} type={type} placeholder={placeholder}/>
    </div>
  );
}

const PlaceHolderStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '18.75rem',
  height: '2.8125rem',
  borderWidth: '1px',
  borderRadius: '0.25rem',
  borderStyle: 'solid',
  // paddingLeft: '1.5rem'
}

const InputStyle = {
  fontSize: '0.875rem',
  className: montserrat.className,
  background: 'transparent',
  border: 'none',
  outline: 'none'
}
export default FormInput;