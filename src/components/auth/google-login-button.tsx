"use client";

import { GoogleLogin } from "@react-oauth/google";

interface GoogleLoginButtonProps {
  onSuccess: (token: string) => void;
  onError?: (error: any) => void;
  disabled?: boolean;
  locale?: string;
}

export function GoogleLoginButton({
  onSuccess,
  onError,
  disabled,
  locale = "es",
}: GoogleLoginButtonProps) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        if (credentialResponse.credential) {
          // This is the ID token (JWT) that your backend expects
          onSuccess(credentialResponse.credential);
        } else {
          onError?.(new Error("No credential received"));
        }
      }}
      onError={() => {
        console.error("Google login failed");
        onError?.(new Error("Google login failed"));
      }}
      text={locale === "es" ? "continue_with" : "continue_with"}
      shape="rectangular"
      size="large"
      width="100%"
      disabled={disabled}
    />
  );
}
