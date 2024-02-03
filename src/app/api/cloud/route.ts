import {HrrrResponse} from '@/weather/hrrr';
import {NextRequest, NextResponse} from 'next/server';

/**
 * HTTP params: 'date', 'fcst', 'level', 'sw', 'ne'.
 * @param request
 * @returns
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const level = params.get('level');
  if (level !== 'low' && level !== 'mid' && level !== 'high') {
    return NextResponse.json({error: 'Invalid cloud level'}, {status: 400});
  }


  const dateIso = params.get('date');
  if (!dateIso || !Number.isFinite(new Date(dateIso).getTime())) {
    return NextResponse.json({error: 'Invalid date'}, {status: 400});
  }

  const forecastHours = Number.parseInt(params.get('fcst') || '0', 10);
  if (!Number.isFinite(forecastHours)) {
    return NextResponse.json({error: 'Invalid forcast hours'}, {status: 400});
  }

  const sw = params.get('sw');
  const ne = params.get('ne');
  if (!sw || !ne) {
    return NextResponse.json({error: 'Invalid boundry'}, {status: 400});
  }

  const [minLat, minLng] = sw.split(',', 2).map(Number.parseFloat);
  const [maxLat, maxLng] = ne.split(',', 2).map(Number.parseFloat);
  if (!Number.isFinite(minLat) || !Number.isFinite(minLng) ||
    !Number.isFinite(maxLat) || !Number.isFinite(maxLng)) {
    return NextResponse.json({error: 'Invalid boundry'}, {status: 400});
  }

  // TODO: Update with the actual backend server.
  const response =
    await fetch(`${process.env.HRRR_BACKEND_ADDRESS}/?` + new URLSearchParams({
      'level': level,
      'date': dateIso,
      'fcst': forecastHours.toString(),
      'minLat': minLat.toString(),
      'maxLat': maxLat.toString(),
      'minLng': minLng.toString(),
      'maxLng': maxLng.toString(),
    }));

  const hrrrResponse = await response.json() as HrrrResponse;

  return NextResponse.json(hrrrResponse, {status: 200});
}
