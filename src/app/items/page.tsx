"use client";
import React, { useState } from "react";
import "../page.scss";
import "./page.scss";
import Navbar from "../../components/navbar";
import Switch from "../../components/switch";
import { useSelector } from "react-redux";
import { Category as CategoryType, IBuyable, State } from "../../types";
import FontAwesome from "react-fontawesome";
import { formatPrice } from "@/utils/format";
import { toggleAvailable } from "@/utils/items";

const Item = ({ item }: { item: IBuyable }) => {
  return (
    <div
      className={"supplements" in item ? "item" : "item supplement"}
      onClick={() => toggleAvailable("supplements" in item ? item.id : `S${item.id}`)}>
      <div className="left-side">
        <Switch on={item.available} />
        <span>{item.name}</span>
      </div>
      <div>
        {formatPrice(item.orgaPrice)} - {formatPrice(item.price)}
      </div>
    </div>
  );
};

const Category = ({ category }: { category: CategoryType }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="category">
      <div className="title" onClick={() => setOpen(!isOpen)}>
        <FontAwesome name={`chevron-right ${isOpen ? "open" : ""}`} className="icon" />
        {category.name}
      </div>
      {isOpen && (
        <div className="items">
          {category.items.map((item, itemIndex) =>
            [item, ...item.supplements].map((entry, entryIndex) => (
              <Item item={entry} key={`${itemIndex}-${entryIndex}`} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

const itemsAvailable = (categories: Array<CategoryType>) =>
  categories.reduce((acc, curr) => {
    return acc + curr.items.filter((item) => item.available).length;
  }, 0);

const Page = () => {
  const categories = useSelector((state: State) => state.categories);

  return (
    <>
      <Navbar back="/" />
      <div id="items">
        <div className="stats">Items disponibles : {itemsAvailable(categories)}</div>
        <div className="categories">
          {categories.map((category, categoryIndex) => (
            <Category category={category} key={categoryIndex} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
