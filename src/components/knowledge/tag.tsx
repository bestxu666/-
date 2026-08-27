import type { ReactNode } from "react";

type TagTone = "teal" | "blue" | "green" | "amber" | "red" | "purple" | "gray";

const TONE_CLASS: Record<TagTone, string> = {
  teal: "tag-teal",
  blue: "tag-blue",
  green: "tag-green",
  amber: "tag-amber",
  red: "tag-red",
  purple: "tag-purple",
  gray: "tag-gray",
};

interface TagProps {
  tone?: TagTone;
  children: ReactNode;
}

export function Tag({ tone = "teal", children }: TagProps) {
  return <span className={`tag ${TONE_CLASS[tone]}`}>{children}</span>;
}
