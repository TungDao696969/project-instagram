import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram } from "lucide-react";
import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";
import { useResendVerificationEmail } from "@/hooks/auth/useResendVerificationEmail";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const { token: urlToken } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryToken = searchParams.get("token");
  const token = urlToken || queryToken;
  const [email, setEmail] = useState("");
  const [showResendForm, setShowResendForm] = useState(false);

  const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmail();
  const { mutate: resendEmail, isPending: isResending } =
    useResendVerificationEmail();

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setShowResendForm(true);
    }
  }, [token, verifyEmail]);

  const handleResendEmail = () => {
    if (!email) {
      toast.error("Vui lòng nhập email");
      return;
    }
    resendEmail(email);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/instagram-background-gradient-colors_23-2147821882.jpg?w=2000')",
      }}
    >
      <div className="w-full max-w-sm space-y-4 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg">
        <div className="mb-5 px-2 flex items-center gap-3 text-2xl font-bold justify-center">
          <Instagram className="w-6 h-6" />
          <span>Instagram</span>
        </div>

        {token && !showResendForm ? (
          <div className="text-center space-y-4">
            <h2 className="text-lg font-semibold">Đang xác thực email...</h2>
            <p className="text-sm text-muted-foreground">
              {isVerifying ? "Vui lòng chờ..." : "Xác thực email thành công!"}
            </p>
          </div>
        ) : showResendForm ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-center">
              Gửi lại email xác thực
            </h2>
            <p className="text-sm text-center text-muted-foreground">
              Nhập email của bạn để nhận lại liên kết xác thực
            </p>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={handleResendEmail}
              disabled={isResending}
              className="w-full"
            >
              {isResending ? "Đang gửi..." : "Gửi lại email xác thực"}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full"
            >
              Quay lại đăng nhập
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
