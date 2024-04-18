import Color from "colorjs.io"
import { TrainingSession } from "types/training.ts"

export const createTrainingTooltip = ({
  date,
  routeOrBouldering,
  volume,
  load,
  intensity,
  gymCrag,
  anatomicalRegion,
  energySystem,
  sessionType,
  comments,
}: TrainingSession): string => {
  const datum = `📅 ${
    date.toLocaleString(undefined, {
      day: "numeric",
      weekday: "long",
      month: "long",
    })
  }`
  const cragum = gymCrag
    ? `\t${
      routeOrBouldering === "Bouldering"
        ? "🪨"
        : routeOrBouldering === "Route"
        ? "🧗"
        : routeOrBouldering === "Multi-Pitch"
        ? "⛰️"
        : ""
    } ${gymCrag}`
    : ""
  const seshum = sessionType ? ` (${sessionType})` : ""
  const volum = volume ? `Volume: ${volume}%` : ""
  const intensitum = intensity ? `Intensity: ${intensity}%` : ""
  const loadum = load ? `Load: ${roundToTen(load)}%` : ""
  const commentum = comments ? `💬 “${comments}”` : ""
  const anatomicum = anatomicalRegion === undefined
    ? ""
    : `| ${
      anatomicalRegion === "Ar"
        ? "💪"
        : anatomicalRegion === "Fi"
        ? "🖐️"
        : anatomicalRegion === "Ge"
        ? "🦵"
        : ""
    }`
  const energium = energySystem === undefined
    ? ""
    : `| ${
      energySystem === "AA"
        ? "🔥"
        : energySystem === "AL"
        ? "🪫"
        : energySystem === "AE"
        ? "🫀"
        : ""
    }`

  return [
    `${datum} ${cragum} ${seshum}`,
    `${volum} ${intensitum} ${loadum} ${anatomicum} ${energium}`,
    commentum,
  ].filter((s) => s !== "").join("\n\n")
}

const lightness = "0.7"
const chroma = "0.15"

const staminaColor = new Color(`oklch(${lightness} ${chroma} 260)`)
const taperedColor = new Color(`oklch(${lightness} ${chroma} 295)`)
const enduranceColor = new Color(`oklch(${lightness} ${chroma} 70)`)
const strengthColor = new Color(`oklch(${lightness} ${chroma} 20)`)
const outdoorColor = new Color(`oklch(${lightness} ${chroma} 130)`)
const otherTrainingColor = new Color(`oklch(${lightness} 0 0)`)

const SESSION_TYPE_TO_BACKGROUND_COLOR: Record<
  Exclude<TrainingSession["sessionType"], undefined>,
  Color
> = {
  Ex: outdoorColor,

  Ta: taperedColor,

  Co: otherTrainingColor,
  FB: otherTrainingColor,
  Ro: otherTrainingColor,
  Sg: otherTrainingColor,

  CS: strengthColor,
  Po: strengthColor,
  MS: strengthColor,

  En: enduranceColor,
  PE: enduranceColor,
  SE: enduranceColor,

  Sk: staminaColor,
  St: staminaColor,
} as const

export const convertSessionTypeToBackgroundColor = (
  sessionType: TrainingSession["sessionType"],
): Color =>
  sessionType === undefined
    ? new Color("white")
    : SESSION_TYPE_TO_BACKGROUND_COLOR[sessionType]

export const getColorVariant = (
  color: Color,
  intensityPercent: number,
  volumePercent: number,
): Color => {
  const upperThreshold = 80
  const lowerThreshold = 50

  const isOneComponentAboveThreshold = intensityPercent >= upperThreshold ||
    volumePercent >= upperThreshold

  const isOneComponentBelowThreshold = intensityPercent <= lowerThreshold ||
    volumePercent <= lowerThreshold

  const lightness = isOneComponentBelowThreshold
    ? .9
    : isOneComponentAboveThreshold
    ? .6
    : .75

  return new Color(
    new Color(color).set({
      l: (l) => l === 0 ? 0 : lightness,
    }),
  )
}

export const convertSessionTypeToAccentColor = (
  sessionType: TrainingSession["sessionType"],
): Color =>
  new Color(
    sessionType === undefined ? "transparent" : new Color(
      SESSION_TYPE_TO_BACKGROUND_COLOR[sessionType],
    )
      .darken(0.2),
  )

export const roundToTen = (n: number): number => Math.round(n / 10) * 10
