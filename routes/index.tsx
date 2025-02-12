export default function Home() {
  return (
    <h1
      style={{
        fontSize: "8rem",
        display: "grid",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <a href={`/training/${new Date().getFullYear()}`}>
        Training Viz
      </a>
    </h1>
  )
}
