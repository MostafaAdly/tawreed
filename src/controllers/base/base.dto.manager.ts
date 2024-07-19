import Route from "src/routes/base.router";
import Helpers from "src/utils/helpers";
import BaseController from "./base.controller";
import path from "path";

export default class BaseDTOManager extends BaseController {
  static DTOs: { [key: string]: Function } = {};
  private static dtoSuffix = '.dto.ts';

  static loadDTO = async (route: Route) => {
    if (route.routes.length > 0 || route.method !== 'POST' || !route.dto) return;
    const dtoFile = Helpers.findFileInDir(path.join(process.cwd(), 'src/controllers'), route.dto + this.dtoSuffix);
    if (!dtoFile) return;
    this.DTOs[route.path] = new (require(dtoFile).default)();
  }
}