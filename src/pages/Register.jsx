import AuthLayout from "./AuthLayout";
import RegisterForm from "../components/membership/RegisterForm";

export default function Register() {
  return (
    <AuthLayout
      title="Become a Member"
      subtitle="Create a free membership account to track your seva, receive birthday blessings, and manage everything in one dashboard."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
