"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Members page is private - redirect to top
export default function MembersPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse font-serif text-sumi/50">
        リダイレクト中...
      </div>
    </div>
  );
}
