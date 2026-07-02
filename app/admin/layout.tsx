import AdminShell from "./_components/AdminShell";

export const metadata = { title: "ETTA Admin" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
