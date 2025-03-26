import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useState } from "react";
import { redirect } from "react-router";

import { authClient } from "~/lib/auth-client";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signUp = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard
          redirect("/dashboard");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <div>
      <h2>Create your account</h2>

      <TextInput
        label="Name"
        placeholder="Enter your name"
        onChange={(event) => setName(event.currentTarget.value)}
      />

      <TextInput
        label="Email"
        placeholder="Enter your email"
        onChange={(event) => setEmail(event.currentTarget.value)}
      />

      <PasswordInput
        value={password}
        placeholder="Enter your password"
        onChange={(event) => setPassword(event.currentTarget.value)}
      />

      <Button onClick={signUp} variant="filled">
        Button
      </Button>
    </div>
  );
}
