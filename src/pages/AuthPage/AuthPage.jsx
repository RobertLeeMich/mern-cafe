import SignUpForm from "../../components/SignupForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

function AuthPage(props) {
  return (
    <main>
      <h1>AuthPage</h1>
      <SignUpForm setUser={props.setUser} />
      <LoginForm setUser={props.setUser} />
    </main>
  );
}

export default AuthPage;
