// @flow
import React from 'react';
import { withTheme } from 'styled-components';
import themeDefault from 'lib/styles/theme';

type Props = {
  fill?: string,
  size?: {
    width: string,
    height: string,
  },
};

export const WM = ({
  size = { width: '16px', height: '16px' },
  fill = themeDefault.style.icon.light,
}: Props) => (
  <svg {...size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 293 370">
    <g fill="none" fillRule="evenodd">
      <g transform="translate(14)">
        <path
          fill={fill}
          d="M132 255.2755L96.6307 264l-26.26846-25.24028-34.99295-10.129-10.12902-34.99296L0 167.3693 8.7245 132 0 96.6307l25.24028-26.26846 10.129-34.99295 34.99296-10.12902L96.6307 0 132 8.7245 167.3693 0l26.26846 25.24028 34.99295 10.129 10.12902 34.99296L264 96.6307 255.2755 132 264 167.3693l-25.24028 26.26846-10.129 34.99295-34.99296 10.12902L167.3693 264"
        />
        <path
          fill="#000"
          d="M44 135.5931l26.40413-25.3647 38.5776 37.05477L193.60024 66 220 91.3647 108.99913 198z"
        />
      </g>
      <g transform="translate(0 228)">
        <rect width="293" height="142" fill={fill} rx="3" />
        <path
          fill="#000"
          d="M172.6729 34.05788V44.3408h.29514c2.74163-3.91372 6.04245-6.95327 9.91412-9.10828C186.74476 33.07752 191.17953 32 196.1683 32c4.7985 0 9.1763.93116 13.14504 2.787 3.96487 1.86363 6.97315 5.14536 9.02614 9.8452 2.25232-3.32965 5.31368-6.2643 9.18017-8.8156C231.38745 33.27177 235.9633 32 241.25237 32c4.00888 0 7.7304.49343 11.1555 1.46603 3.43026.98037 6.36217 2.54483 8.80866 4.69984 2.44908 2.155 4.3571 4.96792 5.7305 8.45168C268.31912 50.09355 269 54.28312 269 59.17723V110h-20.85214V66.96453c0-2.54482-.0971-4.9433-.29514-7.19545-.19028-2.2612-.72877-4.2142-1.6077-5.88355-.8828-1.6603-2.17854-2.98127-3.89626-3.96164-1.71254-.9804-4.03736-1.4751-6.97315-1.4751-2.93578 0-5.3085.56724-7.11812 1.69396-1.8148 1.12542-3.23222 2.59275-4.2613 4.40715-1.02778 1.80794-1.71254 3.8736-2.05686 6.17495-.34432 2.29358-.5139 4.61954-.5139 6.97658V110h-20.85084V67.40227c0-2.25344-.0492-4.48097-.14628-6.67742-.09708-2.212-.51-4.2375-1.24654-6.10112-.73783-1.86362-1.96108-3.35555-3.66974-4.48097-1.71643-1.12672-4.2393-1.69397-7.5647-1.69397-.9799 0-2.27564.22663-3.8911.66437-1.61546.43774-3.1869 1.27177-4.69753 2.49562-1.52227 1.22384-2.81412 2.99032-3.8911 5.29168-1.08215 2.30135-1.61675 5.315-1.61675 9.03447V110H153V34.05788h19.6729zM96.53827 110L82.9987 58.99204h-.29312L69.75875 110H48.131L24 34h22.07393L60.048 85.59897h.297L72.9961 34h20.3087l12.94812 51.4525h.29183L120.5188 34H142l-23.98055 76h-21.4812z"
        />
      </g>
    </g>
  </svg>
);

export default withTheme(WM);
