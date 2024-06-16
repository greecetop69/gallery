const mockUrls = [
  "https://utfs.io/f/7bf6126a-b138-44f4-8822-2c1d29e4fcfd-rc8nbu.jpg",
  "https://utfs.io/f/16141d02-1535-46cb-b290-2f65706dfde9-x51uau.jpg",
  "https://utfs.io/f/b4f4609a-00b3-484a-92d9-34789d147b25-sg3q6.jpg",
  "https://utfs.io/f/1860c7fa-910e-4188-a722-2af9c905fb3b-sg3qx.jpg",
]

const mockImages = mockUrls.map((url, i) => ({
  id: i + 1,
  url
}))

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">{
        mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt={`image ${image.id}`} />
          </div>
        ))
      }</div>
    </main>
  );
}
