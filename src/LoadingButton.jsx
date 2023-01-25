import React from "react";
import { ErrorMessage, LoadingMessage } from "x25-react16/Messages";
import { useInView } from "react-intersection-observer";

type LoadingButtonPropTypes = {
  isFetching: boolean;
  hasProblems: boolean;
  onLoadMoreClick: () => void;
};
const LoadingButton = (props : LoadingButtonPropTypes) => {
  const
    { isFetching, hasProblems, onLoadMoreClick } = props,
    [
      ref,
      inView,
    ] = useInView({
    // /* Optional options */
    // triggerOnce: true,
    // rootMargin: '0px 0px',
    });

  React.useEffect(() => {
    if (!isFetching && !hasProblems && inView) {
      onLoadMoreClick();
    }
  }, [
    isFetching,
    hasProblems,
    inView,
  ]);

  return (
    <div className="text-center my-2">
      {hasProblems ? <ErrorMessage message={"A apărut o problemă! "} /> : null}
      {isFetching ? <LoadingMessage message={"Se încarcă ..."} sm /> : (
        <button
          className="btn btn-primary-info d-print-none"
          disabled={isFetching}
          onClick={onLoadMoreClick}
          ref={ref}
          type="button">
          {isFetching ? "Se încarcă" : "Încarcă mai multe"}
        </button>
      )}
    </div>
  );
};

export default LoadingButton;
