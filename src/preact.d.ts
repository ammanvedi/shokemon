import JSX = preact.JSX

declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.scss" {
    const content: any;
    export default content;
}

declare module "*.gif" {
    const content: any;
    export default content;
}