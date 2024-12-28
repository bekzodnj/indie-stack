import { useState } from "react";
import { authClient } from "~/lib/auth-client";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const signUp = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        image: image ? convertImageToBase64(image) : undefined,
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  };

  function convertImageToBase64(file: File): string {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return reader.result as string;
  }

  return (
    <div>
      <input
        type="name"
        value={name}
        className="border"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        value={password}
        className="border"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="border"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0])}
        className="border"
      />
      <button onClick={signUp} className="border">
        Sign Up
      </button>
    </div>
  );
}
