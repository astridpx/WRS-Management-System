import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/Sidebar";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="h-screen  min-h-screen w-full overflow-hidden flex">
        <Sidebar />
        <section className="h-full w-full   overflow-y-auto " id="container">
          <Navbar />
          <div className="h-max p-4 dark:bg-dark_bg">{children}</div>
        </section>
      </main>
    </>
  );
}
