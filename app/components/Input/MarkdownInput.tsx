import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import clsx from "clsx";

interface props extends MDEditorProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  required?: boolean;
}

export const MarkDownInput = (props: props) => {
  return (
    <div className="w-full">
      <label
        htmlFor="email"
        className="block text-xs font-bold uppercase leading-6 text-gray-600"
      >
        <span className={clsx(props.error ? "text-red-500" : "text-dark")}>
          {props.label}
        </span>
        {props.required && <b className="text-primary">*</b>}
      </label>
      <div className="mt-1">
        <MDEditor
          value={props.value}
          onChange={props.onChange}
          className={clsx(props.error && "border border-red-500")}
        />
        <input
          style={{ display: "none" }}
          value={props.value}
          name={props.name}
        />
        {props.error && (
          <span className="text-[10px] font-semibold text-red-500 uppercase">
            {props.error}
          </span>
        )}
      </div>
    </div>
  );
};
