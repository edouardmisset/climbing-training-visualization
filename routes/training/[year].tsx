import { Handlers, PageProps } from "$fresh/server.ts"

import { TrainingSession, trainingSessionSchema } from "types/training.ts"
import { YearGrid } from "../../components/year-grid.tsx"

const apiBaseUrl = Deno.env.get("env") === "development"
  ? `http://localhost:8000`
  : `https://climbing-back.deno.dev/`

export const handler: Handlers<TrainingSession[]> = {
  async GET(_req, ctx) {
    const { data } = await fetch(
      `${apiBaseUrl}/api/training?year=${ctx.params?.year ?? ""}`,
    )
      .then(
        (res) => res.json(),
      )

    return await ctx.render(data)
  },
}

export default function Visualization(props: PageProps<TrainingSession[]>) {
  const { params: { year }, data } = props

  const numberYear = Number(year)
  const sessions = trainingSessionSchema.array().parse(data)

  const nextYear = numberYear + 1
  const previousYear = numberYear - 1
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          margin: "1rem",
        }}
      >
        An overview of my training in {year}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <a href={`./${previousYear}`}>{previousYear}</a>
        {sessions.length === 0
          ? <span>No record</span>
          : <YearGrid gridContent={sessions} />}
        <a href={`./${nextYear}`}>{nextYear}</a>
      </div>
    </>
  )
}
