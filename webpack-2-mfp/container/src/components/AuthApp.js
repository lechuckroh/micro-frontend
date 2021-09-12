import { mount } from "auth/AuthApp";
import * as React from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const ref = React.useRef(null);
  const history = useHistory();

  React.useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: (location) => {
        const currentPathname = history.location.pathname;
        const nextPathname = location.pathname;
        if (currentPathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn,
    });

    history.listen(onParentNavigate);
  }, []);
  return <div ref={ref} />;
};
