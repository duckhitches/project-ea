import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to NoQwit.ai and The Boring Interview. Access your AI interview practice dashboard and continue improving your interview skills.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Login | NoQwit.ai",
    description: "Sign in to your account.",
    url: "/auth/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
