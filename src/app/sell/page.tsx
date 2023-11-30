"use client";
import "../page.scss";
import "./page.scss";
import React from "react";
import ItemsGrid from "../../components/itemsGrid";
import Navbar from "../../components/navbar";
import PriceToogler from "../../components/priceToogler";
import Basket from "../../components/basket";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket } from "@/reducers/basket";
import { State } from "@/types";
import { setNormalPrice } from "@/reducers/orgaPrice";
import { useSearchParams } from "next/navigation";

/**
 * /sell
 *
 * Query params: ?only=(food|goodies)
 */

const Page = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  let categories = useSelector((state: State) => state.categories);

  if (searchParams.has("only")) {
    categories = categories.filter((category) => category.key == searchParams.get("only"));
  } else if (searchParams.has("except")) {
    categories = categories.filter((category) => category.key !== searchParams.get("except"));
  }

  categories = categories.map((category) => ({
    ...category,
    items: category.items.filter((item) => item.available)
  }));

  const onBack = () => {
    dispatch(clearBasket());
    dispatch(setNormalPrice());
  };

  return (
    <>
      <Navbar back="/" onBack={() => onBack()}>
        <PriceToogler />
      </Navbar>
      <div id="sell">
        <Basket />
        <ItemsGrid categories={categories} />
      </div>
    </>
  );
};

export default Page;
