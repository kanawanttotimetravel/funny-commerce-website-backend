"use client";

import React, { useState } from "react";
import ItemCard from "@/components/atomic/ItemCard";
import "./stylePurchaseHis.css";
import purchased_goods from "./purchasehistorydata";

const PurchaseHistory = () => {
    const [limit, setLimit] = useState(12);

    const handleLoadMore = () => {
        setLimit(prevLimit => prevLimit + 12);
    };

    const listPurchased = purchased_goods.slice(0, limit).map(item => (
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
            <main>
                <div className="title">Purchase history</div>
                <div className="item-display-container">
                    <div className="item-display">
                        {listPurchased}
                    </div>
                </div>
                <div className="show-more-button-container">
                    {limit < purchased_goods.length && (
                        <button className="show-more-button" onClick={handleLoadMore}>
                            Show More
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PurchaseHistory;
