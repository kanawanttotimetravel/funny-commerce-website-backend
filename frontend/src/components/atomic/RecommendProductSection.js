'use client'

import ItemCard from "@/components/atomic/ItemCard";
import {useEffect, useState} from "react";
import {Poppins} from "next/font/google";
import Link from "next/link";
import axios from "axios";

import './style.css'

const poppins = Poppins({subsets: ['latin'], weight: "700"})

const RecommendProductSection = ({userId}) => {
  const [productList, setProductList] = useState([])

  const updateProduct = async () => {
    const pl = await axios({
        url: (process.env.HOST && `${process.env.HOST}/recommend`)
          || `http://localhost:5000/recommend`,
        method: 'post',
        data: {
          user_id: userId
        }
      }
    )
    setProductList(pl.data)
    // return pl.data.data
  }

  useEffect(() => {
    updateProduct()
  }, [])

  return (
    <div>
      <div style={sectionStyle}>
        {productList && productList.map((product) => (
          <li style={{
            listStyleType: 'none',
            margin: 0,
            padding: 0
          }} key={product.itemName}>
            <Link href={{
              pathname: `/shop/${product.itemId}`,
            }}>
              <ItemCard imageSrc={product.imageSrc} itemName={product.itemName} itemType={product.itemType}
                        price={product.price}>
              </ItemCard>
            </Link>
          </li>))
        }
      </div>

    </div>
  )
}


const sectionStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: 0,
  margin: 0
}
export default RecommendProductSection;
