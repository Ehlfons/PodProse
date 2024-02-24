import { Fragment } from "react";

const XLogo = () => {
  return (
    <Fragment>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_116_289)">
          <path
            d="M1.49145 0L9.5993 11.5827L1.44025 21H3.27652L10.4198 12.7551L16.1913 21H22.4402L13.8762 8.76575L21.4706 0H19.6343L13.0557 7.59344L7.74036 0H1.49145ZM4.19183 1.44515H7.06259L19.7394 19.5546H16.8687L4.19183 1.44515Z"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_116_289"
            x="0.288248"
            y="0"
            width="23.304"
            height="23.304"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.152" />
            <feGaussianBlur stdDeviation="0.575999" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_116_289"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_116_289"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </Fragment>
  );
};

export default XLogo;
