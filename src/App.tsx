import React from "react";
import styles from "./App.module.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Tracker from "./pages/Tracker/Tracker";
import TrackedItems from "./pages/TrackedItems/TrackedItems";
import DetailsPage from "./pages/DetailsPage/DetailsPage";

const App: React.FC = () => {
  return (
    <main className={styles.main}>
      <Router>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={styles.tab}
            activeClassName={styles.selectedTab}
            exact
          >
            Create task
          </NavLink>
          <NavLink
            to="/list"
            className={styles.tab}
            activeClassName={styles.selectedTab}
            exact
          >
            Tracked tasks
          </NavLink>
        </nav>
        <Switch>
          <Route path="/" exact>
            <Tracker />
          </Route>
          <Route path="/list" exact>
            <TrackedItems />
          </Route>
          <Route path="/details/:id">
            <DetailsPage />
          </Route>
        </Switch>
      </Router>
    </main>
  );
};

export default App;
