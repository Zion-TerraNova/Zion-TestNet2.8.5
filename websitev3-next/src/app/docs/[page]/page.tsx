import { redirect } from "next/navigation";

export const dynamic = "force-static";

type Props = { params: { page: string } };

export default async function DocPage({ params }: Props) {
  const { page } = await params;
  // Redirect any stray legacy routes to the native MDX docs or index.
  redirect(`/docs/${page === "index" ? "getting-started" : page}`);
}
