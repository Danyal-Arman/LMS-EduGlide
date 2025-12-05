import { useState, useEffect } from "react";
import { User, Mail, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [signupInput, setSignupInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (!isLogin) {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await loginUser(loginInput);
    } else {
      await registerUser(signupInput);
    }
  };

  useEffect(() => {
    if (registerIsSuccess) {
      toast.success(registerData?.message || "Successfully registered");
      navigate("/");
    }
    if (registerError) {
      const message = registerError?.data?.message;
      toast.error(
        message || "Sign up failed! Something is wrong with the server"
      );
    }
    if (loginIsSuccess) {
      toast.success(loginData?.message || "Successfully logged in");
      navigate("/");
    }
    if (loginError) {
      const message = loginError?.data?.message;
      toast.error(message || "Something is wrong with the server");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginIsSuccess,
    registerIsSuccess,
    loginError,
    registerError,
    loginData,
    registerData,
    navigate,
  ]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative">
      {/* Orbs (DS) */}
      <div className="orb-ds w-96 h-96 -top-20 -left-20 animate-float-ds bg-[hsl(var(--ds-primary)/1)]" />
      <div className="orb-ds w-80 h-80 bottom-10 right-10 animate-float-delayed-ds bg-[hsl(var(--ds-accent)/0.5)]" />
      <div className="orb-ds w-64 h-64 top-1/2 left-1/3 animate-pulse-glow-ds bg-[hsl(var(--ds-primary)/0.3)]" />

      {/* DS Gradient overlay (inline style to ensure immediate effect) */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg,
            hsl(var(--ds-background) / 1) 0%,
            hsl(var(--ds-background) / 0.95) 50%,
            hsl(var(--ds-background) / 0.9) 100%)`,
        }}
        aria-hidden
      />

      {/* DS Grid pattern (inline style) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--ds-primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--ds-primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-fade-in-ds">
        {/* Use plain DS class that exists in index.css */}
        <div className="glass-card-ds p-8 md:p-10 shadow-ds-glow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[hsl(var(--ds-primary)/0.1)] border border-[hsl(var(--ds-primary)/0.2)] mb-4">
              <Sparkles
                className="w-8 h-8"
                style={{ color: "hsl(var(--ds-primary)/1)" }}
              />
            </div>
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "hsl(var(--ds-foreground)/1)" }}
            >
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}>
              {isLogin
                ? "Enter your credentials to access your account"
                : "Start your journey with us today"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Username Field (Signup only) */}
            {!isLogin && (
              <div
                className="animate-slide-up-ds"
                style={{ animationDelay: "0.1s" }}
              >
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}
                >
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5"
                    style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}
                  />
                  <input
                    type="text"
                    placeholder="John Doe"
                    name="username"
                    value={signupInput.username}
                    onChange={handleInput}
                    className="input-glass-ds w-full pl-12 pr-4 py-3.5"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div
              className="animate-slide-up-ds"
              style={{ animationDelay: isLogin ? "0.1s" : "0.2s" }}
            >
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5"
                  style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}
                />
                <input
                  type="email"
                  name="email"
                  value={isLogin ? loginInput.email : signupInput.email}
                  onChange={handleInput}
                  placeholder="you@example.com"
                  className="input-glass-ds w-full pl-12 pr-4 py-3.5"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div
              className="animate-slide-up-ds"
              style={{ animationDelay: isLogin ? "0.2s" : "0.3s" }}
            >
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5"
                  style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}
                />
                <input
                  type="password"
                  name="password"
                  value={isLogin ? loginInput.password : signupInput.password}
                  onChange={handleInput}
                  placeholder="••••••••"
                  className="input-glass-ds w-full pl-12 pr-4 py-3.5"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div
              className="animate-slide-up-ds pt-2"
              style={{ animationDelay: isLogin ? "0.3s" : "0.4s" }}
            >
              <button
                type="submit"
                disabled={loginIsLoading || registerIsLoading}
                className="btn-glow-ds w-full py-4 flex items-center justify-center gap-2"
              >
                {loginIsLoading || registerIsLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div
                className="w-full border-t"
                style={{ borderColor: "hsl(var(--ds-border)/1)" }}
              />
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-4"
                style={{
                  background: "hsl(var(--ds-card)/1)",
                  color: "hsl(var(--ds-muted-foreground)/1)",
                }}
              >
                or
              </span>
            </div>
          </div>

          {/* Toggle Login/Signup */}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full flex items-center justify-center gap-2 py-3 transition-colors duration-300 group"
            style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}
          >
            <span>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <span
              className="font-semibold flex items-center gap-1"
              style={{ color: "hsl(var(--ds-primary)/1)" }}
            >
              {isLogin ? "Sign Up" : "Sign In"}
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>

        {/* Footer Text */}
        <p
          className="text-center text-sm mt-6"
          style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}
        >
          By continuing, you agree to our{" "}
          <a
            href="#"
            style={{ color: "hsl(var(--ds-primary)/1)" }}
            className="hover:underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            style={{ color: "hsl(var(--ds-primary)/1)" }}
            className="hover:underline"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
