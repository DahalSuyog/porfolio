import { redirect } from "next/navigation";
import { getProject } from "../projects/data";

/** Old /demos?project=<id> links now point at the case-study pages. */
export default async function DemosRedirect({ searchParams }: PageProps<"/demos">) {
  const { project } = await searchParams;
  const match = typeof project === "string" ? getProject(project) : undefined;
  redirect(match ? `/projects/${match.id}` : "/#projects");
}
