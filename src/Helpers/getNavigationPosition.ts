export async function getNavigationPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise(
    (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, options),
  );
}
