import { useQuery } from "@tanstack/react-query";
import { fetchSiteSettings } from "@/lib/sanity";

export function useSiteSettings() {
  return useQuery({
    queryKey: ["sanity-site-settings"],
    queryFn: fetchSiteSettings,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}
