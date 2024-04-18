import { Handlers, PageProps } from "$fresh/server.ts";

import { TrainingSession, trainingSessionSchema } from "types/training.ts";
import { YearGrid } from "../../components/year-grid.tsx";

export const handler: Handlers<TrainingSession[]> = {
  async GET(_req, ctx) {
    const training = await fetch(`http://localhost:8000/api/training-data`)
      .then(
        (res) => res.json(),
      );

    return await ctx.render(training.default);
  },
};

export default function Visualization(props: PageProps<TrainingSession[]>) {
  const { params: { year }, data } = props;

  const sessions = trainingSessionSchema.array().parse(data);

  const yearSession = sessions.filter((session) =>
    session.date.year === Number(year)
  );

  return (
    <>
      <div>An overview of my training in {year}</div>
      <YearGrid gridContent={yearSession} />
    </>
  );
}
