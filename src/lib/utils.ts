import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// generate inticials from name
export function getInitialFromName(fullName: string) {
  if (!fullName) {
    return "N/A";
  }
  // Check if the fullName is not empty and is a string
  if (typeof fullName === "string" && fullName.trim().length > 0) {
    // Split the fullName into an array of words
    const words = fullName.trim().split(" ");

    // Use map to extract the first letter of each word and convert it to uppercase
    const initials = words
      .filter((word): word is string => typeof word === "string")
      .map((word) => {
        if (typeof word === "string" && word.length > 0) {
          return word[0]!.toUpperCase();
        }
      });
    // Get the first two initials
    const firstTwoInitials = initials.slice(0, 2);

    if (firstTwoInitials.length > 0) {
      return firstTwoInitials.join("");
    }
  }
  return "N/A";
}
