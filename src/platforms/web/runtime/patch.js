/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */

import * as nodeOps from "web/runtime/node-ops";
import { createPatchFunction } from "../../../core/vdom/patch";

export const patch = createPatchFunction({ nodeOps, modules });
