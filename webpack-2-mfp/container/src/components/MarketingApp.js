import { mount } from "marketing/MarketingApp";
import * as React from "react";

export default () => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    mount(ref.current);
  });
  return <div ref={ref} />;
};
