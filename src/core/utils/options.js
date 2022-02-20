import { hasOwn } from "../../shared/util";
import config from "../config";

const strats = config.optionMergeStrategies;

const defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

export function mergeOptions(parent, child, vm) {
  const options = {};
  let key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    const strat = strats[key] || defaultStrat;
    // 合并父组件与子组件中的option，如果父子组件有相同的option，直接返回子组件的option
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

export function resolveAsset(options, type, id, warnMissing) {
  if (typeof id !== "string") {
    return;
  }
  const assets = options[type];
  if (hasOwn(assets, id)) return assets[id];
}
