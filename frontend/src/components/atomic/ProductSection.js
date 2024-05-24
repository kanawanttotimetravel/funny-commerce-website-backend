'use client'

import ItemCard from "@/components/atomic/ItemCard";
import {useEffect, useState} from "react";
import {Poppins} from "next/font/google";
import Link from "next/link";
import axios from "axios";

const poppins = Poppins({subsets: ['latin'], weight: "700"})

const ProductSection = ({pageSize}) => {
  const [productList, setProductList] = useState([])
  const [page, setPage] = useState(1)

  const updateProduct = async () => {
    const pl = await axios({
        url: (process.env.HOST && `${process.env.HOST}/Product/page`) || 'http://localhost:5000/Product/page',
        method: 'post',
        data: {
          page: page,
          size: pageSize,
        }
      }
    )
    setProductList(pl.data.data)
    // return pl.data.data
  }

  useEffect(() => {
    updateProduct()
  }, [page])

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
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '2rem',
        margin: '2rem'
      }}>
        {page > 1 && <button style={buttonStyle} onClick={() => setPage(page - 1)} type="button">
          PREV
        </button>}
        <button style={buttonStyle} onClick={() => setPage(page + 1)} type="button">
          NEXT
        </button>
      </div>
    </div>
  )
}

const buttonStyle = {
  width: '4rem',
  height: '4rem',
}

const sectionStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: 0,
  margin: 0
}
export default ProductSection;
