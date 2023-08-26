export const capitalize = (text: string) => {
    return text
      .split(" ")
      .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
      .join(" ")
      .toString();
  };
