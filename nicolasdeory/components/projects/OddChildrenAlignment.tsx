import React from "react";

export default function OddChildrenAlignment({
  children,
}: {
  children: JSX.Element[];
}) {
  const newChildren = children.map((c, i) => {
    return React.cloneElement(c, { key: i, isOdd: i % 2 !== 0 });
  });
  return <>{newChildren}</>;
}
