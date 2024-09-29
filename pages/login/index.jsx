import PageTemplate from "@/components/templates/template/template";
import LoginForm from "@/components/molecules/LoginFrom/loginForm";

const LoginPage = () => {
  return (
    <div>
      <PageTemplate>
        <h1 style={{ textAlign: "center", marginTop: "10rem" }}>
          Login to Forum App
        </h1>
        <LoginForm />
      </PageTemplate>
    </div>
  );
};

export default LoginPage;
