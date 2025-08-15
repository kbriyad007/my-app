"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
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

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
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
      }, 5000); // Clear message after 5 seconds

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
        // Password reset flow
        await sendResetEmail(email);
        setMessage("Check your email for the password reset link.");
        setShowMessageOnce(true);
      } else if (isSignup) {
        // Signup flow
        await signupWithEmail(email, password);
        setMessage(
          "Signup successful! A verification email has been sent. Please verify your email before logging in."
        );
        setShowMessageOnce(true);
        setIsSignup(false);
      } else {
        // Login flow
        await loginWithEmail(email, password);
        onLoginSuccess?.();
        onClose();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to authenticate");
      }
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Google login failed");
      }
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
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className={styles.closeButton}
                  aria-label="Close modal"
                >
                  <XMarkIcon className={styles.closeIcon} />
                </button>

                {/* Header Section */}
                <div className={styles.header}>
                  <Dialog.Title className={styles.dialogTitle}>
                    {isResetPassword
                      ? "Reset Password"
                      : isSignup
                      ? "Create Account"
                      : "Welcome Back"}
                  </Dialog.Title>
                  <p className={styles.subtitle}>
                    {isResetPassword
                      ? "Enter your email to receive a reset link"
                      : isSignup
                      ? "Sign up to get started with your account"
                      : "Sign in to your account to continue"}
                  </p>
                </div>

                {/* Form Section */}
                <div className={styles.formSection}>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="email" className={styles.label}>
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                      />
                    </div>

                    {!isResetPassword && (
                      <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className={styles.input}
                        />
                      </div>
                    )}

                    {error && (
                      <div className={styles.errorContainer}>
                        <p className={styles.error}>{error}</p>
                      </div>
                    )}
                    
                    {message && (
                      <div className={styles.messageContainer}>
                        <p className={styles.message}>{message}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className={styles.submitButton}
                    >
                      {loading && (
                        <svg className={styles.spinner} viewBox="0 0 24 24">
                          <circle
                            className={styles.spinnerCircle}
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                        </svg>
                      )}
                      {loading
                        ? "Please wait..."
                        : isResetPassword
                        ? "Send Reset Link"
                        : isSignup
                        ? "Create Account"
                        : "Sign In"}
                    </button>
                  </form>

                  {!isResetPassword && (
                    <>
                      <div className={styles.divider}>
                        <span className={styles.dividerText}>or</span>
                      </div>

                      <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className={styles.googleButton}
                      >
                        <svg className={styles.googleIcon} viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Continue with Google
                      </button>
                    </>
                  )}
                </div>

                {/* Footer Section */}
                <div className={styles.footer}>
                  {!isResetPassword && (
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
                        {isSignup ? "Sign In" : "Sign Up"}
                      </button>
                    </p>
                  )}

                  {!isSignup && !isResetPassword && (
                    <p className={styles.forgotPassword}>
                      <button
                        type="button"
                        className={styles.switchButton}
                        onClick={() => {
                          setError(null);
                          setMessage(null);
                          setIsResetPassword(true);
                        }}
                      >
                        Forgot your password?
                      </button>
                    </p>
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
                        ← Back to {isSignup ? "Sign Up" : "Sign In"}
                      </button>
                    </p>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
