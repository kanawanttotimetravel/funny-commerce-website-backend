"use client";

import React, { useState } from "react";
import Header from "@/components/headercomponent/HeaderComponent";
import ItemCard from "@/components/atomic/ItemCard";
import Footer from "@/components/footer/footer";
import item_card from "./productdata";
import "./style.css";

const ListOfProductPage = () => {
    const [limit, setLimit] = useState(12);

    const handleLoadMore = () => {
        setLimit(prevLimit => prevLimit + 12);
    };

    const listItems = item_card.slice(0, limit).map(item => (
        <div className="item-wrapper" key={item.id}>
            <ItemCard
                imageSrc={item.imageSrc}
                itemName={item.itemName}
                itemType={item.itemType}
                price={item.price}
            />
        </div>
    ));

    return (
        <div>
            <Header />
            <main>
                <div className="title">List of products</div>
                <div className="item-display-container">
                    <div className="item-display">
                        {listItems}
                    </div>
                </div>
                <div className="show-more-button-container">
                    {limit < item_card.length && (
                        <button className="show-more-button" onClick={handleLoadMore}>
                            Show More
                        </button>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ListOfProductPage;
