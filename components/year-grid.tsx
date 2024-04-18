import { JSX } from "preact"
import { TrainingSession } from "types/training.ts"
import {
  convertSessionTypeToAccentColor,
  convertSessionTypeToBackgroundColor,
  createTrainingTooltip,
  getColorVariant,
  roundToTen,
} from "../helpers/training.ts"
import Color from "colorjs.io"
import { Temporal } from "@js-temporal/polyfill"

export function YearGrid(
  props: JSX.HTMLAttributes<HTMLDivElement> & {
    gridContent: TrainingSession[]
  },
) {
  const { gridContent, ...rest } = props
  return (
    <div className="year-grid" {...rest}>
      {Array.from(
        { length: 8 },
        (_, i) => {
          const d = new Date()
          d.setFullYear(2024)
          d.setMonth(0)
          d.setDate(i)
          return i === 0
            ? (
              <div
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
              />
            )
            : (
              <div
                key={i}
                className="super-center grid-header"
                style={{
                  minInlineSize: "4ch",
                }}
              >
                {d.toDateString().slice(0, 3)}
              </div>
            )
        },
      )}
      {Array.from(
        { length: 53 },
        (_, i) => {
          return i === 0 ? null : (
            <div
              key={i}
              className="super-center grid-header"
              style={{
                minBlockSize: "3ch",
                gridColumn: i + 1,
                gridRow: 1,
              }}
            >
              {i}
            </div>
          )
        },
      )}
      {gridContent.map((session) => {
        const { date, sessionType } = session
        const bgColor = getColorVariant(
          new Color(convertSessionTypeToBackgroundColor(
            sessionType,
          )),
          session?.intensity ?? 65,
          session?.volume ?? 65,
        )
        return (
          <i
            key={date.toString()}
            title={createTrainingTooltip(session)}
            className="year-grid__cell"
            style={{
              gridColumn: date.weekOfYear + 1,
              gridRow: date.dayOfWeek + 1,
              backgroundColor: bgColor.toString(),
              color: convertSessionTypeToAccentColor(sessionType).toString(),
            }}
          />
        )
      })}
    </div>
  )
}
