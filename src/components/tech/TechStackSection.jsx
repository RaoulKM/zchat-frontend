import React from "react";
import TechItem from "./TechItem";

const TechStackSection = () => {
  return (
    <section id="tech" className="px-6 md:px-12 py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Technologies</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        <TechItem name="NestJS" url="https://nestjs.com" />
        <TechItem name="Prisma" url="https://www.prisma.io" />
        <TechItem name="PostgreSQL" url="https://www.postgresql.org" />
        <TechItem name="React" url="https://react.dev" />
      </div>
    </section>
  );
};

export default TechStackSection;
