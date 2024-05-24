import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ['latin'] });

const FormInputCustom = ({ name, type, placeholder, width = '18.75rem', marginRight = '1rem'  }) => {
  return (
    <div style={{ marginRight }}>
      <p>{name}</p>
      <div style={{ ...placeHolderStyle, width }}>
        <input style={inputStyle} name={name} type={type} placeholder={placeholder} />
      </div>
    </div>
  );
}

const placeHolderStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '2.8125rem',
    borderWidth: '1px',
    borderRadius: '0.25rem',
    borderStyle: 'solid',
};

const inputStyle = {
  fontSize: '0.875rem',
  className: montserrat.className,
  background: 'transparent',
  border: 'none',
  outline: 'none'
};

export default FormInputCustom;
