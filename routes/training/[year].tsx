import { Handlers, PageProps } from "$fresh/server.ts"

import { TrainingSession, trainingSessionSchema } from "types/training.ts"
import { YearGrid } from "../../components/year-grid.tsx"

export const handler: Handlers<TrainingSession[]> = {
  async GET(_req, ctx) {
    const { data } = await fetch(
      `https://climbing-back.deno.dev/api/training?year=${
        ctx.params?.year ?? ""
      }`,
    )
      .then(
        (res) => res.json(),
      )

    return await ctx.render(data)
  },
}

export default function Visualization(props: PageProps<TrainingSession[]>) {
  const { params: { year }, data } = props

  const sessions = trainingSessionSchema.array().parse(data)

  const numberYear = Number(year)
  const yearSession = sessions.filter((session) =>
    session.date.year === numberYear
  )

  const nextYear = numberYear + 1
  const previousYear = numberYear - 1
  return (
    <>
      <div>An overview of my training in {year}</div>
      {yearSession.length === 0
        ? <span>No record</span>
        : <YearGrid gridContent={yearSession} />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <a href={`./${previousYear}`}>{previousYear}</a>
        <a href={`./${nextYear}`}>{nextYear}</a>
      </div>
    </>
  )
}
