import { useState, useEffect } from "react";
import initialUserData from "../assets/dataUsers.json";
import LoadJson, { updateUserData } from "./PhoneStorage";

export function BalanceModel() {
  let [userDataObject, setUserDataObject] = useState(initialUserData);
  let [refreshing, setRefreshing] = useState(true);

  this.jsonName = "dataUsers.json";

  useEffect(() => {
    this.getData();
  }, []);

  this.getDataObject = () => {
    return userDataObject;
  };

  this.getRefreshing = () => {
    return refreshing;
  };

  this.getData = async () => {
    const jsonObject = await LoadJson(this.jsonName, initialUserData);
    setUserDataObject(jsonObject);
    setRefreshing(false);
  };

  this.updateBalance = async (value) => {
    await updateUserData({
      changeKey: "coins",
      value: value,
      setUserDataObject: setUserDataObject,
      userDataObject: userDataObject,
      jsonName: this.jsonName,
    });
  };

  this.getValue = async (getKey) => {
    userDataObject.map((item) => {
      for (var key in item) {
        if (key === getKey) {
          return item[key];
        }
      }
    });
  };

  this.getBalance = () => {
    return userDataObject[0]["coins"];
  };
}

export default BalanceModel;
