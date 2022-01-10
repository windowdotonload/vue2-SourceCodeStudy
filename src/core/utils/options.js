import { hasOwn } from "../../shared/util";

export function resolveAsset(options, type, id, warnMissing) {
  if (typeof id !== "string") {
    return;
  }
  const assets = options[type];
  if (hasOwn(assets, id)) return assets[id];
}
