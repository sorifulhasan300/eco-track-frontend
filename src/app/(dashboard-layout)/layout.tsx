import DashboardGuard from "@/components/DashboardGuard";

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardGuard>{children}</DashboardGuard>;
}
