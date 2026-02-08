import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}
