export default function ({ label, name, defaultValue, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xl  leading-loose font-bold" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full p-2 rounded border border-slate-300 transition-all duration-300 focus:border-sky-300 focus:outline-none"
        name={name}
        defaultValue={defaultValue}
        {...props}
      ></input>
    </div>
  );
}
