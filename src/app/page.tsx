import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect to Spanish (default locale)
  redirect("/es");
}
