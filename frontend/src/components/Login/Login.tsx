import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/api";
import Logo from "../icons/Logo";

type LoginInfo = { username: string; password: string };

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const mutation = useMutation({
    mutationFn: ({ username, password }: LoginInfo) =>
      loginUser(username, password),
    onSuccess: () => {
      router.push("/games");
    },
    onError: () => {
      setError("Invalid credentials");
    },
  });

  const handleLogin = () => {
    mutation.mutate({ username, password });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className={styles.container}>
      <Logo />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown} // Add this
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown} // Add this
          className={styles.input}
        />
        {error && <div className={styles.error}>{error}</div>}
      <button disabled={!username || !password} className={styles.button} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
