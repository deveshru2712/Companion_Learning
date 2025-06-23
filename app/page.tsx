import CompanionsCard from "@/components/CompanionsCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import React from "react";

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="home-section">
        <CompanionsCard
          id={"123"}
          name="Neura the Brainny Explorer"
          topic="Neural network of brain"
          subject="science"
          duration={45}
          color={"#ffda6e"}
        />
        <CompanionsCard
          id="12wqer3"
          name="Countsy the NUmber Wizard"
          topic="Derivatives & Integrals"
          subject="Maths"
          duration={45}
          color={"#e5d0ff"}
        />
        <CompanionsCard
          id="12eqwr3"
          name="Verba the vocal builder"
          topic="Improve your vocab skills"
          duration={30}
          subject="English"
          color={"#BDE7FF"}
        />
      </section>
      <section className="home-section">
        <CompanionsList />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
