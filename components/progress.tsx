import React, { useState } from "react"

interface Props {
  percentage: number
}

export default function Progress({ percentage }: Props) {
  if (percentage < 0) return null

  return <div>Uploading: {percentage}%</div>
}
