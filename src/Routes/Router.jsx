import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import OrderPage from "../pages/OrderPage";
import OrdersPage from "../pages/OrdersPage";
import ContactPage from "../pages/ContactPage";
import TeamPage from "../pages/TeamPage";
import AboutPage from "../pages/AboutPage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/Loginpage";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />

      {/* Product detail — full URL */}
      <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" component={ProductDetailPage} />
      <Route path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
      <Route path="/shop" component={ShopPage} />

      {/* Cart */}
      <Route path="/cart" component={CartPage} />

      {/* T23: Previous orders — protected */}
      <ProtectedRoute path="/orders" component={OrdersPage} />

      {/* T20-T22: Create order — protected */}
      <ProtectedRoute path="/order" component={OrderPage} />

      {/* Fallback product route */}
      <Route path="/product/:id" component={ProductDetailPage} />

      <Route path="/about"   component={AboutPage}   />
      <Route path="/contact" component={ContactPage} />
      <Route path="/team"    component={TeamPage}    />
      <Route path="/signup"  component={SignUpPage}  />
      <Route path="/login"   component={LoginPage}   />
      <Route component={NotFound} />
    </Switch>
  );
}