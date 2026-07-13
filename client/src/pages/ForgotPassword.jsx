import { useState } from "react";
import { Mail, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/auth/forgot-password", { email }, { withCredentials: true });
      setSubmitted(true);
      toast.success(response?.data?.message || "Reset link sent");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative">
      <div className="orb-ds w-96 h-96 -top-20 -left-20 animate-float-ds bg-[hsl(var(--ds-primary)/1)]" />
      <div className="orb-ds w-80 h-80 bottom-10 right-10 animate-float-delayed-ds bg-[hsl(var(--ds-accent)/0.5)]" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(var(--ds-background)/1) 0%, hsl(var(--ds-background)/0.95) 50%, hsl(var(--ds-background)/0.9) 100%)" }} aria-hidden />
      <div className="relative z-10 w-full max-w-md mx-4 animate-fade-in-ds">
        <div className="glass-card-ds p-8 md:p-10 shadow-ds-glow-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[hsl(var(--ds-primary)/0.1)] border border-[hsl(var(--ds-primary)/0.2)] mb-4">
              <Sparkles className="w-8 h-8" style={{ color: "hsl(var(--ds-primary)/1)" }} />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: "hsl(var(--ds-foreground)/1)" }}>Forgot Password</h1>
            <p style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}>Enter your email and we’ll send you a reset link.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5" style={{ color: "hsl(var(--ds-muted-foreground)/1)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-glass-ds w-full pl-12 pr-4 py-3.5"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-glow-ds w-full py-4 flex items-center justify-center gap-2">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Reset Link <ArrowRight className="w-5 h-5" /></>}
            </button>
          </form>

          {submitted && (
            <div className="mt-6 rounded-2xl border border-[hsl(var(--ds-primary)/0.2)] bg-[hsl(var(--ds-primary)/0.08)] p-4 text-sm" style={{ color: "hsl(var(--ds-foreground)/1)" }}>
              If your email exists in our system, a reset link has been sent. Please check your inbox.
            </div>
          )}

          <div className="mt-6 text-center text-sm" style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}>
            <Link to="/login" className="font-semibold" style={{ color: "hsl(var(--ds-primary)/1)" }}>Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
