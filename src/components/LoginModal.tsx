"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import styles from "./LoginModal.module.css";
import {
  loginWithEmail,
  signupWithEmail,
  loginWithGoogle,
  sendResetEmail,
} from "@/lib/auth";

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: LoginModalProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Control message shown only once after signup or reset
  const [showMessageOnce, setShowMessageOnce] = useState(false);

  useEffect(() => {
    if (showMessageOnce && message) {
      const timer = setTimeout(() => {
        setMessage(null);
        setShowMessageOnce(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showMessageOnce, message]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isResetPassword) {
        await sendResetEmail(email);
        setMessage("Check your email for the password reset link.");
        setShowMessageOnce(true);
      } else if (isSignup) {
        await signupWithEmail(email, password);
        setMessage(
          "Signup successful! A verification email has been sent. Please verify your email before logging in."
        );
        setShowMessageOnce(true);
        setIsSignup(false);
      } else {
        await loginWithEmail(email, password);
        onLoginSuccess?.();
        onClose();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      onLoginSuccess?.();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={styles.dialogWrapper} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter={styles.transitionEnter}
          enterFrom={styles.transitionEnterFrom}
          enterTo={styles.transitionEnterTo}
          leave={styles.transitionLeave}
          leaveFrom={styles.transitionLeaveFrom}
          leaveTo={styles.transitionLeaveTo}
        >
          <div className={styles.backdrop} />
        </Transition.Child>

        <div className={styles.container}>
          <div className={styles.flexCenter}>
            <Transition.Child
              as={Fragment}
              enter={styles.scaleEnter}
              enterFrom={styles.scaleEnterFrom}
              enterTo={styles.scaleEnterTo}
              leave={styles.scaleLeave}
              leaveFrom={styles.scaleLeaveFrom}
              leaveTo={styles.scaleLeaveTo}
            >
              <Dialog.Panel className={styles.dialogPanel}>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className={styles.closeButton}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <Dialog.Title className={styles.dialogTitle}>
                  {isResetPassword
                    ? "Reset Password"
                    : isSignup
                    ? "Sign Up"
                    : "Log In"}
                </Dialog.Title>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                  />
                  {!isResetPassword && (
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={styles.input}
                    />
                  )}

                  {error && <p className={styles.error}>{error}</p>}
                  {message && <p className={styles.message}>{message}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className={styles.submitButton}
                  >
                    {loading
                      ? "Please wait..."
                      : isResetPassword
                      ? "Send Reset Link"
                      : isSignup
                      ? "Sign Up"
                      : "Log In"}
                  </button>
                </form>

                {!isResetPassword && (
                  <>
                    {/* Google Login */}
                    <button
                      onClick={handleGoogleLogin}
                      disabled={loading}
                      className={styles.googleButton}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.29 1.54 7.73 2.84l5.64-5.64C33.3 3.6 28.97 2 24 2 14.64 2 7.02 8.36 4.24 16.46l6.94 5.39C12.44 15.05 17.74 9.5 24 9.5z"
                        />
                        <path
                          fill="#4285F4"
                          d="M46.1 24.5c0-1.63-.15-3.18-.43-4.68H24v8.85h12.34c-.53 2.88-2.14 5.32-4.55 6.96l6.94 5.39C42.98 36.64 46.1 30.05 46.1 24.5z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M10.18 28.85A13.92 13.92 0 0 1 9 24c0-1.67.3-3.28.84-4.77l-6.94-5.39C1.7 16.76 1 20.29 1 24s.7 7.24 1.9 10.16l6.94-5.31z"
                        />
                        <path
                          fill="#34A853"
                          d="M24 46c5.97 0 10.96-1.96 14.61-5.31l-6.94-5.39c-1.94 1.3-4.46 2.08-7.67 2.08-6.26 0-11.56-5.55-12.82-12.35l-6.94 5.39C7.02 39.64 14.64 46 24 46z"
                        />
                      </svg>
                      Continue with Google
                    </button>

                    <p className={styles.switchText}>
                      {isSignup
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                      <button
                        className={styles.switchButton}
                        onClick={() => {
                          setError(null);
                          setMessage(null);
                          setIsSignup(!isSignup);
                        }}
                      >
                        {isSignup ? "Log In" : "Sign Up"}
                      </button>
                    </p>

                    {!isSignup && (
                      <p className={styles.switchText}>
                        <button
                          type="button"
                          className={styles.switchButton}
                          onClick={() => {
                            setError(null);
                            setMessage(null);
                            setIsResetPassword(true);
                          }}
                        >
                          Forgot password?
                        </button>
                      </p>
                    )}
                  </>
                )}

                {isResetPassword && (
                  <p className={styles.switchText}>
                    <button
                      type="button"
                      className={styles.switchButton}
                      onClick={() => {
                        setError(null);
                        setMessage(null);
                        setIsResetPassword(false);
                      }}
                    >
                      Back to {isSignup ? "Sign Up" : "Login"}
                    </button>
                  </p>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
