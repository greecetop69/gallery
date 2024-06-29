export default function PhotoModal({
    params: { id: photoId },
  }: {
    params: { id: string };
  }) {
    return <div className="card">{photoId}</div>;
  }