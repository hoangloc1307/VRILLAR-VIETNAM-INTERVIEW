import classNames from "classnames";

const Table = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <div className="mt-5">
      <p className="empty:hidden mb-2 uppercase text-xl font-bold">{title}</p>
      <table className="w-full text-left">{children}</table>
    </div>
  );
};

const THead = ({ children }: { children: React.ReactNode }) => {
  return (
    <thead className="bg-blue-300 uppercase pointer-events-none">
      {children}
    </thead>
  );
};

const TBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

const TRow = ({
  children,
  actived,
  onClick,
}: {
  children: React.ReactNode;
  actived?: boolean;
  onClick?: () => void;
}) => {
  return (
    <tr
      className={classNames("hover:bg-blue-200", {
        "even:bg-slate-100": !actived,
        "bg-blue-100": actived,
      })}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};
const THeading = ({ children }: { children: React.ReactNode }) => {
  return <th className="px-2 py-1">{children}</th>;
};
const TData = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [x: string]: any;
}) => {
  return (
    <td
      className={classNames("p-2", {
        "cursor-pointer hover:underline": rest.onClick,
      })}
      {...rest}
    >
      {children}
    </td>
  );
};

export { Table, THead, TBody, TRow, THeading, TData };
