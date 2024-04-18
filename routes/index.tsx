export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <a href={`/training/${new Date(Date.now()).getFullYear()}`}>
        Training Viz
      </a>
    </div>
  )
}
