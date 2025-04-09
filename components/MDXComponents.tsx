import { ClassAttributes, HTMLAttributes, JSX } from "react";

export const components = {
  h1: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLHeadingElement> &
      HTMLAttributes<HTMLHeadingElement>
  ) => <h1 className="text-5xl font-bold" {...props} />,
  h2: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLHeadingElement> &
      HTMLAttributes<HTMLHeadingElement>
  ) => <h2 className="text-2xl font-semibold mb-4" {...props} />,
  h3: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLHeadingElement> &
      HTMLAttributes<HTMLHeadingElement>
  ) => <h3 className="text-xl font-semibold mb-3" {...props} />,
  p: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLParagraphElement> &
      HTMLAttributes<HTMLParagraphElement>
  ) => <p className="text-gray-600 dark:text-gray-300 mb-4" {...props} />,
  ul: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLUListElement> &
      HTMLAttributes<HTMLUListElement>
  ) => (
    <ul
      className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300"
      {...props}
    />
  ),
  li: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLLIElement> &
      HTMLAttributes<HTMLLIElement>
  ) => <li className="mb-2" {...props} />,
};
