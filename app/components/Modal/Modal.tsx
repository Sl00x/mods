"use client";

import { ReactElement } from "react";
import { Button } from "../Button/Button";

interface ModalProps {
  open?: boolean;
  title: string;
  onClose?: () => void;
  onSave?: () => void;
  children: ReactElement | ReactElement[];
}

export const Modal = (props: ModalProps) => {
  if (!props.open) return;
  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="absolute w-screen h-screen top-0 left-0 z-[100] flex items-center justify-center bg-black/50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {props.title}
            </h3>
            <button
              onClick={props.onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">{props.children}</div>

          <div className="flex items-center justify-end space-x-2 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            {props.onSave && (
              <Button title="Save" color="primary" onClick={props.onSave} />
            )}
            <Button title="Cancel" onClick={props.onClose} color="dark" />
          </div>
        </div>
      </div>
    </div>
  );
};
