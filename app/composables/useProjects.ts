import type { Project } from "~/types";

export async function useProjects() {
  const { data } = await useAsyncData("projects-all", () => queryCollection("projects").all());
  return computed(() => {
    const items = (data.value ?? []) as unknown as Project[];
    return [...items].sort((a, b) => a.order - b.order);
  });
}
