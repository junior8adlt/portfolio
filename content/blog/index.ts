import type { ComponentType } from "react";
import PhantomBuildFailure, { meta as phantomMeta } from "./phantom-build-failure";

export interface PostMeta {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO yyyy-mm-dd
  readingMin: number;
  tags: string[];
}

export interface Post {
  meta: PostMeta;
  Component: ComponentType;
}

/** newest first */
export const posts: Post[] = [{ meta: phantomMeta, Component: PhantomBuildFailure }];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.meta.slug === slug);
}
