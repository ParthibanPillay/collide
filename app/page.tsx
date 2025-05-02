import { SignIn, SignInButton } from "@clerk/nextjs";
import SignInPage from "./sign-in/[[...sign-in]]/page";

export default function Home() {
  return (
    <SignInPage/>
  );
}