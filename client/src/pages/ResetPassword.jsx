import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/reset-password/${token}`, formData, { withCredentials: true });
      toast.success(response?.data?.message || "Password reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to reset password");
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
            <h1 className="text-3xl font-bold mb-2" style={{ color: "hsl(var(--ds-foreground)/1)" }}>Create New Password</h1>
            <p style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}>Choose a new password for your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}>New Password</label>
              <div className="relative">
                <Lock className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5" style={{ color: "hsl(var(--ds-muted-foreground)/1)" }} />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="input-glass-ds w-full pl-12 pr-4 py-3.5" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "hsl(var(--ds-muted-foreground)/1)" }}>Confirm Password</label>
              <div className="relative">
                <Lock className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5" style={{ color: "hsl(var(--ds-muted-foreground)/1)" }} />
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="input-glass-ds w-full pl-12 pr-4 py-3.5" required />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-glow-ds w-full py-4 flex items-center justify-center gap-2">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Reset Password <ArrowRight className="w-5 h-5" /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
