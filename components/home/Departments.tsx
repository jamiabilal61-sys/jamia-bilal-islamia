import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

import { departments } from "@/lib/departments";

export default function Departments() {
  return (
    <Section background="gray">

      <SectionTitle
        title="شعبہ جات"
        subtitle="جامعہ بلال الاسلامیہ لاہور کے فعال تعلیمی شعبہ جات"
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {departments.map((department) => (

          <Card key={department.id}>

            <div className="p-8 text-center">

              <div className="text-6xl">
                {department.icon}
              </div>

              <h3 className="mt-5 text-2xl font-bold text-blue-900">
                {department.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {department.description}
              </p>

              <div className="mt-6">

                <Button variant="secondary">
                  مزید پڑھیں
                </Button>

              </div>

            </div>

          </Card>

        ))}

      </div>

    </Section>
  );
}