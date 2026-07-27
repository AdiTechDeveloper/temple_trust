import AuthLayout from "./AuthLayout";
import LoginForm from "../components/membership/LoginForm";

export default function Login() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to view your donation history, booked pujas, membership card and receipts."
    >
      <LoginForm />
    </AuthLayout>
  );
}
