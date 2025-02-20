declare module "eye-on-it" {
  export function initEyeOnIt(): void;

  const eyeOnIt: {
    initEyeOnIt: typeof initEyeOnIt;
  };
  export default eyeOnIt;
}

declare module "*.css" {
  const content: string;
  export default content;
}
