import { SVGProps } from 'react';

export function Spinner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <circle cx='12' cy='12' r='0' fill='var(--color-primary-text)'>
        <animate
          id='svgSpinnersPulseMultiple0'
          fill='freeze'
          attributeName='r'
          begin='0;svgSpinnersPulseMultiple2.end'
          calcMode='spline'
          dur='1.2s'
          keySplines='.52,.6,.25,.99'
          values='0;11'
        ></animate>
        <animate
          fill='freeze'
          attributeName='opacity'
          begin='0;svgSpinnersPulseMultiple2.end'
          calcMode='spline'
          dur='1.2s'
          keySplines='.52,.6,.25,.99'
          values='1;0'
        ></animate>
      </circle>
      <circle cx='12' cy='12' r='0' fill='currentColor'>
        <animate
          id='svgSpinnersPulseMultiple1'
          fill='freeze'
          attributeName='r'
          begin='svgSpinnersPulseMultiple0.begin+0.2s'
          calcMode='spline'
          dur='1.2s'
          keySplines='.52,.6,.25,.99'
          values='0;11'
        ></animate>
        <animate
          fill='freeze'
          attributeName='opacity'
          begin='svgSpinnersPulseMultiple0.begin+0.2s'
          calcMode='spline'
          dur='1.2s'
          keySplines='.52,.6,.25,.99'
          values='1;0'
        ></animate>
      </circle>
      <circle cx='12' cy='12' r='0' fill='currentColor'>
        <animate
          id='svgSpinnersPulseMultiple2'
          fill='freeze'
          attributeName='r'
          begin='svgSpinnersPulseMultiple0.begin+0.4s'
          calcMode='spline'
          dur='1.2s'
          keySplines='.52,.6,.25,.99'
          values='0;11'
        ></animate>
        <animate
          fill='freeze'
          attributeName='opacity'
          begin='svgSpinnersPulseMultiple0.begin+0.4s'
          calcMode='spline'
          dur='1.2s'
          keySplines='.52,.6,.25,.99'
          values='1;0'
        ></animate>
      </circle>
    </svg>
  );
}

export function EraserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.5em'
      height='1.5em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='var(--gray-5)'
        fillRule='evenodd'
        d='M3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464m5.524 6.825l4.723 4.723l2.619-2.618c1.113-1.114 1.67-1.67 1.67-2.362c0-.692-.557-1.249-1.67-2.362S14.66 6 13.968 6c-.692 0-1.248.557-2.362 1.67zm3.406 6.041l.257-.257l-4.724-4.724l-.257.257C6.557 12.72 6 13.276 6 13.968c0 .692.557 1.249 1.67 2.362S9.34 18 10.032 18c.692 0 1.248-.557 2.362-1.67'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

export function NoItemsFoundIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.5em'
      height='1.5em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='var(--gray-5)'
        fillRule='evenodd'
        d='M3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464M7.55 9.6a.75.75 0 0 1 .9-1.2l2 1.5a.75.75 0 0 1 0 1.2l-2 1.5a.75.75 0 1 1-.9-1.2l1.2-.9zm9.05-1.05a.75.75 0 0 1-.15 1.05l-1.2.9l1.2.9a.75.75 0 1 1-.9 1.2l-2-1.5a.75.75 0 0 1 0-1.2l2-1.5a.75.75 0 0 1 1.05.15m-1.07 7.98a.75.75 0 0 1-1.06 0l-.47-.47c-.561.53-1.44.53-2 0c-.56.53-1.439.53-2 0l-.47.47a.75.75 0 1 1-1.06-1.06l.5-.5a1.457 1.457 0 0 1 2.03-.03c.56-.53 1.44-.53 2 0a1.457 1.457 0 0 1 2.03.03l.5.5a.75.75 0 0 1 0 1.06'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

export function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.25em'
      height='1.25em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='var(--gray-5)'
        fillRule='evenodd'
        d='M14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14v-4c0-3.771 0-5.657 1.172-6.828C4.343 2 6.239 2 10.03 2c.606 0 1.091 0 1.5.017c-.013.08-.02.161-.02.244l-.01 2.834c0 1.097 0 2.067.105 2.848c.114.847.375 1.694 1.067 2.386c.69.69 1.538.952 2.385 1.066c.781.105 1.751.105 2.848.105h4.052c.043.534.043 1.19.043 2.063V14c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22m-8.75-7.5a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75m0 3.5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75'
        clipRule='evenodd'
      ></path>
      <path
        fill='var(--gray-5)'
        d='m19.352 7.617l-3.96-3.563c-1.127-1.015-1.69-1.523-2.383-1.788L13 5c0 2.357 0 3.536.732 4.268C14.464 10 15.643 10 18 10h3.58c-.362-.704-1.012-1.288-2.228-2.383'
      ></path>
    </svg>
  );
}

export function CloseModalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.5em'
      height='1.5em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='var(--color-add-red-5)'
        fillRule='evenodd'
        d='M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 1 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}
