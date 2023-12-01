import React from "react";

const Items: React.FC<Item> = ({ item, removeItem }) => {
    return (
        <div className="item">
            <div className="item-date">{item.date}</div>
            <div className="item-distance">{item.distance.toFixed(1)}</div>
            <div className="item-buttons">
                <button className="item-edit-button">&#9998;</button>
                <button className="item-delete-button" data-id={item.date} onClick={removeItem}>&#10006;</button>
            </div>
        </div>
    )
}

type Item = {
    item: Training,
    removeItem: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

type Training = {
    date: string,
    distance: number,
}

export default Items