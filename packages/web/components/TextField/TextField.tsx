import React, { useId } from 'react';
import clsx from 'clsx';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: {
    type?: string;
    message?: string;
  };
  labelClassName?: string;
  inputClassName?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, labelClassName, inputClassName, className, error, ...props }, ref) => {
    const id = useId();

    return (
      <div className={clsx('flex flex-col items-start', className)}>
        <label
          htmlFor={id}
          className={clsx('block text-sm text-black', labelClassName)}
        >
          {label}
        </label>
        <input
          id={id}
          className={clsx(
            'border border-black',
            {
              'border-red-500': error?.type,
              'focus:border-primary': !error?.type,
            },
            'mt-1 w-full py-2 px-2 text-sm font-medium text-black',
            'outline-none',
            'placeholder:text-sm placeholder:font-light',
            'rounded',
            inputClassName
          )}
          {...props}
          ref={ref}
        />
        {error?.type && <span className="mt-2 text-sm font-medium text-red-500">{error.message}</span>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
