import { notFound } from "next/navigation";

/**
 * Unknown paths inside a valid locale render the styled 404 with a real 404 status.
 * dynamicParams=true here (overriding the layout's false) so arbitrary bad URLs
 * reach notFound() instead of the framework's unstyled default.
 */
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export default function CatchAll() {
  notFound();
}
