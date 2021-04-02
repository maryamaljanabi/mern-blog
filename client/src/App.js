import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import NewPost from "./pages/Posts/NewPost";
import UserPosts from "./pages/Posts/UserPosts";
import EditPost from "./pages/Posts/EditPost";
import UserProfile from "./pages/Users/UserProfile";
import Post from "./pages/Posts/Post";
import LoggedInRoute from "./LoggedInRoute";
import NotLoggedInRoute from "./NotLoggedInRoute";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <NotLoggedInRoute exact path="/login" component={Login} />
        <NotLoggedInRoute exact path="/signup" component={Signup} />
        <Route exact path="/user/posts" component={UserPosts} />
        <Route exact path="/user/profile" component={UserProfile} />
        <Route exact path="/posts/view" component={Post} />
        <LoggedInRoute exact path="/posts/new" component={NewPost} />
        <LoggedInRoute exact path="/posts/edit" component={EditPost} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
