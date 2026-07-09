import { ReactNode } from "react";
import Container from "./Container";

type SectionProps = {
  children: ReactNode;
  background?: "white" | "gray";
};

export default function Section({
  children,
  background = "white",
}: SectionProps) {
  return (
    <section
      className={
        background === "gray"
          ? "bg-slate-50 py-20"
          : "bg-white py-20"
      }
    >
      <Container>
        {children}
      </Container>
    </section>
  );
}