import React, { useState } from "react";
import { useRouter } from 'next/router';
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import styles from "../../styles/Login.module.scss";
import buttonStyles from "../../styles/Button.module.scss"

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push('Home');
  };

  return (
    <div className={styles.login_form}>
      <div className={styles.image_container}>
        <img src="../../../images/loginImage.jpg" alt="" />
      </div>
      <div className={styles.form_container}>
        <div className={styles.title_container}>
            <h3>Hello Again!</h3>
            <p>Welcome back you've been missed!</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className={styles.username_input}>
            <Input
              className={styles.login_input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className={styles.password_input}>
            <Input
              className={styles.login_input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className={styles.button_container}>
            <Button type="submit" name="Login" className={buttonStyles.login_button} />
          </div>
        </form>
            <div className={styles.or_line}>
                <span className={styles.or_text}>or continue with</span>
            </div>
            <div className={styles.facebook_login}>
                <FontAwesomeIcon icon={faFacebook} />
            </div>
      </div>
    </div>
  );
}
