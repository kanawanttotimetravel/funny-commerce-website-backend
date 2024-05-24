'use client'


import axios from "axios";
import Header from "@/components/headercomponent/HeaderComponent";
import {useEffect, useState} from "react";
import {Poppins} from "next/font/google";
import '../style.css'
import RelatedProductSection from "@/components/atomic/RelatedProductSection";


const poppins = Poppins({subsets: ['latin'], weight: "400"})

const Product = ({params}) => {
  const productId = params.id
  const [product, setProduct] = useState({})
  const [rating, setRating] = useState(0)
  const [addCount, setAddCount] = useState(0)
  const updateProduct = async () => {
    const req = await axios({
        url: (process.env.HOST && `${process.env.HOST}/Product/${productId}`)
          || `http://localhost:5000/Product/${productId}`,
        method: 'get',
      }
    )
    setProduct(req.data)
  }


  const updateRating = async () => {
    const req = await axios({
        url: (process.env.HOST && `${process.env.HOST}/rating`)
          || `http://localhost:5000/rating/`,
        method: 'post',
        data: {
          'product_id': productId
        }
      }
    )
    setRating(req.data.score)
  }
  useEffect(() => {
    updateProduct()
    updateRating()
  }, [])

  return (<>
    <Header></Header>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }}>
      <img src={product.imageSrc}
           alt={`${product.imageSrc}`}
           style={ImageStyle}>

      </img>
      <div style={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        margin: '2rem 1rem',
        // backgroundColor: 'grey',
        gap: '1rem'
      }}>
        <p style={{
          ...TextStyle,
          color: '#000000',
          fontSize: '2rem',
          fontStyle: 'normal',
          fontWeight: '400',
        }}>
          {product.itemName}
        </p>
        <p style={{
          ...TextStyle,
          color: '#9F9F9F',
          fontSize: '1.5rem',
          fontStyle: 'normal',
          fontWeight: '500',
        }}>
          VND {product.price}
        </p>
        <p style={{
          ...TextStyle,
          color: '#000000',
          fontSize: '1.5rem',
          fontStyle: 'normal',
          fontWeight: '500',
        }}>
          Rating: {rating} / 10
        </p>
        <p style={{
          ...TextStyle,
          color: '#000000',
          fontSize: '1rem',
          fontStyle: 'normal',
          fontWeight: '400',
        }}>
          {product.itemInfo}
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <div style={{
            margin: '1.5rem 1.5rem',
            fontSize: '1.5rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <a onClick={() => {
              if (addCount > 0)
                setAddCount(addCount - 1)
            }}> - </a>
            <p style={TextStyle}>
              {addCount}
            </p>
            <a onClick={() => setAddCount(addCount + 1)}> + </a>
          </div>
          <button style={ButtonStyle} onClick={() => console.log('cart')}>
            <p style={TextStyle}> Add to cart </p>
          </button>
        </div>
      </div>
    </div>
    <RelatedProductSection itemId={productId}></RelatedProductSection>
  </>)
}

const ImageStyle = {
  height: '30rem',
  width: '30%',
  objectFit: 'contain',
  margin: '2rem 1rem',
  padding: '0',
  border: '1px',
  borderStyle: 'solid',
  display: 'block',
}

const ButtonStyle = {
  width: '13rem',
  height: '4rem',
  border: '1px solid #000000',
  borderRadius: '1rem'
}

const TextStyle = {
  margin: 0,
  className: poppins.className,
  // lineHeight: '150%',
  // whiteSpace: 'nowrap',
  // overflow: 'hidden',
  // textOverflow: 'ellipsis'
}
export default Product;