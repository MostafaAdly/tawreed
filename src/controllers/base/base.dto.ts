import { Request } from "express";

export default interface IBaseDTO {
  __onCheck__: (req: Request) => void;
}