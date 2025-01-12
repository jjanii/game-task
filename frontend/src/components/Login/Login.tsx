import { useState } from "react";
import styles from "./Login.module.css";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/api";
import Logo from "../icons/Logo";

type LoginInfo = { username: string; password: string };

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ username, password }: LoginInfo) =>
      loginUser(username, password),
    onSuccess: () => {
      router.push("/games");
    },
    onError: () => {
      alert("Invalid credentials");
    },
  });

  const handleLogin = () => {
    mutation.mutate({ username, password });
  };

  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.inputs}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
      </div>
      <button className={styles.button} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
