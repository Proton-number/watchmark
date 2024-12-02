import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <SignIn routing="hash" />
    </div>
  );
}

export default SignInPage;
