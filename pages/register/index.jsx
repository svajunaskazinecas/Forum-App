import RegisterForm from "@/components/molecules/RegisterForm/Registerform";
import PageTemplate from "@/components/templates/template/template";

const RegisterPage = () => {
  return (
    <>
      <PageTemplate>
        <h1 style={{ textAlign: "center", marginTop: "10rem" }}>
          Register to Forum App
        </h1>
        <RegisterForm />
      </PageTemplate>
    </>
  );
};
export default RegisterPage;
