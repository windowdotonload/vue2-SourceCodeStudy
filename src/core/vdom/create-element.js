/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
export function createElement(
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  return _createElement(context, tag, data, children, normalizationType);
}

export function __createElement(
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
}
