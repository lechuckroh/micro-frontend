import { mount } from "marketing/MarketingApp";
import * as React from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = React.useRef(null);
  const history = useHistory();

  React.useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: (location) => {
        const currentPathname = history.location.pathname;
        const nextPathname = location.pathname;
        if (currentPathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);
  return <div ref={ref} />;
};
