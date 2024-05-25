import { Fragment } from "react";

const DeleteOrClose = () => {
  return (
    <Fragment>
      <svg
        width="43"
        height="43"
        viewBox="0 0 43 43"
        fill="none"
      >
        <path
          d="M41.5 1.5L1.5 41.5"
          stroke="#F3F4F9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.5 1.5L41.5 41.5"
          stroke="#F3F4F9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Fragment>
  );
};

export default DeleteOrClose;
