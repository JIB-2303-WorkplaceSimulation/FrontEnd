import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import admin_page from "./components/admin_page";
import home from "./components/home"
import sim_page from "./components/sim_page"

function App () {
  return (
    <>
      <Router>
		    <Switch>
        <Route exact path="/" component={home} />
        <Route path="/admin_page" component={admin_page} />
        <Route path="/sim_page" component={sim_page} />
        <Redirect to="/" />
        </Switch>
	    </Router>
    </>
  )
}
export default App