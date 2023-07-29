import { Currency } from "@/app/types";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const url = `https://data-api.ecb.europa.eu/service/data/EXR/${"M"}..${"EUR"}.${"SP00"}.A?startPeriod=${"2023-06"}&format=${"jsondata"}`;
  try {
    const {
      structure: {
        dimensions: { series, observation },
      },
      dataSets,
    } = await fetch(url).then((response) => response.json());
    const currencies = series[1].values;
    const timePeriod = observation[0].values;
    const values = dataSets[0].series;

    const result = currencies.map((curr: Currency, i: number) => {
      const boum = timePeriod.map((time: { name: string }, idx: number) => {
        return {
          time: time.name,
          value: values[`0:${i}:0:0:0`].observations[idx][0],
          currency: curr.name,
        };
      });
      return boum;
    });
    return NextResponse.json(
      {
        data: result.flat(),
        currencies,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("ERROR", err);
  }
}
