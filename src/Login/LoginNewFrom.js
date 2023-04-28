import { useState, useRef } from "react";

//import classes from "./AuthForm.module.css";

const AuthForm = () => {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef= useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    const enteredemail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);

    let url;
    if(!isLogin && (enteredPassword !== confirmPasswordRef.current.value)){
      return alert("Password is not same")
  }
    else if (isLogin) {
      url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrucgoKIF2AuihFK5MtNhq7CmGdyFnp5A";
    } else {
      url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrucgoKIF2AuihFK5MtNhq7CmGdyFnp5A";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredemail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authonication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
       // authCtx.login(data.idToken, data.email);
         //history.replace('/')
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
    <section >
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={SubmitHandler}>
        <div >
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>

        {!isLogin && <div >
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            required
            ref={confirmPasswordRef}
          />
        </div>}
        <div >
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request...</p>}
          {/* {isLogin && <Link to='/forget' > Forget Password ?</Link>}<br/> */}
        </div>
      </form>
      <div >
     <button
     type="button"
     
     onClick={switchAuthModeHandler}
   >
     {isLogin ? "Create new account" : "Login with existing account"}
   </button>
   </div>
    </section>
    
   </>
  );
};

export default AuthForm;