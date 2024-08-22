// declarations.d.ts

// This code tells TypeScript to treat any import with these extensions as having a value of type any.
declare module "*.png" {
  const value: number;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.jpeg" {
  const value: any;
  export default value;
}
