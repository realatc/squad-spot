import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, 
  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

  // signInWithPopup
  const firebaseConfig = {
    apiKey: "AIzaSyDAhwq9MsP88wWbyuYOjnEhCgKf1-kji-E",
    authDomain: "squad-spot-1619c.firebaseapp.com",
    projectId: "squad-spot-1619c",
    storageBucket: "squad-spot-1619c.firebasestorage.app",
    messagingSenderId: "874424419641",
    appId: "1:874424419641:web:602ce80aa51288fbb754e8",
    measurementId: "G-81VTVM9XMT"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();



  const signinPage = document.getElementById("signin-page");
  const appSection = document.getElementById("app-wrapper");
  const header = document.querySelector("header");
  const nav = document.querySelector(".bottom-nav");
  const floatingBtn = document.getElementById("floatingNewSquadBtn");

  // Show/hide UI based on auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User signed in: show app, hide sign-in form
      signinPage.style.display = "none";
      appSection.style.display = "flex"; //block
      header.style.display = "flex";
      nav.style.display = "flex";
      floatingBtn.style.display = "flex";

    } else {
      // No user: show sign-in form, hide app
      signinPage.style.display = "flex";
      appSection.style.display = "none";
      header.style.display = "none";
      nav.style.display = "none";
      floatingBtn.style.display = "none";
    }
  });
 
  // Sign in
  //Log out
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) { // This check is crucial and good practice!
      logoutBtn.addEventListener("click", async () => {
        await signOut(auth);
        window.location.href = "index.html";
  });
}

    // Sign in through Email & Password
    const loginEmailPassword = document.getElementById("loginbtn");
    const loginEmail = document.getElementById("loginUsername");
    const loginPassword = document.getElementById("loginPassword");

    if (loginEmailPassword) {
      loginEmailPassword.addEventListener("click", () => {
        const email = loginEmail.value;
        const password = loginPassword.value;
        
        signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          localStorage.setItem('userId', user.uid);
          window.location.href = "index.html";// change this to Squad Spot main page
        })
        .catch((error) => {
          console.error("Email login error: ", error.code, error.message);
          alert("Login failed: " + error.message);
        });
      });
    }

    // Google signin
    const googleLogin = document.getElementById("googleSignInBtn");
    
    if (googleLogin) {
      googleLogin.addEventListener("click", () => {
        signInWithPopup(auth, provider)
        .then((result) => {
          const credential1 = GoogleAuthProvider.credentialFromResult(result);
          const user = result.user;
          localStorage.setItem('user1', user.uid);
          window.location.href = "index.html"; // change this to Squad Spot main page
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      });
    }

    // Create Account
    const createAccount = document.getElementById("createAccountBtn"); //linkCreateAccount
    const signupEmail = document.getElementById("signupEmail");
    const signupPassword = document.getElementById("signupPassword");
    const signupConfirmPassword = document.getElementById("signupConfirmPassword");
    
    if (createAccount){
      createAccount.addEventListener("click", (e) => {
        e.preventDefault();

        const email = signupEmail.value;
        const password = signupPassword.value;
        const confirmPassword = signupConfirmPassword.value;
        
        if (password !== confirmPassword) {
          console.error("Passwords do not match.");
          alert("Error: Passwords do not match.");
          return;
        }
        createUserWithEmailAndPassword(auth, email, password)
          .then((result) => {
            const user = result.user;
            localStorage.setItem('user1', user.uid);
            alert("Account created successfully!");
            window.location.href = "index.html"; // change this to Squad Spot main page
          })
          .catch((error) => {
            console.error("Signup error: ", error.code, error.message);
            alert("Signup failed: " + error.message);
          });
      });
    }

