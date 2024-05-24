/*
  Usage:
   <ItemCard
        imageSrc={<image_file>}
        itemName={<name>}
        itemType={<type>}
        price={<price>}
      ></ItemCard>

 */
import {Poppins} from "next/font/google";
import './style.css'

const poppins = Poppins({subsets: ['latin'], weight: "400"})

const ItemCard = ({imageSrc, itemName, itemType, price}) => {
  return <div style={CardStyle} className={'card'}>
    <div style={{
      width: '100%',
      height: '70%',
      margin: 0,
      padding: 0,
    }}
    >
      <img
        src={imageSrc}
        alt={`${imageSrc}`}
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          margin: '0',
          padding: '0',
          display: 'block',
        }}
      >
      </img>
    </div>
    <div style={{
      height: '30%',
      padding: '1rem',
      margin: '0',
      backgroundColor: '#F4F5F7'
    }}>
      <p style={{
        ...DescriptionStyle,
        color: '#3A3A3A',
        fontSize: '1.5rem',
        fontStyle: 'normal',
        fontWeight: '600',
      }}
      >
        {itemName}
      </p>
      <p style={{
        ...DescriptionStyle,
        color: '#898989',
        fontSize: '1rem',
        fontStyle: 'normal',
        fontWeight: '500',
      }}>
        {itemType}
      </p>
      <p style={{
        ...DescriptionStyle,
        color: '#3A3A3A',
        fontSize: '1.25rem',
        fontStyle: 'normal',
        fontWeight: '400',
      }}>
        {price} VND
      </p>
    </div>

  </div>
}

const CardStyle = {
  display: 'block',
  flexDirection: 'column',
  width: '15rem',
  height: '21rem',
  margin: '2rem 1rem',
  padding: '0rem',
  className: poppins.className,
}

const DescriptionStyle = {
  margin: 0,
  lineHeight: '150%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

export default ItemCard;