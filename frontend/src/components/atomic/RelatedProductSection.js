'use client'

import ItemCard from "@/components/atomic/ItemCard";
import {useEffect, useState} from "react";
import {Poppins} from "next/font/google";
import Link from "next/link";
import axios from "axios";

const poppins = Poppins({subsets: ['latin'], weight: "700"})

const RelatedProductSection = ({itemId}) => {
  const [productList, setProductList] = useState([])

  const updateProduct = async () => {
    const pl = await axios({
        url: (process.env.HOST && `${process.env.HOST}/Product/${itemId}/related`)
          || `http://localhost:5000/Product/${itemId}/related`,
        method: 'get',
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
export default RelatedProductSection;
