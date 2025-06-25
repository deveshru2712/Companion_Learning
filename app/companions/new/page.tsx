import React from "react";
import CompanionForm from "@/components/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { newCompanionPermission } from "@/lib/actions/companion.action";
import Image from "next/image";
import Link from "next/link";

const NewCompanion = async () => {
  const { userId } = await auth();
  const canCreate = await newCompanionPermission();

  if (!userId) redirect("/sign-in");

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {canCreate ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
          <Image
            src={"/images/limit.svg"}
            alt="limit"
            height={230}
            width={360}
          />
          <div className="cta-badge">Upgrade your plan</div>
          <h1>You&apos;ve Reached Your Limit</h1>
          <p>
            You&apos;ve reached your companion limit. Upgrade to create more
            companion and access premium feature.
          </p>
          <Link
            href={"/subscription"}
            className="btn-primary w-full justify-center"
          >
            Upgrade my Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
