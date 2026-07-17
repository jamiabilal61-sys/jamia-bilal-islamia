import AdmissionsTable from "@/components/admin/AdmissionsTable";

export default function AdminAdmissionsPage() {
  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        داخلہ درخواستیں
      </h1>

      <AdmissionsTable />

    </main>
  );
}