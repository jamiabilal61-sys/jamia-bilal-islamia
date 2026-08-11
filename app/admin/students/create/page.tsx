import StudentForm from "@/components/admin/students/StudentForm";

export default function CreateStudentPage() {
  return (
    <main className="p-8">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-blue-900">
          نیا طالب علم
        </h1>

        <p className="text-gray-500 mt-2">
          جامعہ بلال الاسلامیہ لاہور
        </p>

      </div>

      <StudentForm />

    </main>
  );
}