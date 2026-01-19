"use client";

import { useState } from "react";

interface FacebookLoginButtonProps {
  onSuccess: (token: string) => void;
  onError?: (error: any) => void;
  disabled?: boolean;
  locale?: string;
}

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export function FacebookLoginButton({
  onSuccess,
  onError,
  disabled,
  locale = "es",
}: FacebookLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const initFacebookSDK = () => {
    return new Promise<void>((resolve) => {
      // If already loaded
      if (window.FB) {
        resolve();
        return;
      }

      // Load Facebook SDK
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
          cookie: true,
          xfbml: true,
          version: "v18.0",
        });
        resolve();
      };

      // Load SDK script
      if (!document.getElementById("facebook-jssdk")) {
        const script = document.createElement("script");
        script.id = "facebook-jssdk";
        script.src = "https://connect.facebook.net/en_US/sdk.js";
        document.body.appendChild(script);
      }
    });
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await initFacebookSDK();

      window.FB.login(
        (response: any) => {
          if (response.authResponse) {
            onSuccess(response.authResponse.accessToken);
          } else {
            onError?.(new Error("Facebook login cancelled"));
          }
          setIsLoading(false);
        },
        { scope: "public_profile" }
      );
    } catch (error) {
      console.error("Facebook login error:", error);
      onError?.(error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={disabled || isLoading}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
    >
      <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
      <span>
        {isLoading
          ? locale === "es"
            ? "Cargando..."
            : "Loading..."
          : "Facebook"}
      </span>
    </button>
  );
}
