import { useContext } from "react";
import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllProducts from "./page/AllProducts";
import LogIn from "./page/LogIn";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import NotFound from "./page/NotFound";
import Wish from "./page/Wish";
import AuthContext from "./store/auth-context";
//import AddProduct from "./page/AddProduct";
const AddProduct = React.lazy(() => import("./page/AddProduct"));

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/products" />
          </Route>
          <Route path="/products">
            <AllProducts />
          </Route>

          <Route path="/wish">
            <Wish />
          </Route>
          {isLoggedIn && (
            <Route path="/add-product">
              <AddProduct />
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="/log-in">
              <LogIn />
            </Route>
          )}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
