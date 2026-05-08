import LoginForm from "@/components/module/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080f1e] px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080f1e]/60 via-transparent to-[#080f1e]/90" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.6) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10 w-full flex justify-center">
        <LoginForm />
      </div>
    </div>
  )
}
