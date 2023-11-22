interface IDetailItemProps {
  title: string;
  text: string;
}

export default function DetailItem({ title, text }: IDetailItemProps) {
  return (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <div>
        <p className="text-dark-50 font-weight-bold">{title}</p>
      </div>

      <div>
        <p>{text}</p>
      </div>
    </div>
  );
}
