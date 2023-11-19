import { config } from "./../config/index";
import { ObjectId } from "mongodb";
export const formatToListObjectId = (stringArr: string[]): ObjectId[] => {
  const newObjectIdList: ObjectId[] = [];

  stringArr.map((item) => {
    newObjectIdList.push(new ObjectId(item));
  });

  return newObjectIdList;
};

export const formatObjectIdsToStrings = (objectIdArr: ObjectId[]): string[] => {
  const newStringArr: string[] = [];

  objectIdArr.map((objectId) => {
    newStringArr.push(objectId.toHexString());
  });

  return newStringArr;
};

export const replaceTrimString = (string: string) => {
  const newString = string.replace(/\s+/g, " ").trim();
  return newString;
};
