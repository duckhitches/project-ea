import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your NoQwit.ai account and start practicing with AI-powered mock interviews. Free for students and job seekers—The Boring Interview.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Sign Up | NoQwit.ai",
    description: "Create your account and start AI interview practice.",
    url: "/auth/signup",
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
