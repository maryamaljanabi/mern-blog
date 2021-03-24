import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import NewPost from "./pages/Posts/NewPost";
import UserPosts from "./pages/Posts/UserPosts";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/posts" component={UserPosts} />
        <Route exact path="/posts/new" component={NewPost} />
      </Switch>
    </Layout>
  );
}

export default App;
