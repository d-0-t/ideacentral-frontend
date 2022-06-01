import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { getKeyword } from "../redux/actions/actionKeyword";

const ScrollToTopAndResetKeyword = (props: any) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getKeyword(""));
  }, [location, dispatch]);

  return <>{props.children}</>;
};

export default ScrollToTopAndResetKeyword;
