import Sidebar from "@/components/admin/Sidebar";
import AdminAuthWrapper from "@/components/admin/AdminAuthWrapper";

export const metadata = {
  title: "Admin Panel | BloomCraft",
  description: "BloomCraft store administration panel.",
};

export default function AdminLayout({ children }) {
  return (
    <AdminAuthWrapper>
      <div style={styles.wrapper}>
        <Sidebar />
        <div style={styles.main}>
          {children}
        </div>
      </div>
    </AdminAuthWrapper>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#FFF9F6",
  },
  main: {
    marginLeft: "240px",
    flex: 1,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
};
