import CompanionsCard from "@/components/CompanionsCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanion } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import React from "react";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filter = await searchParams;

  const subject = filter.subject ? filter.subject : "";
  const topic = filter.topic ? filter.topic : "";

  const companions = await getAllCompanion({ subject, topic });

  return (
    <main>
      <section className="flex justify-center gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions.map((companion) => (
          <CompanionsCard
            key={companion.id}
            color={getSubjectColor(companion.subject)}
            {...companion}
          ></CompanionsCard>
        ))}
      </section>
    </main>
  );
};

export default CompanionsLibrary;
